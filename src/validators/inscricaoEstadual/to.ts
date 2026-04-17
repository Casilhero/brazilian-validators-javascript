import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateTo(ie: string): ValidationResult {
  if (ie.length !== 11) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  // Posições 2-3 (índices 2..3) devem ser '01','02','03' ou '99'
  const seg = ie.slice(2, 4);
  if (!['01', '02', '03', '99'].includes(seg)) {
    return ValidationResult.invalid(ErrorCode.INVALID_FORMAT);
  }

  // Soma ponderada: posições 0,1 e 4-9 (pula 2 e 3), pesos 9→1
  const indices = [0, 1, 4, 5, 6, 7, 8, 9];
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 8; i++) {
    soma += parseInt(ie[indices[i]], 10) * weights[i];
  }

  const r = soma % 11;
  const dig = r < 2 ? 0 : 11 - r;

  if (dig !== parseInt(ie[10], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
