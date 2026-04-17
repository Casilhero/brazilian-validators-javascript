import { describe, it, expect } from 'vitest';
import { isValidCnpj, validateCnpj, generateCnpj, maskCnpj } from '../src/validators/cnpj';

describe('Cnpj', () => {
  it('valida CNPJ numérico correto', () => {
    expect(isValidCnpj('11.222.333/0001-81')).toBe(true);
    expect(isValidCnpj('11222333000181')).toBe(true);
  });

  it('valida CNPJ alfanumérico', () => {
    const cnpj = generateCnpj();
    expect(isValidCnpj(cnpj)).toBe(true);
  });

  it('rejeita CNPJ com todos dígitos iguais', () => {
    expect(isValidCnpj('11.111.111/1111-11')).toBe(false);
  });

  it('rejeita CNPJ com DV inválido', () => {
    expect(isValidCnpj('11.222.333/0001-82')).toBe(false);
  });

  it('rejeita CNPJ com comprimento errado', () => {
    expect(isValidCnpj('1122233300018')).toBe(false);
  });

  it('gera CNPJ válido', () => {
    const cnpj = generateCnpj();
    expect(cnpj).toHaveLength(14);
    expect(isValidCnpj(cnpj)).toBe(true);
  });

  it('aplica máscara corretamente', () => {
    expect(maskCnpj('11222333000181')).toBe('11.222.333/0001-81');
  });
});
