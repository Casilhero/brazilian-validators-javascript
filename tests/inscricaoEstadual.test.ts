import { describe, it, expect } from 'vitest';
import { isValidInscricaoEstadual, validateInscricaoEstadual, maskInscricaoEstadual } from '../src/validators/inscricaoEstadual';

describe('InscricaoEstadual', () => {
  it('rejeita UF desconhecida', () => {
    expect(isValidInscricaoEstadual('123456789', 'XX')).toBe(false);
  });

  it('aceita UF em minúsculas', () => {
    const result = validateInscricaoEstadual('123456789', 'sp');
    expect(result.code()).not.toBe('invalid_region');
  });

  describe('AC', () => {
    it('valida e invalida IE/AC', () => {
      expect(isValidInscricaoEstadual('0100482300112', 'AC')).toBe(true);
      expect(isValidInscricaoEstadual('0100482300113', 'AC')).toBe(false);
    });
  });

  describe('CE', () => {
    it('valida IE/CE', () => {
      expect(isValidInscricaoEstadual('060000023', 'CE')).toBe(true);
    });
  });

  describe('SP', () => {
    it('rejeita SP com comprimento errado', () => {
      const r = validateInscricaoEstadual('12345', 'SP');
      expect(r.isValid()).toBe(false);
      expect(r.code()).toBe('invalid_length');
    });
  });

  describe('máscara', () => {
    it('retorna apenas caracteres normalizados', () => {
      expect(maskInscricaoEstadual('010.048.230.0112')).toBe('0100482300112');
    });
  });
});
