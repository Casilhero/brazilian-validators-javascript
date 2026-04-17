import { describe, it, expect } from 'vitest';
import { isValidSuframa, validateSuframa, generateSuframa, maskSuframa } from '../src/validators/suframa';

describe('Suframa', () => {
  it('gera e valida SUFRAMA', () => {
    for (let i = 0; i < 5; i++) {
      const s = generateSuframa();
      expect(s).toHaveLength(9);
      expect(isValidSuframa(s)).toBe(true);
    }
  });

  it('rejeita SUFRAMA com comprimento errado', () => {
    expect(isValidSuframa('12345678')).toBe(false);
    expect(isValidSuframa('1234567890')).toBe(false);
  });

  it('rejeita SUFRAMA com prefixo 00', () => {
    expect(isValidSuframa('001234567')).toBe(false);
  });

  it('rejeita SUFRAMA com DV inválido', () => {
    const s = generateSuframa();
    const wrong = s.slice(0, 8) + ((parseInt(s[8], 10) + 1) % 10).toString();
    expect(isValidSuframa(wrong)).toBe(false);
  });
});
