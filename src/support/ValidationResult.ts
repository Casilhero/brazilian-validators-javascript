export class ValidationResult {
  private constructor(
    private readonly _valid: boolean,
    private readonly _code?: string,
    private readonly _context: Record<string, unknown> = {},
  ) {}

  static valid(): ValidationResult {
    return new ValidationResult(true);
  }

  static invalid(
    code: string,
    context: Record<string, unknown> = {},
  ): ValidationResult {
    return new ValidationResult(false, code, context);
  }

  isValid(): boolean {
    return this._valid;
  }

  code(): string | undefined {
    return this._code;
  }

  context(): Record<string, unknown> {
    return this._context;
  }
}
