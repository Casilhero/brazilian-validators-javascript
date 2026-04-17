import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validatePr(ie: string): ValidationResult {
  if (ie.length !== 10) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  // DV1: b inicia em 3, decrementa, wrapping 1→7
  let b = 3;
  let soma = 0;
  for (let i = 0; i <= 7; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 7;
  }
  let r = soma % 11;
  const dv1 = r <= 1 ? 0 : 11 - r;
  if (dv1 !== parseInt(ie[8], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  // DV2: b inicia em 4, decrementa, wrapping 1→7
  b = 4;
  soma = 0;
  for (let i = 0; i <= 8; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 7;
  }
  r = soma % 11;
  const dv2 = r <= 1 ? 0 : 11 - r;
  if (dv2 !== parseInt(ie[9], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
