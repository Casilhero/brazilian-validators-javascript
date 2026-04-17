import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateMt(ie: string): ValidationResult {
  if (ie.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let b = 3;
  let soma = 0;
  for (let i = 0; i <= 9; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 9;
  }

  const r = soma % 11;
  const dig = r <= 1 ? 0 : 11 - r;

  if (dig !== parseInt(ie[10], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
