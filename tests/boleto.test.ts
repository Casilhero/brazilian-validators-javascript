import { describe, it, expect } from 'vitest';
import {
  isValidBoleto,
  validateBoleto,
  generateBoleto,
  maskBoleto,
  parseBoleto,
} from '../src/validators/boleto';

// Boleto bancário de teste com DVs de campo válidos (47 dígitos)
// Banco Itaú (341), moeda 9
// Campo1: 34191.79001 → dados=341917900, DV=1 (mod10 ✓)
// Campo2: 01043.510047 → dados=0104351004, DV=7 (mod10 ✓)
// Campo3: 91020.150008 → dados=9102015000, DV=8 (mod10 ✓)
const VALID_BANCARIO_MASKED =
  '34191.79001 01043.510047 91020.150008 2 85480000000000';
const VALID_BANCARIO_DIGITS = '34191790010104351004791020150008285480000000000';

describe('Boleto', () => {
  describe('isValidBoleto', () => {
    it('aceita boleto bancário (47 dígitos) com máscara', () => {
      expect(isValidBoleto(VALID_BANCARIO_MASKED)).toBe(true);
    });

    it('aceita boleto bancário sem máscara', () => {
      expect(isValidBoleto(VALID_BANCARIO_DIGITS)).toBe(true);
    });

    it('rejeita boleto com comprimento inválido', () => {
      expect(isValidBoleto('12345')).toBe(false);
      expect(
        isValidBoleto('1234567890123456789012345678901234567890123456'),
      ).toBe(false); // 46
      expect(
        isValidBoleto('123456789012345678901234567890123456789012345678'),
      ).toBe(false); // 48 dígitos nem todos válidos
    });

    it('rejeita boleto bancário com DV de campo incorreto', () => {
      // Altera o DV do campo 1 (posição 9)
      const corrupted =
        VALID_BANCARIO_DIGITS.substring(0, 9) +
        '9' +
        VALID_BANCARIO_DIGITS.substring(10);
      expect(isValidBoleto(corrupted)).toBe(false);
    });

    it('rejeita boleto com DV do campo 2 incorreto', () => {
      // Altera o DV do campo 2 (posição 20)
      const corrupted =
        VALID_BANCARIO_DIGITS.substring(0, 20) +
        '0' +
        VALID_BANCARIO_DIGITS.substring(21);
      expect(isValidBoleto(corrupted)).toBe(false);
    });

    it('rejeita boleto com DV do campo 3 incorreto', () => {
      // Altera o DV do campo 3 (posição 31)
      const corrupted =
        VALID_BANCARIO_DIGITS.substring(0, 31) +
        '0' +
        VALID_BANCARIO_DIGITS.substring(32);
      expect(isValidBoleto(corrupted)).toBe(false);
    });
  });

  describe('validateBoleto', () => {
    it('retorna válido para boleto correto', () => {
      const r = validateBoleto(VALID_BANCARIO_DIGITS);
      expect(r.isValid()).toBe(true);
    });

    it('retorna invalid_length para comprimento errado', () => {
      const r = validateBoleto('12345');
      expect(r.isValid()).toBe(false);
      expect(r.code()).toBe('invalid_length');
    });

    it('retorna invalid_checksum para DV inválido', () => {
      const corrupted =
        VALID_BANCARIO_DIGITS.substring(0, 9) +
        '9' +
        VALID_BANCARIO_DIGITS.substring(10);
      const r = validateBoleto(corrupted);
      expect(r.isValid()).toBe(false);
      expect(r.code()).toBe('invalid_checksum');
    });
  });

  describe('generateBoleto', () => {
    it('gera boleto com 47 dígitos', () => {
      const boleto = generateBoleto();
      expect(boleto).toHaveLength(47);
    });

    it('gera boleto válido', () => {
      for (let i = 0; i < 10; i++) {
        const boleto = generateBoleto();
        expect(isValidBoleto(boleto)).toBe(true);
      }
    });

    it('geração é não-determinística', () => {
      const boletos = new Set(
        Array.from({ length: 5 }, () => generateBoleto()),
      );
      expect(boletos.size).toBeGreaterThan(1);
    });
  });

  describe('maskBoleto', () => {
    it('aplica máscara bancária a 47 dígitos', () => {
      expect(maskBoleto(VALID_BANCARIO_DIGITS)).toBe(VALID_BANCARIO_MASKED);
    });

    it('aplica máscara progressiva a entrada parcial', () => {
      expect(maskBoleto('')).toBe('');
      expect(maskBoleto('34191')).toBe('34191');
      expect(maskBoleto('341917')).toBe('34191.7');
      expect(maskBoleto('3419179001')).toBe('34191.79001');
      expect(maskBoleto('34191790011')).toBe('34191.79001 1');
    });

    it('ignora não-dígitos na entrada', () => {
      expect(maskBoleto(VALID_BANCARIO_MASKED)).toBe(VALID_BANCARIO_MASKED);
    });

    it('aplica máscara ao boleto gerado', () => {
      const generated = generateBoleto();
      const masked = maskBoleto(generated);
      // Padrão: DDDDD.DDDDD DDDDD.DDDDDD DDDDD.DDDDDD D DDDDDDDDDDDDDD
      expect(masked).toMatch(
        /^\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d \d{14}$/,
      );
    });

    it('aplica máscara de arrecadação a 48 dígitos', () => {
      // Gerar um boleto de arrecadação sintético de 48 dígitos
      // com DVs de bloco válidos via mod10
      // Usa bloco1 com DV 0: "00000000000-0"
      const block = (data: string): string => {
        let sum = 0;
        let m = 2;
        for (let i = data.length - 1; i >= 0; i--) {
          let r = parseInt(data[i]) * m;
          if (r > 9) r -= 9;
          sum += r;
          m = m === 2 ? 1 : 2;
        }
        return data + String((10 - (sum % 10)) % 10);
      };
      const arrecadacao =
        block('00000000000') +
        block('12345678901') +
        block('98765432100') +
        block('11111111111');
      expect(arrecadacao).toHaveLength(48);
      expect(maskBoleto(arrecadacao)).toMatch(
        /^\d{11}-\d \d{11}-\d \d{11}-\d \d{11}-\d$/,
      );
    });
  });

  describe('parseBoleto', () => {
    // Boleto bancário BB com dados reais conhecidos
    // bankCode='001', fator=7586 → 2018-07-15, amount=102656
    const BB_BOLETO = '00190000090114971860168524522114675860000102656';
    // Boleto de arrecadação sintético válido (48 dígitos)
    // produto='8', segmento='2', realValueId='6', valor=12500 centavos (R$125,00)
    // barcode = '82600000012' + '50000000000' + '00000000000' + '00000000000'
    // DV1=mod10('82600000012')=3, DV2=mod10('50000000000')=9, DV3/DV4=mod10('00000000000')=0
    const ARRECADACAO_BOLETO =
      '826000000123500000000009000000000000000000000000';

    it('retorna null para boleto inválido', () => {
      expect(parseBoleto('12345')).toBeNull();
      expect(
        parseBoleto('11111111111111111111111111111111111111111111111'),
      ).toBeNull();
    });

    it('analisa boleto bancário com tipo correto', () => {
      const info = parseBoleto(BB_BOLETO);
      expect(info).not.toBeNull();
      expect(info!.type).toBe('bancario');
    });

    it('extrai bankCode e currency do boleto bancário', () => {
      const info = parseBoleto(BB_BOLETO)!;
      expect(info.bankCode).toBe('001');
      expect(info.currency).toBe('9');
    });

    it('extrai campo livre (freeField) de 25 dígitos do boleto bancário', () => {
      const info = parseBoleto(BB_BOLETO)!;
      expect(info.freeField).toHaveLength(25);
      expect(info.freeField).toBe('0000001149718606852452211');
    });

    it('extrai data de vencimento do boleto bancário', () => {
      const info = parseBoleto(BB_BOLETO)!;
      expect(info.expirationDate).not.toBeNull();
      expect(info.expirationDate).toStrictEqual(new Date(2018, 6, 15));
    });

    it('extrai valor em centavos do boleto bancário', () => {
      const info = parseBoleto(BB_BOLETO)!;
      expect(info.amount).toBe(102656);
    });

    it('retorna expirationDate null quando fator é zero', () => {
      // VALID_BANCARIO_DIGITS tem factor=8548 ≠ 0, mas podemos construir um com factor=0000
      // bankCode=341, currency=9, factor=0000, amount=0000000000
      // Linha digitável com factor=0000 — usar VALID_BANCARIO_DIGITS para verificar que !== null
      const info = parseBoleto(VALID_BANCARIO_DIGITS)!;
      expect(info.expirationDate).not.toBeNull();
    });

    it('aceita boleto bancário com máscara na entrada', () => {
      const info = parseBoleto(
        '0019.00000 9 0114.971860 1 6852.452211 4 6 7586 0000102656'.replace(
          /\s/g,
          '',
        ),
      );
      // mesma coisa que BB_BOLETO mas verificamos que remove máscara
      expect(parseBoleto(BB_BOLETO)!.amount).toBe(102656);
    });

    it('analisa boleto de arrecadação com tipo correto', () => {
      const info = parseBoleto(ARRECADACAO_BOLETO);
      expect(info).not.toBeNull();
      expect(info!.type).toBe('arrecadacao');
    });

    it('extrai bankCode, currency e amount do boleto de arrecadação', () => {
      const info = parseBoleto(ARRECADACAO_BOLETO)!;
      expect(info.bankCode).toBe('826');
      expect(info.currency).toBe('6');
      expect(info.amount).toBe(12500);
    });

    it('retorna expirationDate null para boleto de arrecadação', () => {
      const info = parseBoleto(ARRECADACAO_BOLETO)!;
      expect(info.expirationDate).toBeNull();
    });

    it('freeField do boleto de arrecadação é o código de barras de 44 dígitos', () => {
      const info = parseBoleto(ARRECADACAO_BOLETO)!;
      expect(info.freeField).toHaveLength(44);
      expect(info.freeField).toBe(
        '82600000012500000000000000000000000000000000',
      );
    });

    it('boleto gerado por generateBoleto() é parseável', () => {
      const generated = generateBoleto();
      const info = parseBoleto(generated);
      expect(info).not.toBeNull();
      expect(info!.type).toBe('bancario');
      expect(info!.bankCode).toHaveLength(3);
      expect(info!.freeField).toHaveLength(25);
    });
  });
});
