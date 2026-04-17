import { BoletoInfo } from '../support/BoletoInfo';
import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

/** Data-base do Banco Central para cálculo do fator de vencimento: 07/10/1997. */
const BOLETO_BASE_DATE = new Date(1997, 9, 7);

/**
 * Calcula o dígito verificador Módulo 10 para campos de boleto bancário.
 * Percorre da direita para a esquerda, multiplicando alternadamente por 2 e 1
 * (o dígito mais à direita é multiplicado por 2).
 * Se o produto for > 9, subtrai 9.
 */
function mod10(value: string): number {
  let sum = 0;
  let multiplier = 2;
  for (let i = value.length - 1; i >= 0; i--) {
    let result = parseInt(value[i], 10) * multiplier;
    if (result > 9) result -= 9;
    sum += result;
    multiplier = multiplier === 2 ? 1 : 2;
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Calcula o dígito verificador Módulo 11 para o código de barras do boleto bancário.
 * Percorre da direita para a esquerda com pesos 2,3,4,5,6,7 ciclando.
 * Resto 0 ou 1 → DV = 1; demais → DV = 11 - resto.
 */
function mod11Barcode(value: string): number {
  let sum = 0;
  let weight = 2;
  for (let i = value.length - 1; i >= 0; i--) {
    sum += parseInt(value[i], 10) * weight;
    weight = weight < 7 ? weight + 1 : 2;
  }
  const remainder = sum % 11;
  return remainder === 0 || remainder === 1 ? 1 : 11 - remainder;
}

/** Valida os 3 DVs de campo (mod10) do boleto bancário de 47 dígitos. */
function isBancarioValid(digits: string): boolean {
  return (
    mod10(digits.substring(0, 9)) === parseInt(digits[9], 10) &&
    mod10(digits.substring(10, 20)) === parseInt(digits[20], 10) &&
    mod10(digits.substring(21, 31)) === parseInt(digits[31], 10)
  );
}

/** Valida os 4 DVs de bloco (mod10) do boleto de arrecadação de 48 dígitos. */
function isArrecadacaoValid(digits: string): boolean {
  for (let b = 0; b < 4; b++) {
    const start = b * 12;
    if (
      mod10(digits.substring(start, start + 11)) !==
      parseInt(digits[start + 11], 10)
    ) {
      return false;
    }
  }
  return true;
}

export function validateBoleto(value: string): ValidationResult {
  const digits = Normalizer.digits(value);

  if (digits.length === 47) {
    return isBancarioValid(digits)
      ? ValidationResult.valid()
      : ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  if (digits.length === 48) {
    return isArrecadacaoValid(digits)
      ? ValidationResult.valid()
      : ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
}

export function isValidBoleto(value: string): boolean {
  return validateBoleto(value).isValid();
}

/**
 * Aplica a máscara ao boleto.
 * - 47 dígitos (bancário): `AAAAA.AAAAA AAAAA.AAAAAA AAAAA.AAAAAA A AAAAAAAAAAAAAA`
 * - 48 dígitos (arrecadação): `AAAAAAAAAAA-A AAAAAAAAAAA-A AAAAAAAAAAA-A AAAAAAAAAAA-A`
 * - Valores parciais: máscara progressiva no padrão bancário.
 */
export function maskBoleto(value: string): string {
  const digits = Normalizer.digits(value);

  if (digits.length === 48) {
    const b = (start: number) =>
      digits.substring(start, start + 11) + '-' + digits[start + 11];
    return `${b(0)} ${b(12)} ${b(24)} ${b(36)}`;
  }

  // Bancário (progressivo): 00000.00000 00000.000000 00000.000000 0 00000000000000
  const d = digits.substring(0, 47);
  const pattern = '00000.00000 00000.000000 00000.000000 0 00000000000000';
  let result = '';
  let di = 0;
  for (const ch of pattern) {
    if (ch === '0') {
      if (di >= d.length) break;
      result += d[di++];
    } else if (di < d.length) {
      result += ch;
    }
  }
  return result;
}

/**
 * Gera uma linha digitável de boleto bancário válida.
 * Retorna 47 dígitos com DVs de campo (mod10) e DV do código de barras (mod11) corretos.
 */
export function generateBoleto(): string {
  const bank = String(Math.floor(Math.random() * 998) + 1).padStart(3, '0');
  const currency = '9';
  const free = Array.from({ length: 25 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');

  const free1 = free.substring(0, 5);
  const free2 = free.substring(5, 15);
  const free3 = free.substring(15, 25);

  const dv1 = mod10(bank + currency + free1);
  const dv2 = mod10(free2);
  const dv3 = mod10(free3);

  // Fator de vencimento: dias desde 07/10/1997 (capped at 9999)
  const baseDate = new Date(1997, 9, 7);
  const days = Math.floor((Date.now() - baseDate.getTime()) / 86400000);
  const factor = String(Math.min(days % 9999, 9999)).padStart(4, '0');
  const amount = '0000000000';

  // DV geral (mod11 sobre o código de barras sem o DV)
  const barcodeWithoutDv =
    bank + currency + factor + amount + free1 + free2 + free3;
  const dvGeral = mod11Barcode(barcodeWithoutDv);

  return (
    bank +
    currency +
    free1 +
    String(dv1) +
    free2 +
    String(dv2) +
    free3 +
    String(dv3) +
    String(dvGeral) +
    factor +
    amount
  );
}

/**
 * Analisa o boleto e retorna suas informações estruturadas.
 * Retorna `null` se o boleto for inválido.
 *
 * @example
 * ```typescript
 * parseBoleto('00190000090114971860168524522114675860000102656');
 * // { type: 'bancario', bankCode: '001', currency: '9', amount: 102656,
 * //   expirationDate: new Date(2018, 6, 15), freeField: '...' }
 * ```
 */
export function parseBoleto(value: string): BoletoInfo | null {
  if (!isValidBoleto(value)) return null;

  const digits = Normalizer.digits(value);

  if (digits.length === 47) {
    const bankCode = digits.substring(0, 3);
    const currency = digits[3];
    // campo livre: free1 (posições 4-8) + free2 (10-19) + free3 (21-30) = 25 dígitos
    const freeField =
      digits.substring(4, 9) +
      digits.substring(10, 20) +
      digits.substring(21, 31);

    const factor = parseInt(digits.substring(33, 37), 10);
    let expirationDate: Date | null = null;
    if (factor > 0) {
      const date = new Date(BOLETO_BASE_DATE);
      date.setDate(date.getDate() + factor);
      expirationDate = date;
    }

    const amount = parseInt(digits.substring(37, 47), 10);

    return {
      type: 'bancario',
      bankCode,
      currency,
      freeField,
      expirationDate,
      amount,
    };
  }

  // Arrecadação (48 dígitos): reconstrói o código de barras removendo os 4 DVs de bloco
  // (posições 11, 23, 35, 47 da linha digitável)
  const barcode =
    digits.substring(0, 11) +
    digits.substring(12, 23) +
    digits.substring(24, 35) +
    digits.substring(36, 47);

  const bankCode = barcode.substring(0, 3);
  // barcode[2] = identificador de valor real: '6' = BRL, '7' = quantidade, '9' = isento
  const currency = barcode[2];
  // Valor: barcode[3..13] (11 dígitos) quando currency === '6'
  const amount = currency === '6' ? parseInt(barcode.substring(3, 14), 10) : 0;
  // freeField = código de barras completo (44 dígitos) para decodificação avançada
  const freeField = barcode;

  return {
    type: 'arrecadacao',
    bankCode,
    currency,
    freeField,
    expirationDate: null,
    amount,
  };
}
