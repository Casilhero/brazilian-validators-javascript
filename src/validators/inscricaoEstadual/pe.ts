import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validatePe(ie: string): ValidationResult {
  const len = ie.length;

  if (len === 9) {
    // Formato antigo: 9 dígitos, duplo DV, pesos 8→2 depois 9→2
    let soma = 0;
    for (let i = 0; i <= 6; i++) {
      soma += parseInt(ie[i], 10) * (8 - i);
    }
    let r = soma % 11;
    const dv1 = r <= 1 ? 0 : 11 - r;
    if (dv1 !== parseInt(ie[7], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    soma = 0;
    for (let i = 0; i <= 7; i++) {
      soma += parseInt(ie[i], 10) * (9 - i);
    }
    r = soma % 11;
    const dv2 = r <= 1 ? 0 : 11 - r;
    if (dv2 !== parseInt(ie[8], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    return ValidationResult.valid();
  }

  if (len === 14) {
    // Formato novo: 14 dígitos, único DV, peso decrementa 5→1 wrap 0→9
    let b = 5;
    let soma = 0;
    for (let i = 0; i <= 12; i++) {
      soma += parseInt(ie[i], 10) * b;
      b--;
      if (b === 0) b = 9;
    }
    const r = soma % 11;
    let dig = 11 - r;
    if (dig > 9) dig -= 10;
    if (dig !== parseInt(ie[13], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    return ValidationResult.valid();
  }

  return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
}
