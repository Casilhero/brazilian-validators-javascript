import { describe, it, expect } from 'vitest';
import { isValidProcessoJudicial, validateProcessoJudicial, generateProcessoJudicial, maskProcessoJudicial } from '../src/validators/processoJudicial';

describe('ProcessoJudicial', () => {
  it('gera e valida processo judicial', () => {
    for (let i = 0; i < 5; i++) {
      const p = generateProcessoJudicial();
      expect(isValidProcessoJudicial(p)).toBe(true);
    }
  });

  it('rejeita processo com comprimento errado', () => {
    expect(isValidProcessoJudicial('123')).toBe(false);
  });

  it('aplica máscara', () => {
    const p = generateProcessoJudicial();
    const masked = maskProcessoJudicial(p);
    expect(masked).toMatch(/^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/);
  });
});
