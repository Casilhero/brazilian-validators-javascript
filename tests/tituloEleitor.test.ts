import { describe, it, expect } from 'vitest';
import { isValidTituloEleitor, validateTituloEleitor, generateTituloEleitor, maskTituloEleitor } from '../src/validators/tituloEleitor';

describe('TituloEleitor', () => {
  it('gera e valida Título de Eleitor', () => {
    for (let i = 0; i < 10; i++) {
      const t = generateTituloEleitor();
      expect(isValidTituloEleitor(t)).toBe(true);
    }
  });

  it('rejeita título com comprimento errado', () => {
    expect(isValidTituloEleitor('1234567890')).toBe(false);
    expect(isValidTituloEleitor('12345678901234')).toBe(false);
  });
});
