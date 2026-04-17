import { ErrorCode } from '../support/ErrorCode';
import { Normalizer } from '../support/Normalizer';
import { ValidationResult } from '../support/ValidationResult';
import { generateCnpj, maskCnpj, validateCnpj } from './cnpj';
import { generateCpf, maskCpf, validateCpf } from './cpf';

export function validateCpfCnpj(value: string): ValidationResult {
  const digits = Normalizer.digits(value);

  if (digits.length === 11) {
    return validateCpf(digits);
  }

  if (digits.length === 14) {
    return validateCnpj(digits);
  }

  const cnpj = Normalizer.cnpjAlphanumeric(value);
  if (cnpj.length === 14) {
    return validateCnpj(cnpj);
  }

  return ValidationResult.invalid(ErrorCode.INVALID_LENGTH);
}

export function isValidCpfCnpj(value: string): boolean {
  return validateCpfCnpj(value).isValid();
}

export function generateCpfCnpj(): string {
  return Math.random() < 0.5 ? generateCpf() : generateCnpj();
}

export function maskCpfCnpj(value: string): string {
  const digits = Normalizer.digits(value);
  if (digits.length === 11) {
    return maskCpf(value);
  }
  return maskCnpj(value);
}
