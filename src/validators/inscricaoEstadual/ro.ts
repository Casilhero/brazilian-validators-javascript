import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateRo(ie: string): ValidationResult {
  const len = ie.length;

  if (len === 9) {
    const weights = [6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 5; i++) {
      soma += parseInt(ie[3 + i], 10) * weights[i];
    }
    const r = soma % 11;
    const dig11 = 11 - r;
    const dig = dig11 >= 10 ? dig11 - 10 : dig11;

    if (dig !== parseInt(ie[8], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    return ValidationResult.valid();
  }

  if (len === 14) {
    let b = 6;
    let soma = 0;
    for (let i = 0; i <= 12; i++) {
      soma += parseInt(ie[i], 10) * b;
      b--;
      if (b === 1) b = 9;
    }
    const r = soma % 11;
    const dig11 = 11 - r;
    const dig = dig11 >= 10 ? dig11 - 10 : dig11;

    if (dig !== parseInt(ie[13], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    return ValidationResult.valid();
  }

  return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
}
