import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';
import { generatePhone, validateNationalDigits } from './phone';

export function validatePhoneDdi(value: string): ValidationResult {
  const phone = Normalizer.digits(value);

  if (!phone.startsWith('55')) {
    return ValidationResult.invalid(ErrorCode.INVALID_PREFIX);
  }

  return validateNationalDigits(phone.slice(2));
}

export function isValidPhoneDdi(value: string): boolean {
  return validatePhoneDdi(value).isValid();
}

export function generatePhoneDdi(): string {
  return '55' + generatePhone();
}

export function maskPhoneDdi(value: string): string {
  const d = Normalizer.digits(value);
  const ddd = d.slice(2, 4);
  const subscriber = d.slice(4);
  if (subscriber.length === 9) {
    return `+55 (${ddd}) ${subscriber.slice(0, 5)}-${subscriber.slice(5)}`;
  }
  return `+55 (${ddd}) ${subscriber.slice(0, 4)}-${subscriber.slice(4)}`;
}
