import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateRr(ie: string): ValidationResult {
  if (ie.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (!ie.startsWith('24')) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  let soma = 0;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * (i + 1);
  }

  const dig = soma % 9;

  if (dig !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
