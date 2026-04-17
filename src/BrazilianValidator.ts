import {
  isValidCpf,
  validateCpf,
  generateCpf,
  maskCpf,
} from './validators/cpf';
import {
  isValidCnpj,
  validateCnpj,
  generateCnpj,
  maskCnpj,
} from './validators/cnpj';
import {
  isValidCpfCnpj,
  validateCpfCnpj,
  generateCpfCnpj,
  maskCpfCnpj,
} from './validators/cpfCnpj';
import {
  isValidCnh,
  validateCnh,
  generateCnh,
  maskCnh,
} from './validators/cnh';
import {
  isValidCns,
  validateCns,
  generateCns,
  maskCns,
} from './validators/cns';
import {
  isValidNisPis,
  validateNisPis,
  generateNisPis,
  maskNisPis,
} from './validators/nisPis';
import {
  isValidPhone,
  validatePhone,
  generatePhone,
  maskPhone,
} from './validators/phone';
import {
  isValidPhoneDdi,
  validatePhoneDdi,
  generatePhoneDdi,
  maskPhoneDdi,
} from './validators/phoneDdi';
import {
  isValidSuframa,
  validateSuframa,
  generateSuframa,
  maskSuframa,
} from './validators/suframa';
import {
  isValidRenavam,
  validateRenavam,
  generateRenavam,
  maskRenavam,
} from './validators/renavam';
import {
  isValidTituloEleitor,
  validateTituloEleitor,
  generateTituloEleitor,
  maskTituloEleitor,
} from './validators/tituloEleitor';
import {
  isValidChassi,
  validateChassi,
  generateChassi,
  maskChassi,
} from './validators/chassi';
import {
  isValidPassaporte,
  validatePassaporte,
  generatePassaporte,
  maskPassaporte,
} from './validators/passaporte';
import {
  isValidCertidao,
  validateCertidao,
  generateCertidao,
  maskCertidao,
  parseCertidao,
} from './validators/certidao';
import {
  isValidCaepf,
  validateCaepf,
  generateCaepf,
  maskCaepf,
} from './validators/caepf';
import {
  isValidProcessoJudicial,
  validateProcessoJudicial,
  generateProcessoJudicial,
  maskProcessoJudicial,
} from './validators/processoJudicial';
import {
  isValidBoleto,
  validateBoleto,
  generateBoleto,
  maskBoleto,
  parseBoleto,
} from './validators/boleto';
import {
  isValidInscricaoEstadual,
  validateInscricaoEstadual,
  maskInscricaoEstadual,
} from './validators/inscricaoEstadual';
import type { Uf } from './support/Uf';

export const BrazilianValidator = {
  // CPF
  isValidCpf,
  validateCpf,
  generateCpf,
  maskCpf,

  // CNPJ
  isValidCnpj,
  validateCnpj,
  generateCnpj,
  maskCnpj,

  // CPF ou CNPJ
  isValidCpfCnpj,
  validateCpfCnpj,
  generateCpfCnpj,
  maskCpfCnpj,

  // CNH
  isValidCnh,
  validateCnh,
  generateCnh,
  maskCnh,

  // CNS
  isValidCns,
  validateCns,
  generateCns,
  maskCns,

  // NIS/PIS
  isValidNisPis,
  validateNisPis,
  generateNisPis,
  maskNisPis,

  // Telefone
  isValidPhone,
  validatePhone,
  generatePhone,
  maskPhone,

  // Telefone com DDI
  isValidPhoneDdi,
  validatePhoneDdi,
  generatePhoneDdi,
  maskPhoneDdi,

  // SUFRAMA
  isValidSuframa,
  validateSuframa,
  generateSuframa,
  maskSuframa,

  // RENAVAM
  isValidRenavam,
  validateRenavam,
  generateRenavam,
  maskRenavam,

  // Título de Eleitor
  isValidTituloEleitor,
  validateTituloEleitor,
  generateTituloEleitor,
  maskTituloEleitor,

  // Chassi
  isValidChassi,
  validateChassi,
  generateChassi,
  maskChassi,

  // Passaporte
  isValidPassaporte,
  validatePassaporte,
  generatePassaporte,
  maskPassaporte,

  // Certidão
  isValidCertidao,
  validateCertidao,
  generateCertidao,
  maskCertidao,
  parseCertidao,

  // CAEPF
  isValidCaepf,
  validateCaepf,
  generateCaepf,
  maskCaepf,

  // Processo Judicial
  isValidProcessoJudicial,
  validateProcessoJudicial,
  generateProcessoJudicial,
  maskProcessoJudicial,

  // Boleto
  isValidBoleto,
  validateBoleto,
  generateBoleto,
  maskBoleto,
  parseBoleto,

  // InscriÃ§Ã£o Estadual
  isValidInscricaoEstadual: (value: string, uf: Uf | string): boolean =>
    isValidInscricaoEstadual(value, uf),
  validateInscricaoEstadual: (value: string, uf: Uf | string) =>
    validateInscricaoEstadual(value, uf),
  maskInscricaoEstadual,
};
