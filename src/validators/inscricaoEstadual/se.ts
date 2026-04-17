import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateSe(ie: string): ValidationResult {
  if (ie.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let soma = 0;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * (9 - i);
  }

  const r = soma % 11;
  const dig11 = 11 - r;
  const dig = dig11 > 9 ? 0 : dig11;

  if (dig !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
