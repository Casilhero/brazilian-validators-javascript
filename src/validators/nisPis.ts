import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function validateNisPis(value: string): ValidationResult {
  const nis = Normalizer.digits(value);

  if (nis.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(nis)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(nis[i], 10) * WEIGHTS[i];
  }

  const remainder = 11 - (sum % 11);
  const digit = remainder >= 10 ? 0 : remainder;

  if (parseInt(nis[10], 10) !== digit) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidNisPis(value: string): boolean {
  return validateNisPis(value).isValid();
}

export function generateNisPis(): string {
  let digits: number[];
  do {
    digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  } while (Normalizer.isRepeatedDigits(digits.map(String).join('')));

  let sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * WEIGHTS[i];
  const remainder = 11 - (sum % 11);
  digits.push(remainder >= 10 ? 0 : remainder);

  return digits.join('');
}

export function maskNisPis(value: string): string {
  const d = Normalizer.digits(value);
  return `${d.slice(0, 3)}.${d.slice(3, 8)}.${d.slice(8, 10)}-${d[10]}`;
}
