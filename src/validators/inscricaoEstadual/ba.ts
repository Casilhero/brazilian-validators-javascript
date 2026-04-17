import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateBa(ie: string): ValidationResult {
  const len = ie.length;

  let modDigit: string;
  if (len === 8) {
    modDigit = ie[0];
  } else if (len === 9) {
    modDigit = ie[1];
  } else {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  let modulo: number;
  if (['0', '1', '2', '3', '4', '5', '8'].includes(modDigit)) {
    modulo = 10;
  } else if (['6', '7', '9'].includes(modDigit)) {
    modulo = 11;
  } else {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  const baseLen = len - 2;
  const startWeight = baseLen + 1;

  // Calcula 2º DV
  let b = startWeight;
  let soma = 0;
  for (let i = 0; i < baseLen; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
  }
  let r = soma % modulo;
  const dv2 =
    modulo === 10 ? (r === 0 ? 0 : modulo - r) : r <= 1 ? 0 : modulo - r;

  if (dv2 !== parseInt(ie[len - 1], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  // Calcula 1º DV usando ie[0..baseLen-1] + 2º DV × 2
  b = startWeight + 1;
  soma = 0;
  for (let i = 0; i < baseLen; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
  }
  soma += parseInt(ie[len - 1], 10) * 2;
  r = soma % modulo;
  const dv1 =
    modulo === 10 ? (r === 0 ? 0 : modulo - r) : r <= 1 ? 0 : modulo - r;

  if (dv1 !== parseInt(ie[len - 2], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
