const TIPO_LIVRO: Record<number, string> = {
  1: 'Livro A (Nascimento)',
  2: 'Livro B (Casamento)',
  3: 'Livro B Auxiliar (Casamento Religioso com efeito civil)',
  4: 'Livro C (Óbito)',
  5: 'Livro C Auxiliar (Natimorto)',
  6: 'Livro D (Registro de Proclamas)',
  7: 'Livro E (Demais atos relativos ao registro civil ou livro E único)',
  8: 'Livro E (Desdobrado para registro específico das Emancipações)',
  9: 'Livro E (Desdobrado para registro específico das Interdições)',
};

const CODIGO_ACERVO: Record<string, string> = {
  '01': 'Acervo próprio',
  '02': 'Acervo incorporado (até 31/12/2009)',
};

export interface CertidaoInfoData {
  codigoServentia: string;
  codigoAcervo: string;
  codigoServico: string;
  ano: number;
  tipoLivro: number;
  numeroLivro: string;
  folha: string;
  numeroTermo: string;
}

export class CertidaoInfo {
  readonly codigoServentia: string;
  readonly codigoAcervo: string;
  readonly codigoServico: string;
  readonly ano: number;
  readonly tipoLivro: number;
  readonly numeroLivro: string;
  readonly folha: string;
  readonly numeroTermo: string;

  constructor(data: CertidaoInfoData) {
    this.codigoServentia = data.codigoServentia;
    this.codigoAcervo = data.codigoAcervo;
    this.codigoServico = data.codigoServico;
    this.ano = data.ano;
    this.tipoLivro = data.tipoLivro;
    this.numeroLivro = data.numeroLivro;
    this.folha = data.folha;
    this.numeroTermo = data.numeroTermo;
  }

  descricaoAcervo(): string {
    return CODIGO_ACERVO[this.codigoAcervo] ?? 'Desconhecido';
  }

  descricaoLivro(): string {
    return TIPO_LIVRO[this.tipoLivro] ?? 'Desconhecido';
  }

  toObject(): Record<string, unknown> {
    return {
      codigo_serventia: this.codigoServentia,
      codigo_acervo: this.codigoAcervo,
      descricao_acervo: this.descricaoAcervo(),
      codigo_servico: this.codigoServico,
      ano: this.ano,
      tipo_livro: this.tipoLivro,
      descricao_livro: this.descricaoLivro(),
      numero_livro: this.numeroLivro,
      folha: this.folha,
      numero_termo: this.numeroTermo,
    };
  }
}
