import { ErrorCode } from '../support/ErrorCode';
import { ValidationResult } from '../support/ValidationResult';

const CHAR_VALUES: Record<string, number> = {
  A: 1, J: 1,
  B: 2, K: 2, S: 2,
  C: 3, L: 3, T: 3,
  D: 4, M: 4, U: 4,
  E: 5, N: 5, V: 5,
  F: 6, W: 6,
  G: 7, P: 7, X: 7,
  H: 8, Y: 8,
  R: 9, Z: 9,
};

const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const VIN_CHARS = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';

function charValue(ch: string): number {
  return /\d/.test(ch) ? parseInt(ch, 10) : (CHAR_VALUES[ch] ?? 0);
}

export function validateChassi(value: string): ValidationResult {
  const vin = value.replace(/[\s\-]/g, '').toUpperCase();

  if (vin.length !== 17) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (/[IOQ]/.test(vin)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  if (!/^\d{6}$/.test(vin.slice(11, 17))) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  if (/^(.)\1{16}$/.test(vin)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += charValue(vin[i]) * WEIGHTS[i];
  }

  const mod = sum % 11;
  const expected = mod === 10 ? 'X' : String(mod);

  if (vin[8] !== expected) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}

export function isValidChassi(value: string): boolean {
  return validateChassi(value).isValid();
}

export function generateChassi(): string {
  const len = VIN_CHARS.length - 1;
  let vin = 'TST';
  for (let i = 0; i < 5; i++) {
    vin += VIN_CHARS[Math.floor(Math.random() * (len + 1))];
  }
  vin += '0'; // check digit placeholder
  for (let i = 0; i < 2; i++) {
    vin += VIN_CHARS[Math.floor(Math.random() * (len + 1))];
  }
  for (let i = 0; i < 6; i++) {
    vin += String(Math.floor(Math.random() * 10));
  }

  let sum = 0;
  for (let i = 0; i < 17; i++) sum += charValue(vin[i]) * WEIGHTS[i];
  const mod = sum % 11;
  const checkDigit = mod === 10 ? 'X' : String(mod);

  return vin.slice(0, 8) + checkDigit + vin.slice(9);
}

export function maskChassi(value: string): string {
  return value.replace(/[\s\-]/g, '').toUpperCase();
}
