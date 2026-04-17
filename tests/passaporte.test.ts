import { describe, it, expect } from 'vitest';
import { isValidPassaporte, validatePassaporte, generatePassaporte, maskPassaporte } from '../src/validators/passaporte';

describe('Passaporte', () => {
  it('valida passaporte correto', () => {
    expect(isValidPassaporte('AA123456')).toBe(true);
    expect(isValidPassaporte('AB999999')).toBe(true);
  });

  it('rejeita passaporte com formato errado', () => {
    expect(isValidPassaporte('A1234567')).toBe(false);
    expect(isValidPassaporte('ABC12345')).toBe(false);
    expect(isValidPassaporte('AA12345')).toBe(false);
  });

  it('gera passaporte válido', () => {
    const p = generatePassaporte();
    expect(isValidPassaporte(p)).toBe(true);
  });

  it('aplica máscara (retorna uppercase sem espaços)', () => {
    expect(maskPassaporte('aa123456')).toBe('AA123456');
  });
});
