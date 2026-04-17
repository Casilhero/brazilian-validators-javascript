import { ErrorCode } from '../support/ErrorCode';
import { ValidationResult } from '../support/ValidationResult';

export function validatePassaporte(value: string): ValidationResult {
  if (!/^[A-Za-z]{2}\d{6}$/.test(value)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }
  return ValidationResult.valid();
}

export function isValidPassaporte(value: string): boolean {
  return validatePassaporte(value).isValid();
}

export function generatePassaporte(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  let digits = '';
  for (let i = 0; i < 6; i++)
    digits += String(Math.floor(Math.random() * 10));
  return l1 + l2 + digits;
}

export function maskPassaporte(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}
