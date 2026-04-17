import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

function cnpjDv(s: string): number {
  const startWeight = s.length === 12 ? 5 : 6;
  let sum = 0;
  let weight = startWeight;
  for (let i = 0; i < s.length; i++) {
    sum += (s.charCodeAt(i) - 48) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function validateCnpj(value: string): ValidationResult {
  const cnpj = Normalizer.cnpjAlphanumeric(value);

  if (cnpj.length !== 14) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(cnpj)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  if (/^(.)\1{13}$/.test(cnpj)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const digit1 = cnpjDv(cnpj.slice(0, 12));
  if (parseInt(cnpj[12], 10) !== digit1) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  const digit2 = cnpjDv(cnpj.slice(0, 13));
  if (parseInt(cnpj[13], 10) !== digit2) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidCnpj(value: string): boolean {
  return validateCnpj(value).isValid();
}

export function generateCnpj(): string {
  let chars: string[];
  do {
    chars = Array.from({ length: 12 }, () =>
      String(Math.floor(Math.random() * 10)),
    );
  } while (new Set(chars).size === 1);

  const base = chars.join('');
  const dv1 = cnpjDv(base);
  const dv2 = cnpjDv(base + dv1);

  return base + dv1 + dv2;
}

export function maskCnpj(value: string): string {
  const d = Normalizer.cnpjAlphanumeric(value);
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
}
