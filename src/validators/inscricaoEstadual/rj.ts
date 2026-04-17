import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateRj(ie: string): ValidationResult {
  if (ie.length !== 8) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  const weights = [2, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i <= 6; i++) {
    soma += parseInt(ie[i], 10) * weights[i];
  }

  const r = soma % 11;
  const dig = r <= 1 ? 0 : 11 - r;

  if (dig !== parseInt(ie[7], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
