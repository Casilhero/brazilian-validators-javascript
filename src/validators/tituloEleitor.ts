import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

function mod11(sum: number, spMg: boolean): number {
  const mod = sum % 11;
  if (mod === 10) return 0;
  if (mod === 0) return spMg ? 1 : 0;
  return mod;
}

export function validateTituloEleitor(value: string): ValidationResult {
  const titulo = Normalizer.digits(value);
  const len = titulo.length;

  if (len < 12 || len > 13) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  const seqLen = len - 4;
  const uf = parseInt(titulo.slice(seqLen, seqLen + 2), 10);

  if (uf < 1 || uf > 28) {
    return ValidationResult.invalid(ErrorCode.INVALID_REGION);
  }

  const spMg = uf === 1 || uf === 2;

  let sumA = 0;
  let mult = 9;
  for (let i = seqLen - 1; i >= 0; i--) {
    sumA += parseInt(titulo[i], 10) * mult;
    mult--;
    if (mult < 2) mult = 9;
  }

  const dv1 = mod11(sumA, spMg);
  const sumB =
    parseInt(titulo[seqLen], 10) * 7 +
    parseInt(titulo[seqLen + 1], 10) * 8 +
    dv1 * 9;
  const dv2 = mod11(sumB, spMg);

  if (
    parseInt(titulo[seqLen + 2], 10) !== dv1 ||
    parseInt(titulo[seqLen + 3], 10) !== dv2
  ) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidTituloEleitor(value: string): boolean {
  return validateTituloEleitor(value).isValid();
}

export function generateTituloEleitor(): string {
  const seqDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10),
  );
  const uf = 1 + Math.floor(Math.random() * 28);
  const ufStr = String(uf).padStart(2, '0');
  const spMg = uf === 1 || uf === 2;

  let sumA = 0;
  let mult = 9;
  for (let i = 7; i >= 0; i--) {
    sumA += seqDigits[i] * mult;
    mult--;
    if (mult < 2) mult = 9;
  }

  const dv1 = mod11(sumA, spMg);
  const sumB =
    parseInt(ufStr[0], 10) * 7 + parseInt(ufStr[1], 10) * 8 + dv1 * 9;
  const dv2 = mod11(sumB, spMg);

  return seqDigits.join('') + ufStr + dv1 + dv2;
}

export function maskTituloEleitor(value: string): string {
  const d = Normalizer.digits(value);
  const len = d.length;
  if (len === 13) {
    return `${d.slice(0, 5)} ${d.slice(5, 9)} ${d.slice(9, 13)}`;
  }
  return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 12)}`;
}
