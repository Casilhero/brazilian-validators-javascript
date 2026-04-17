import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';

export function validateMg(ie: string): ValidationResult {
  if (ie.length !== 13) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  // DV1: insere '0' na posição 3 → string de 14 chars; usa posições 0-11
  const expanded = ie.slice(0, 3) + '0' + ie.slice(3);
  let b = 1;
  let somaStr = '';
  for (let i = 0; i <= 11; i++) {
    somaStr += String(parseInt(expanded[i], 10) * b);
    b++;
    if (b === 3) b = 1;
  }
  let s = 0;
  for (let i = 0; i < somaStr.length; i++) {
    s += parseInt(somaStr[i], 10);
  }
  const next10 = Math.ceil(s / 10) * 10;
  const dv1 = next10 - s;

  if (dv1 !== parseInt(ie[11], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  // DV2: b inicia em 3, decrementa, wrapping 1→11
  b = 3;
  let soma = 0;
  for (let i = 0; i <= 11; i++) {
    soma += parseInt(ie[i], 10) * b;
    b--;
    if (b === 1) b = 11;
  }
  const r = soma % 11;
  const dv2 = r < 2 ? 0 : 11 - r;

  if (dv2 !== parseInt(ie[12], 10)) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  return ValidationResult.valid();
}
