export const ErrorCode = {
  INVALID_LENGTH: 'invalid_length',
  INVALID_FORMAT: 'invalid_format',
  INVALID_CHECKSUM: 'invalid_checksum',
  INVALID_REGION: 'invalid_region',
  INVALID_PREFIX: 'invalid_prefix',
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];
