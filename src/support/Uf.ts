export const UF_VALUES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;

export type Uf = (typeof UF_VALUES)[number];

export function isUf(value: string): value is Uf {
  return (UF_VALUES as readonly string[]).includes(value.toUpperCase());
}

export function toUf(value: string): Uf | undefined {
  const upper = value.toUpperCase();
  return (UF_VALUES as readonly string[]).includes(upper)
    ? (upper as Uf)
    : undefined;
}
