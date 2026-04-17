export interface BoletoInfo {
  /** Tipo de boleto: bancário (47 dígitos) ou de arrecadação (48 dígitos). */
  type: 'bancario' | 'arrecadacao';
  /** Código do banco (bancário) ou código de identificação do produto/segmento (arrecadação). */
  bankCode: string;
  /**
   * Código de moeda: '9' para BRL (bancário).
   * Para arrecadação: identificador de valor real — '6' = BRL, '9' = isento.
   */
  currency: string;
  /**
   * Campo livre do boleto:
   * - Bancário: 25 dígitos do campo livre específico do banco.
   * - Arrecadação: código de barras reconstruído (44 dígitos).
   */
  freeField: string;
  /** Data de vencimento calculada a partir do fator de vencimento (bancário). Null para arrecadação ou quando o fator é zero. */
  expirationDate: Date | null;
  /** Valor em centavos (0 quando não especificado ou indeterminável). */
  amount: number;
}
