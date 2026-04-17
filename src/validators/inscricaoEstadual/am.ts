import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateAm(ie: string): ValidationResult {
  if (ie.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let soma = 0;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * (9 - i);
  }

  let dig: number;
  if (soma <= 11) {
    dig = 11 - soma;
  } else {
    const r = soma % 11;
    dig = r <= 1 ? 0 : 11 - r;
  }

  if (dig !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
