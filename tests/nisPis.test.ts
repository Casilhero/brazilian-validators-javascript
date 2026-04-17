import { describe, it, expect } from 'vitest';
import { isValidNisPis, validateNisPis, generateNisPis, maskNisPis } from '../src/validators/nisPis';

describe('NisPis', () => {
  it('valida NIS/PIS correto', () => {
    const nis = generateNisPis();
    expect(isValidNisPis(nis)).toBe(true);
  });

  it('rejeita NIS/PIS com comprimento errado', () => {
    expect(isValidNisPis('1234567890')).toBe(false);
    expect(isValidNisPis('123456789012')).toBe(false);
  });

  it('gera NIS/PIS válido', () => {
    for (let i = 0; i < 5; i++) {
      const nis = generateNisPis();
      expect(nis).toHaveLength(11);
      expect(isValidNisPis(nis)).toBe(true);
    }
  });

  it('aplica máscara corretamente', () => {
    const raw = generateNisPis();
    const masked = maskNisPis(raw);
    expect(masked).toMatch(/^\d{3}\.\d{5}\.\d{2}-\d$/);
  });
});
