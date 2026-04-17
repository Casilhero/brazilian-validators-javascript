import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateRs(ie: string): ValidationResult {
  if (ie.length !== 10) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let b = 2;
  let soma = 0;
  for (let i = 0; i <= 8; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 9;
  }

  const r = soma % 11;
  const dig11 = 11 - r;
  const dig = dig11 >= 10 ? 0 : dig11;

  if (dig !== parseInt(ie[9], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
