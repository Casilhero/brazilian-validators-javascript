import { ErrorCode } from '../support/ErrorCode';
import { BrazilianAreaCodes } from '../support/BrazilianAreaCodes';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';

export function validatePhone(value: string): ValidationResult {
  const phone = Normalizer.digits(value);

  if (
    phone.startsWith('55') &&
    (phone.length === 12 || phone.length === 13)
  ) {
    return ValidationResult.invalid(ErrorCode.INVALID_PREFIX);
  }

  return validateNationalDigits(phone);
}

export function isValidPhone(value: string): boolean {
  return validatePhone(value).isValid();
}

export function generatePhone(): string {
  const ddds = BrazilianAreaCodes.all();
  const ddd = ddds[Math.floor(Math.random() * ddds.length)];
  let subscriber = '9';
  for (let i = 0; i < 8; i++)
    subscriber += String(Math.floor(Math.random() * 10));
  return ddd + subscriber;
}

export function maskPhone(value: string): string {
  const d = Normalizer.digits(value);
  const ddd = d.slice(0, 2);
  const subscriber = d.slice(2);
  if (subscriber.length === 9) {
    return `(${ddd}) ${subscriber.slice(0, 5)}-${subscriber.slice(5)}`;
  }
  return `(${ddd}) ${subscriber.slice(0, 4)}-${subscriber.slice(4)}`;
}

export function validateNationalDigits(phone: string): ValidationResult {
  const length = phone.length;

  if (length !== 10 && length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (Normalizer.isRepeatedDigits(phone)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const ddd = phone.slice(0, 2);
  if (!BrazilianAreaCodes.isValid(ddd)) {
    return ValidationResult.invalid(ErrorCode.INVALID_REGION);
  }

  const subscriber = phone.slice(2);

  if (subscriber.length === 9 && subscriber[0] !== '9') {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  if (subscriber.length === 8 && !/^[2-8]/.test(subscriber)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  return ValidationResult.valid();
}
