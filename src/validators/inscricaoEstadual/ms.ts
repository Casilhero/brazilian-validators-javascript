import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateMs(ie: string): ValidationResult {
  if (ie.length !== 9) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  const prefix2 = ie.slice(0, 2);
  if (prefix2 !== '28' && prefix2 !== '50') {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  let soma = 0;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * (9 - i);
  }

  const i = soma % 11;
  let dig: number;
  if (i === 0) {
    dig = 0;
  } else {
    const r = 11 - i;
    dig = r > 9 ? 0 : r;
  }

  if (dig !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
