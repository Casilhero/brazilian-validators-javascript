export const Normalizer = {
  digits(value: string): string {
    return value.replace(/\D+/g, '');
  },

  isRepeatedDigits(digits: string): boolean {
    return digits.length > 0 && /^(.)\1+$/.test(digits);
  },

  cnpjAlphanumeric(value: string): string {
    return value.replace(/[.\-\/\s]+/g, '').toUpperCase();
  },
};
