import { describe, it, expect } from 'vitest';
import { isValidPhoneDdi, validatePhoneDdi, generatePhoneDdi, maskPhoneDdi } from '../src/validators/phoneDdi';

describe('PhoneDdi', () => {
  it('valida telefone com DDI 55', () => {
    expect(isValidPhoneDdi('+55 (11) 91234-5678')).toBe(true);
    expect(isValidPhoneDdi('5511912345678')).toBe(true);
  });

  it('rejeita telefone sem prefixo 55', () => {
    expect(isValidPhoneDdi('1611912345678')).toBe(false);
  });

  it('gera telefone com DDI válido', () => {
    const phone = generatePhoneDdi();
    expect(isValidPhoneDdi(phone)).toBe(true);
  });
});
