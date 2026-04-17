import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

export function validateCpf(value: string): ValidationResult {
  const cpf = Normalizer.digits(value);

  if (cpf.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(cpf)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  for (let position = 9; position <= 10; position++) {
    let sum = 0;
    for (let i = 0; i < position; i++) {
      sum += parseInt(cpf[i], 10) * (position + 1 - i);
    }
    const digit = ((sum * 10) % 11) % 10;
    if (parseInt(cpf[position], 10) !== digit) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }
  }

  return ValidationResult.valid();
}

export function isValidCpf(value: string): boolean {
  return validateCpf(value).isValid();
}

export function generateCpf(): string {
  let digits: number[];
  do {
    digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  } while (Normalizer.isRepeatedDigits(digits.join('')));

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
  digits.push(((sum * 10) % 11) % 10);

  sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
  digits.push(((sum * 10) % 11) % 10);

  return digits.join('');
}

export function maskCpf(value: string): string {
  const d = Normalizer.digits(value);
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
}
