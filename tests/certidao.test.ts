import { describe, it, expect } from 'vitest';
import { isValidCertidao, validateCertidao, generateCertidao, maskCertidao, parseCertidao } from '../src/validators/certidao';

describe('Certidao', () => {
  it('gera e valida certidão', () => {
    for (let i = 0; i < 5; i++) {
      const c = generateCertidao();
      expect(isValidCertidao(c)).toBe(true);
    }
  });

  it('faz parse da certidão', () => {
    const c = generateCertidao();
    const info = parseCertidao(c);
    expect(info).not.toBeNull();
    expect(info!.codigoServentia).toBeDefined();
    expect(info!.ano).toBeGreaterThan(0);
  });

  it('retorna null para certidão inválida', () => {
    expect(parseCertidao('12345')).toBeNull();
  });

  it('rejeita certidão com DV inválido', () => {
    expect(isValidCertidao('12345678901234567890123456789012')).toBe(false);
  });
});
