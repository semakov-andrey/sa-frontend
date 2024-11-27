export interface Validator<ValidationTokens> {
  validate: (validationToken: keyof ValidationTokens, value: unknown) => boolean;
}
