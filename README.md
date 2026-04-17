# @casilhero/brazilian-validators

Biblioteca TypeScript para validação, geração e formatação de documentos e identificadores brasileiros.

[![npm](https://img.shields.io/npm/v/@casilhero/brazilian-validators)](https://www.npmjs.com/package/@casilhero/brazilian-validators)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Instalação

```bash
npm install @casilhero/brazilian-validators
```

## Compatibilidade

- Node.js ≥ 18
- Navegadores modernos (ESM nativo)
- TypeScript 5.x
- Funciona tanto com ESM quanto com CommonJS

---

## Uso

### Facade unificada

```typescript
import { BrazilianValidator } from '@casilhero/brazilian-validators';

// CPF
BrazilianValidator.isValidCpf('529.982.247-25'); // true
BrazilianValidator.validateCpf('11111111111'); // ValidationResult (inválido)
BrazilianValidator.generateCpf(); // '52998224725'
BrazilianValidator.maskCpf('52998224725'); // '529.982.247-25'

// Boleto
BrazilianValidator.isValidBoleto(
  '34191.79001 01043.510047 91020.150008 2 85480000000000',
); // true
BrazilianValidator.generateBoleto(); // string de 47 dígitos
BrazilianValidator.maskBoleto(
  '34191790010104351004791020150008285480000000000',
); // '34191.79001 01043.510047 91020.150008 2 85480000000000'
BrazilianValidator.parseBoleto(
  '00190000090114971860168524522114675860000102656',
); // BoletoInfo | null

// Inscrição Estadual
BrazilianValidator.isValidInscricaoEstadual('0100482300112', 'AC'); // true
```

### Validators individuais

```typescript
import {
  isValidCpf,
  validateCpf,
  generateCpf,
  maskCpf,
  isValidCnpj,
  generateCnpj,
  maskCnpj,
  isValidCpfCnpj,
  generateCnh,
  generateCns,
  generateNisPis,
  maskNisPis,
  isValidPhone,
  generatePhone,
  maskPhone,
  isValidPhoneDdi,
  generatePhoneDdi,
  isValidSuframa,
  isValidRenavam,
  generateRenavam,
  generateTituloEleitor,
  generateChassi,
  isValidPassaporte,
  generatePassaporte,
  isValidCertidao,
  generateCertidao,
  parseCertidao,
  generateCaepf,
  isValidProcessoJudicial,
  generateProcessoJudicial,
  maskProcessoJudicial,
  isValidBoleto,
  generateBoleto,
  maskBoleto,
  parseBoleto,
  isValidInscricaoEstadual,
  validateInscricaoEstadual,
} from '@casilhero/brazilian-validators';

// CPF
isValidCpf('529.982.247-25'); // true
validateCpf('11111111111'); // ValidationResult
generateCpf(); // string com 11 dígitos válidos
maskCpf('52998224725'); // '529.982.247-25'

// CNPJ (suporta formato alfanumérico 2026)
isValidCnpj('11.222.333/0001-81'); // true
generateCnpj(); // CNPJ numérico com 14 chars
maskCnpj('11222333000181'); // '11.222.333/0001-81'

// CPF ou CNPJ (detecta automaticamente)
isValidCpfCnpj('529.982.247-25');
isValidCpfCnpj('11.222.333/0001-81');

// CNH
generateCnh(); // CNH com 11 dígitos

// CNS (Cartão Nacional de Saúde)
generateCns(); // 15 dígitos

// NIS / PIS / PASEP
generateNisPis(); // 11 dígitos
maskNisPis('12345678901'); // '123.45678.90-1'

// Telefone (com DDD)
isValidPhone('(11) 91234-5678'); // true
generatePhone(); // ex: '11912345678'
maskPhone('11912345678'); // '(11) 91234-5678'

// Telefone com DDI (Brasil = +55)
isValidPhoneDdi('+55 (11) 91234-5678'); // true
generatePhoneDdi();

// SUFRAMA
isValidSuframa('200123456'); // true

// RENAVAM
isValidRenavam('94581703293'); // true
generateRenavam(); // 11 dígitos

// Título de Eleitor
generateTituloEleitor(); // 12 ou 13 dígitos

// Chassi (VIN)
generateChassi(); // VIN com 17 caracteres e DV correto

// Passaporte brasileiro
isValidPassaporte('AA123456'); // true
generatePassaporte(); // ex: 'AB123456'

// Certidão de Registro Civil
const certidao = generateCertidao();
isValidCertidao(certidao); // true
parseCertidao(certidao); // CertidaoInfo | null

// CAEPF
generateCaepf(); // 14 dígitos com DV

// Processo Judicial (CNJ)
const processo = generateProcessoJudicial();
isValidProcessoJudicial(processo); // true
maskProcessoJudicial(processo); // '0001234-12.2024.1.02.0001'

// Boleto bancário / arrecadação
const boleto = generateBoleto();
isValidBoleto(boleto); // true
maskBoleto(boleto); // '34191.79001 01043.510047 91020.150008 2 85480000000000'
parseBoleto(boleto); // BoletoInfo | null

// Inscrição Estadual
isValidInscricaoEstadual('0100482300112', 'AC'); // true
validateInscricaoEstadual('123', 'SP'); // ValidationResult
```

---

## ValidationResult

Todos os métodos `validate()` retornam um `ValidationResult`:

```typescript
import { ValidationResult, ErrorCode } from '@casilhero/brazilian-validators';

const result = Cpf.validate('11111111111');
result.isValid(); // false
result.code(); // 'invalid_format'
result.context(); // {}
```

### Códigos de erro (`ErrorCode`)

| Código             | Descrição                                        |
| ------------------ | ------------------------------------------------ |
| `invalid_length`   | Comprimento incorreto                            |
| `invalid_format`   | Formato inválido (ex.: dígitos repetidos, regex) |
| `invalid_checksum` | Dígito verificador incorreto                     |
| `invalid_region`   | UF desconhecida (Inscrição Estadual)             |
| `invalid_prefix`   | Prefixo inválido                                 |

---

## Inscrição Estadual

Suporta todas as 27 UFs. Aceita a UF como string (maiúscula ou minúscula):

```typescript
InscricaoEstadual.isValid('123.456.789', 'SP');
InscricaoEstadual.isValid('123.456.789', 'sp');
```

### UFs suportadas

AC · AL · AM · AP · BA · CE · DF · ES · GO · MA · MG · MS · MT ·
PA · PB · PE · PI · PR · RJ · RN · RO · RR · RS · SC · SE · SP · TO

---

## CertidaoInfo

O método `Certidao.parse()` retorna um objeto `CertidaoInfo` com as informações da certidão decodificadas:

```typescript
const info = parseCertidao('21002008552014105030414345600003')!;
info.codigoServentia; // '210020'
info.codigoAcervo; // '08'
info.ano; // 2014
info.tipoLivro; // 1
info.descricaoLivro(); // 'Livro A (Nascimento)'
info.descricaoAcervo(); // 'Acervo próprio'
info.toObject(); // objeto plano com todos os campos
```

---

## BoletoInfo

O método `parseBoleto()` retorna um objeto `BoletoInfo` com as informações do boleto decodificadas:

```typescript
import { parseBoleto } from '@casilhero/brazilian-validators';

const info = parseBoleto('00190000090114971860168524522114675860000102656')!;
info.type; // 'bancario'
info.bankCode; // '001'
info.currency; // '9'
info.freeField; // campo livre (25 dígitos para bancário)
info.amount; // 102656 (em centavos)
info.expirationDate; // Date | null
```

---

## Suporte a Tipos

O pacote exporta os tipos TypeScript necessários:

```typescript
import type {
  Uf,
  ValidationResult,
  ErrorCodeValue,
  CertidaoInfo,
  BoletoInfo,
} from '@casilhero/brazilian-validators';
```

---

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar
npm run build

# Testes
npm test

# Verificação de tipos
npm run typecheck
```

---

## Licença

MIT — veja [LICENSE](LICENSE)
