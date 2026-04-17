import { describe, it, expect } from 'vitest';
import { isValidCaepf, validateCaepf, generateCaepf, maskCaepf } from '../src/validators/caepf';

describe('Caepf', () => {
  it('gera e valida CAEPF', () => {
    for (let i = 0; i < 5; i++) {
      const c = generateCaepf();
      expect(isValidCaepf(c)).toBe(true);
    }
  });

  it('rejeita CAEPF com comprimento errado', () => {
    expect(isValidCaepf('1234567890')).toBe(false);
    expect(isValidCaepf('123456789012345')).toBe(false);
  });

  it('aplica máscara', () => {
    const c = generateCaepf();
    const masked = maskCaepf(c);
    expect(masked).toMatch(/^\d{3}\.\d{3}\.\d{3}\/\d{3}-\d{2}$/);
  });
});
