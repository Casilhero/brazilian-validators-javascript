import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateRn(ie: string): ValidationResult {
  const len = ie.length;

  if (len !== 9 && len !== 10) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  if (!ie.startsWith('20')) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const baseLen = len - 1;
  let soma = 0;
  for (let i = 0; i < baseLen; i++) {
    soma += parseInt(ie[i], 10) * (len - i);
  }

  soma = (soma * 10) % 11;
  const dig = soma === 10 ? 0 : soma;

  if (dig !== parseInt(ie[len - 1], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
