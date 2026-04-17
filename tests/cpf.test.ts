import { describe, it, expect } from 'vitest';
import { isValidCpf, validateCpf, generateCpf, maskCpf } from '../src/validators/cpf';

describe('Cpf', () => {
  it('valida CPF correto', () => {
    expect(isValidCpf('529.982.247-25')).toBe(true);
    expect(isValidCpf('52998224725')).toBe(true);
  });

  it('rejeita CPF com todos dígitos iguais', () => {
    expect(isValidCpf('111.111.111-11')).toBe(false);
    expect(isValidCpf('000.000.000-00')).toBe(false);
  });

  it('rejeita CPF com DV inválido', () => {
    expect(isValidCpf('529.982.247-26')).toBe(false);
  });

  it('rejeita CPF com comprimento errado', () => {
    expect(isValidCpf('529.982.247')).toBe(false);
  });

  it('retorna ValidationResult inválido com código correto', () => {
    const r = validateCpf('11111111111');
    expect(r.isValid()).toBe(false);
    expect(r.code()).toBe('invalid_format');
  });

  it('gera CPF válido', () => {
    const cpf = generateCpf();
    expect(cpf).toHaveLength(11);
    expect(isValidCpf(cpf)).toBe(true);
  });

  it('aplica máscara corretamente', () => {
    expect(maskCpf('52998224725')).toBe('529.982.247-25');
  });
});
