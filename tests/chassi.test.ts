import { describe, it, expect } from 'vitest';
import { isValidChassi, validateChassi, generateChassi, maskChassi } from '../src/validators/chassi';

describe('Chassi', () => {
  it('valida chassi gerado (checksum correto)', () => {
    const c = generateChassi();
    expect(isValidChassi(c)).toBe(true);
  });

  it('rejeita chassi com comprimento errado', () => {
    expect(isValidChassi('9BWZZZ377VT00425')).toBe(false);
    expect(isValidChassi('9BWZZZ377VT0042512')).toBe(false);
  });

  it('rejeita chassi com caracteres proibidos (I, O, Q)', () => {
    expect(isValidChassi('9BWZZZ377VT00I251')).toBe(false);
    expect(isValidChassi('9BOWZZZ377VT00425')).toBe(false);
  });

  it('gera chassi válido', () => {
    for (let i = 0; i < 5; i++) {
      const c = generateChassi();
      expect(isValidChassi(c)).toBe(true);
    }
  });
});
