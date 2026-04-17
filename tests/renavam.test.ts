import { describe, it, expect } from 'vitest';
import { isValidRenavam, validateRenavam, generateRenavam, maskRenavam } from '../src/validators/renavam';

describe('Renavam', () => {
  it('gera e valida RENAVAM', () => {
    for (let i = 0; i < 5; i++) {
      const r = generateRenavam();
      expect(isValidRenavam(r)).toBe(true);
    }
  });

  it('rejeita RENAVAM com comprimento errado', () => {
    expect(isValidRenavam('1234567')).toBe(false);
    expect(isValidRenavam('123456789012')).toBe(false);
  });

  it('aplica máscara (retorna dígitos normalizados)', () => {
    const r = generateRenavam();
    const masked = maskRenavam(r);
    expect(masked).toMatch(/^\d{11}$/);
  });
});
