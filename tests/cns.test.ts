import { describe, it, expect } from 'vitest';
import { isValidCns, validateCns, generateCns, maskCns } from '../src/validators/cns';

describe('Cns', () => {
  it('valida CNS iniciado em 1 ou 2', () => {
    const cns = generateCns();
    expect(isValidCns(cns)).toBe(true);
  });

  it('rejeita CNS com comprimento errado', () => {
    expect(isValidCns('1234567890123')).toBe(false);
    expect(isValidCns('12345678901234567')).toBe(false);
  });

  it('rejeita CNS com prefixo inválido (0)', () => {
    expect(isValidCns('012345678901234')).toBe(false);
  });

  it('gera CNS válido', () => {
    for (let i = 0; i < 5; i++) {
      const cns = generateCns();
      expect(cns).toHaveLength(15);
      expect(isValidCns(cns)).toBe(true);
    }
  });
});
