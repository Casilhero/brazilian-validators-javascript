import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

export function validateCns(value: string): ValidationResult {
  const cns = Normalizer.digits(value);

  if (cns.length !== 15) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(cns)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  if (!['1', '2', '7', '8', '9'].includes(cns[0])) {
    return ValidationResult.invalid(ErrorCode.INVALID_PREFIX);
  }

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    sum += parseInt(cns[i], 10) * (15 - i);
  }

  if (sum % 11 !== 0) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidCns(value: string): boolean {
  return validateCns(value).isValid();
}

export function generateCns(): string {
  while (true) {
    const digits: string[] = [String(7 + Math.floor(Math.random() * 3))];
    for (let i = 1; i < 14; i++) {
      digits.push(String(Math.floor(Math.random() * 10)));
    }

    let sum = 0;
    for (let i = 0; i < 14; i++) {
      sum += parseInt(digits[i], 10) * (15 - i);
    }

    const lastDigit = (11 - (sum % 11)) % 11;
    if (lastDigit > 9) continue;

    digits.push(String(lastDigit));
    const cns = digits.join('');
    if (!Normalizer.isRepeatedDigits(cns)) return cns;
  }
}

export function maskCns(value: string): string {
  const d = Normalizer.digits(value);
  return `${d.slice(0, 3)} ${d.slice(3, 7)} ${d.slice(7, 11)} ${d.slice(11, 15)}`;
}
