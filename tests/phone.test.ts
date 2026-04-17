import { describe, it, expect } from 'vitest';
import { isValidPhone, validatePhone, generatePhone, maskPhone } from '../src/validators/phone';

describe('Phone', () => {
  it('valida celular com 9 dígitos', () => {
    expect(isValidPhone('(11) 91234-5678')).toBe(true);
    expect(isValidPhone('11912345678')).toBe(true);
  });

  it('valida fixo com 8 dígitos', () => {
    expect(isValidPhone('(11) 3234-5678')).toBe(true);
    expect(isValidPhone('1132345678')).toBe(true);
  });

  it('rejeita DDD inválido', () => {
    expect(isValidPhone('00912345678')).toBe(false);
  });

  it('gera telefone válido', () => {
    const phone = generatePhone();
    expect(isValidPhone(phone)).toBe(true);
  });

  it('aplica máscara em celular', () => {
    const masked = maskPhone('11912345678');
    expect(masked).toMatch(/\(\d{2}\) \d{5}-\d{4}/);
  });

  it('aplica máscara em fixo', () => {
    const masked = maskPhone('1132345678');
    expect(masked).toMatch(/\(\d{2}\) \d{4}-\d{4}/);
  });
});
