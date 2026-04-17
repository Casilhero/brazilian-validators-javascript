import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { Tribunais } from '../support/Tribunais';
import { ValidationResult } from '../support/ValidationResult';

export function validateProcessoJudicial(value: string): ValidationResult {
  const raw = Normalizer.digits(value);

  if (raw.length !== 20) {
    return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
  }

  const n = raw.slice(0, 7);
  const d = raw.slice(7, 9);
  const a = raw.slice(9, 13);
  const j = raw.slice(13, 14);
  const tr = raw.slice(14, 16);
  const o = raw.slice(16, 20);

  const op1 = parseInt(n, 10) % 97;
  const op2 = parseInt(String(op1) + a + j + tr, 10) % 97;
  const opFinal = parseInt(String(op2) + o + d, 10) % 97;

  if (opFinal !== 1) {
    return ValidationResult.invalid(ErrorCode.INVALID_CHECKSUM);
  }

  if (Tribunais.get(parseInt(j, 10), parseInt(tr, 10)) === undefined) {
    return ValidationResult.invalid(ErrorCode.INVALID_REGION);
  }

  return ValidationResult.valid();
}

export function isValidProcessoJudicial(value: string): boolean {
  return validateProcessoJudicial(value).isValid();
}

export function generateProcessoJudicial(): string {
  const allData = Tribunais.all();
  const jKeys = Object.keys(allData).map(Number);
  const j = jKeys[Math.floor(Math.random() * jKeys.length)];
  const trKeys = Object.keys(allData[j]).map(Number);
  const tr = trKeys[Math.floor(Math.random() * trKeys.length)];

  const n = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
  const a = String(
    2000 + Math.floor(Math.random() * (new Date().getFullYear() - 1999)),
  ).padStart(4, '0');
  const jStr = String(j);
  const trStr = String(tr).padStart(2, '0');
  const o = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

  const op1 = parseInt(n, 10) % 97;
  const op2 = parseInt(String(op1) + a + jStr + trStr, 10) % 97;
  const rem = (parseInt(String(op2) + o, 10) * 100) % 97;
  const dv = String(98 - rem).padStart(2, '0');

  return n + dv + a + jStr + trStr + o;
}

export function maskProcessoJudicial(value: string): string {
  const raw = Normalizer.digits(value);
  if (raw.length !== 20) return value;
  return (
    raw.slice(0, 7) +
    '-' +
    raw.slice(7, 9) +
    '.' +
    raw.slice(9, 13) +
    '.' +
    raw.slice(13, 14) +
    '.' +
    raw.slice(14, 16) +
    '.' +
    raw.slice(16, 20)
  );
}
