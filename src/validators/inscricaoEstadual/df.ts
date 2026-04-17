import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateDf(ie: string): ValidationResult {
  if (ie.length !== 13) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (!ie.startsWith('07')) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  // DV1
  let b = 4;
  let soma = 0;
  for (let i = 0; i <= 10; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 9;
  }
  let dig = 11 - (soma % 11);
  if (dig >= 10) dig = 0;
  if (dig !== parseInt(ie[11], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  // DV2
  b = 5;
  soma = 0;
  for (let i = 0; i <= 11; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 9;
  }
  dig = 11 - (soma % 11);
  if (dig >= 10) dig = 0;
  if (dig !== parseInt(ie[12], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
