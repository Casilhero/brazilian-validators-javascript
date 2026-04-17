import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

export function validateSuframa(value: string): ValidationResult {
  const suframa = Normalizer.digits(value);

  if (suframa.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (suframa.startsWith('00')) {
    return ValidationResult.invalid(ErrorCode.INVALID_PREFIX);
  }

  if (Normalizer.isRepeatedDigits(suframa)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(suframa[i], 10) * (9 - i);
  }

  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (parseInt(suframa[8], 10) !== digit) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidSuframa(value: string): boolean {
  return validateSuframa(value).isValid();
}

export function generateSuframa(): string {
  let digits: number[];
  do {
    digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  } while (digits[0] === 0 && digits[1] === 0);

  let sum = 0;
  for (let i = 0; i < 8; i++) sum += digits[i] * (9 - i);
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  digits.push(digit);

  return digits.join('');
}

export function maskSuframa(value: string): string {
  return Normalizer.digits(value);
}
