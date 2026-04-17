import { describe, it, expect } from 'vitest';
import { isValidCnh, validateCnh, generateCnh, maskCnh } from '../src/validators/cnh';

describe('Cnh', () => {
  it('valida CNH correta', () => {
    expect(isValidCnh('84718735264')).toBe(true);
  });

  it('rejeita CNH com todos dígitos iguais', () => {
    expect(isValidCnh('11111111111')).toBe(false);
  });

  it('rejeita CNH com comprimento errado', () => {
    expect(isValidCnh('1234567890')).toBe(false);
  });

  it('rejeita CNH com DV inválido', () => {
    expect(isValidCnh('84718735265')).toBe(false);
  });

  it('gera CNH válida', () => {
    const cnh = generateCnh();
    expect(cnh).toHaveLength(11);
    expect(isValidCnh(cnh)).toBe(true);
  });

  it('aplica máscara (devolve 11 dígitos sem formatação)', () => {
    const cnh = generateCnh();
    expect(maskCnh(cnh)).toHaveLength(11);
  });
});
