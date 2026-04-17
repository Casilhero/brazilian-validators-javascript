import { CertidaoInfo } from '../support/CertidaoInfo';
import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

function somaPonderada(value: string): number {
  let soma = 0;
  let mult = 32 - value.length;
  for (let i = 0; i < value.length; i++) {
    soma += parseInt(value[i], 10) * mult;
    mult++;
    if (mult > 10) mult = 0;
  }
  return soma;
}

export function validateCertidao(value: string): ValidationResult {
  const digits = Normalizer.digits(value);

  if (digits.length !== 32) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  const num = digits.slice(0, 30);
  const dv = digits.slice(30, 32);

  let dv1 = somaPonderada(num) % 11;
  if (dv1 > 9) dv1 = 1;

  let dv2 = somaPonderada(num + dv1) % 11;
  if (dv2 > 9) dv2 = 1;

  if (dv !== String(dv1) + String(dv2)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidCertidao(value: string): boolean {
  return validateCertidao(value).isValid();
}

export function parseCertidao(value: string): CertidaoInfo | null {
  if (!isValidCertidao(value)) return null;
  const digits = Normalizer.digits(value);
  return new CertidaoInfo({
    codigoServentia: digits.slice(0, 6),
    codigoAcervo: digits.slice(6, 8),
    codigoServico: digits.slice(8, 10),
    ano: parseInt(digits.slice(10, 14), 10),
    tipoLivro: parseInt(digits[14], 10),
    numeroLivro: digits.slice(15, 20),
    folha: digits.slice(20, 23),
    numeroTermo: digits.slice(23, 30),
  });
}

export function generateCertidao(): string {
  const serventia = String(1 + Math.floor(Math.random() * 999999)).padStart(
    6,
    '0',
  );
  const acervo = '01';
  const servico = '55';
  const ano = String(
    2010 + Math.floor(Math.random() * (new Date().getFullYear() - 2009)),
  );
  const tipo = '1';
  const livro = String(1 + Math.floor(Math.random() * 99999)).padStart(
    5,
    '0',
  );
  const folha = String(1 + Math.floor(Math.random() * 999)).padStart(3, '0');
  const termo = String(1 + Math.floor(Math.random() * 9999999)).padStart(
    7,
    '0',
  );

  const num =
    serventia + acervo + servico + ano + tipo + livro + folha + termo;

  let dv1 = somaPonderada(num) % 11;
  if (dv1 > 9) dv1 = 1;

  let dv2 = somaPonderada(num + dv1) % 11;
  if (dv2 > 9) dv2 = 1;

  return num + dv1 + dv2;
}

export function maskCertidao(value: string): string {
  const d = Normalizer.digits(value);
  return (
    `${d.slice(0, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)} ${d.slice(10, 14)} ` +
    `${d[14]} ${d.slice(15, 20)} ${d.slice(20, 23)} ${d.slice(23, 30)}-${d.slice(30, 32)}`
  );
}
