// Validators — CPF
export {
  isValidCpf,
  validateCpf,
  generateCpf,
  maskCpf,
} from './validators/cpf';

// Validators — CNPJ
export {
  isValidCnpj,
  validateCnpj,
  generateCnpj,
  maskCnpj,
} from './validators/cnpj';

// Validators — CPF ou CNPJ
export {
  isValidCpfCnpj,
  validateCpfCnpj,
  generateCpfCnpj,
  maskCpfCnpj,
} from './validators/cpfCnpj';

// Validators — CNH
export {
  isValidCnh,
  validateCnh,
  generateCnh,
  maskCnh,
} from './validators/cnh';

// Validators — CNS
export {
  isValidCns,
  validateCns,
  generateCns,
  maskCns,
} from './validators/cns';

// Validators — NIS/PIS
export {
  isValidNisPis,
  validateNisPis,
  generateNisPis,
  maskNisPis,
} from './validators/nisPis';

// Validators — Telefone
export {
  isValidPhone,
  validatePhone,
  generatePhone,
  maskPhone,
  validateNationalDigits,
} from './validators/phone';

// Validators — Telefone com DDI
export {
  isValidPhoneDdi,
  validatePhoneDdi,
  generatePhoneDdi,
  maskPhoneDdi,
} from './validators/phoneDdi';

// Validators — SUFRAMA
export {
  isValidSuframa,
  validateSuframa,
  generateSuframa,
  maskSuframa,
} from './validators/suframa';

// Validators — RENAVAM
export {
  isValidRenavam,
  validateRenavam,
  generateRenavam,
  maskRenavam,
} from './validators/renavam';

// Validators — Título de Eleitor
export {
  isValidTituloEleitor,
  validateTituloEleitor,
  generateTituloEleitor,
  maskTituloEleitor,
} from './validators/tituloEleitor';

// Validators — Chassi (VIN)
export {
  isValidChassi,
  validateChassi,
  generateChassi,
  maskChassi,
} from './validators/chassi';

// Validators — Passaporte
export {
  isValidPassaporte,
  validatePassaporte,
  generatePassaporte,
  maskPassaporte,
} from './validators/passaporte';

// Validators — Certidão
export {
  isValidCertidao,
  validateCertidao,
  generateCertidao,
  maskCertidao,
  parseCertidao,
} from './validators/certidao';

// Validators — CAEPF
export {
  isValidCaepf,
  validateCaepf,
  generateCaepf,
  maskCaepf,
} from './validators/caepf';

// Validators — Processo Judicial
export {
  isValidProcessoJudicial,
  validateProcessoJudicial,
  generateProcessoJudicial,
  maskProcessoJudicial,
} from './validators/processoJudicial';

// Validators — Boleto bancário e de arrecadação
export {
  isValidBoleto,
  validateBoleto,
  generateBoleto,
  maskBoleto,
  parseBoleto,
} from './validators/boleto';
export { BoletoInfo } from './support/BoletoInfo';

// Validators — Inscrição Estadual
export {
  isValidInscricaoEstadual,
  validateInscricaoEstadual,
  maskInscricaoEstadual,
} from './validators/inscricaoEstadual';

// Façade (opt-in)
export { BrazilianValidator } from './BrazilianValidator';

// Support types
export { ErrorCode } from './support/ErrorCode';
export type { ErrorCodeValue } from './support/ErrorCode';
export { ValidationResult } from './support/ValidationResult';
export { CertidaoInfo } from './support/CertidaoInfo';
export { UF_VALUES } from './support/Uf';
export type { Uf } from './support/Uf';
export { isUf, toUf } from './support/Uf';
export { Normalizer } from './support/Normalizer';
export { BrazilianAreaCodes } from './support/BrazilianAreaCodes';
export { Tribunais } from './support/Tribunais';
