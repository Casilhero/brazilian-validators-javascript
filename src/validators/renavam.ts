import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function validateRenavam(value: string): ValidationResult {
  const renavam = Normalizer.digits(value);

  if (renavam.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(renavam[i], 10) * WEIGHTS[i];
  }

  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  if (parseInt(renavam[10], 10) !== digit) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidRenavam(value: string): boolean {
  return validateRenavam(value).isValid();
}

export function generateRenavam(): string {
  const digits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10),
  );

  let sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * WEIGHTS[i];
  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  digits.push(digit);

  return digits.join('');
}

export function maskRenavam(value: string): string {
  return Normalizer.digits(value);
}
