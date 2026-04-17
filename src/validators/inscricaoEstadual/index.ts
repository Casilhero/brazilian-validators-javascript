import { ErrorCode } from '../../support/ErrorCode';
import { ValidationResult } from '../../support/ValidationResult';
import type { Uf } from '../../support/Uf';
import { validateAc } from './ac';
import { validateAl } from './al';
import { validateAm } from './am';
import { validateAp } from './ap';
import { validateBa } from './ba';
import { validateCe } from './ce';
import { validateDf } from './df';
import { validateEs } from './es';
import { validateGo } from './go';
import { validateMa } from './ma';
import { validateMg } from './mg';
import { validateMs } from './ms';
import { validateMt } from './mt';
import { validatePa } from './pa';
import { validatePb } from './pb';
import { validatePe } from './pe';
import { validatePi } from './pi';
import { validatePr } from './pr';
import { validateRj } from './rj';
import { validateRn } from './rn';
import { validateRo } from './ro';
import { validateRr } from './rr';
import { validateRs } from './rs';
import { validateSc } from './sc';
import { validateSe } from './se';
import { validateSp } from './sp';
import { validateTo } from './to';

function normalizeIe(value: string): string {
  return value.replace(/[.\-/\s]+/g, '').toUpperCase();
}

function dispatch(ie: string, uf: string): ValidationResult {
  switch (uf) {
    case 'AC': return validateAc(ie);
    case 'AL': return validateAl(ie);
    case 'AM': return validateAm(ie);
    case 'AP': return validateAp(ie);
    case 'BA': return validateBa(ie);
    case 'CE': return validateCe(ie);
    case 'DF': return validateDf(ie);
    case 'ES': return validateEs(ie);
    case 'GO': return validateGo(ie);
    case 'MA': return validateMa(ie);
    case 'MG': return validateMg(ie);
    case 'MS': return validateMs(ie);
    case 'MT': return validateMt(ie);
    case 'PA': return validatePa(ie);
    case 'PB': return validatePb(ie);
    case 'PE': return validatePe(ie);
    case 'PI': return validatePi(ie);
    case 'PR': return validatePr(ie);
    case 'RJ': return validateRj(ie);
    case 'RN': return validateRn(ie);
    case 'RO': return validateRo(ie);
    case 'RR': return validateRr(ie);
    case 'RS': return validateRs(ie);
    case 'SC': return validateSc(ie);
    case 'SE': return validateSe(ie);
    case 'SP': return validateSp(ie);
    case 'TO': return validateTo(ie);
    default: return ValidationResult.invalid(ErrorCode.INVALID_REGION);
  }
}

export function validateInscricaoEstadual(value: string, uf: Uf | string): ValidationResult {
  const normalizedUf = (uf as string).toUpperCase();
  const ie = normalizeIe(value);
  return dispatch(ie, normalizedUf);
}

export function isValidInscricaoEstadual(value: string, uf: Uf | string): boolean {
  return validateInscricaoEstadual(value, uf).isValid();
}

export function maskInscricaoEstadual(value: string): string {
  return normalizeIe(value);
}
