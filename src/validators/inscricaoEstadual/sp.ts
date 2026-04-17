import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateSp(ie: string): ValidationResult {
  const len = ie.length;

  // Produtores rurais: 13 caracteres começando com 'P'
  if (len === 13) {
    if (ie[0] !== 'P') {
      return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
    }
    if (!/^\d{12}$/.test(ie.slice(1))) {
      return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
    }
    // DV em ie[9]: pesos incrementando de 1, pulando 2 (vai de 1→3) e 9 (vai de 8→10)
    let b = 1;
    let soma = 0;
    for (let i = 1; i <= 8; i++) {
      soma += parseInt(ie[i], 10) * b;
      b++;
      if (b === 2) b = 3;
      if (b === 9) b = 10;
    }
    const dv = soma % 11;
    const dvFinal = dv > 9 ? 0 : dv;
    if (dvFinal !== parseInt(ie[9], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }
    return ValidationResult.valid();
  }

  // Formato normal: 12 dígitos
  if (len === 12) {
    if (!/^\d{12}$/.test(ie)) {
      return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
    }

    // DV1 em ie[8]: mesmos pesos 1,3,4,5,6,7,8,10
    let b = 1;
    let soma = 0;
    for (let i = 0; i <= 7; i++) {
      soma += parseInt(ie[i], 10) * b;
      b++;
      if (b === 2) b = 3;
      if (b === 9) b = 10;
    }
    const dv1 = soma % 11;
    const dv1Final = dv1 > 9 ? 0 : dv1;
    if (dv1Final !== parseInt(ie[8], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    // DV2 em ie[11]: b inicia em 3, decrementa, wrapping 1→10
    b = 3;
    soma = 0;
    for (let i = 0; i <= 10; i++) {
      soma += parseInt(ie[i], 10) * b;
      b--;
      if (b === 1) b = 10;
    }
    const dv2 = soma % 11;
    const dv2Final = dv2 > 9 ? 0 : dv2;
    if (dv2Final !== parseInt(ie[11], 10)) {
      return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
    }

    return ValidationResult.valid();
  }

  return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
}
