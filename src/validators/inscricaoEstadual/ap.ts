import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateAp(ie: string): ValidationResult {
  if (ie.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (!ie.startsWith('03')) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const prefix = parseInt(ie.slice(0, 8), 10);

  let p: number;
  let d: number;
  if (prefix >= 3000001 && prefix <= 3017000) {
    p = 5;
    d = 0;
  } else if (prefix >= 3017001 && prefix <= 3019022) {
    p = 9;
    d = 1;
  } else {
    p = 0;
    d = 0;
  }

  let soma = p;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * (9 - i);
  }

  let dig = 11 - (soma % 11);
  if (dig === 10) {
    dig = 0;
  } else if (dig === 11) {
    dig = d;
  }

  if (dig !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
