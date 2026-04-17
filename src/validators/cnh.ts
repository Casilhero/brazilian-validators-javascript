import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

export function validateCnh(value: string): ValidationResult {
  const cnh = Normalizer.digits(value);

  if (cnh.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(cnh)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const base = cnh.slice(0, 9);

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(base[i], 10) * (9 - i);

  let firstDigit = sum % 11;
  let discount = 0;
  if (firstDigit >= 10) {
    firstDigit = 0;
    discount = 2;
  }

  sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(base[i], 10) * (i + 1);

  let secondDigit = (sum % 11) - discount;
  if (secondDigit < 0) secondDigit += 11;
  if (secondDigit >= 10) secondDigit = 0;

  if (
    parseInt(cnh[9], 10) !== firstDigit ||
    parseInt(cnh[10], 10) !== secondDigit
  ) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidCnh(value: string): boolean {
  return validateCnh(value).isValid();
}

export function generateCnh(): string {
  let digits: number[];
  do {
    digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  } while (Normalizer.isRepeatedDigits(digits.join('')));

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (9 - i);
  let firstDigit = sum % 11;
  let discount = 0;
  if (firstDigit >= 10) {
    firstDigit = 0;
    discount = 2;
  }

  sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (i + 1);
  let secondDigit = (sum % 11) - discount;
  if (secondDigit < 0) secondDigit += 11;
  if (secondDigit >= 10) secondDigit = 0;

  return digits.join('') + firstDigit + secondDigit;
}

export function maskCnh(value: string): string {
  return Normalizer.digits(value);
}
