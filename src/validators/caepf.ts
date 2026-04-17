import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

function mod11Caepf(base: string): number {
  const length = base.length;
  let sum = 0;
  let weight = 18 - length; // 12 → 6; 13 → 5
  for (let i = 0; i < length; i++) {
    sum += parseInt(base[i], 10) * weight;
    weight++;
    if (weight > 9) weight = 2;
  }
  const resto = sum % 11;
  return resto === 10 ? 0 : resto;
}

export function validateCaepf(value: string): ValidationResult {
  const digits = Normalizer.digits(value);

  if (digits.length !== 14) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(digits)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const base = digits.slice(0, 12);
  const dvInformado = parseInt(digits.slice(12, 14), 10);

  const dv1 = mod11Caepf(base);
  const dv2 = mod11Caepf(base + dv1);
  const dvCalculado = (dv1 * 10 + dv2 + 12) % 100;

  if (dvInformado !== dvCalculado) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidCaepf(value: string): boolean {
  return validateCaepf(value).isValid();
}

export function generateCaepf(): string {
  let base9 = '';
  for (let i = 0; i < 9; i++) base9 += String(Math.floor(Math.random() * 10));

  const base12 = base9 + '001';
  const dv1 = mod11Caepf(base12);
  const dv2 = mod11Caepf(base12 + dv1);
  const dvCalculado = (dv1 * 10 + dv2 + 12) % 100;

  return base12 + String(dvCalculado).padStart(2, '0');
}

export function maskCaepf(value: string): string {
  const d = Normalizer.digits(value);
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}/${d.slice(9, 12)}-${d.slice(12, 14)}`;
}
