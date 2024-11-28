import { type ZodType } from 'zod';

import { type Validator } from '@sa-frontend/application/contracts/Validator/Validator.contract';

export class ZodValidator<ValidationTokens> implements Validator<ValidationTokens> {
  constructor(private schemas: {
    [k in keyof ValidationTokens]: ZodType<ValidationTokens[k]>
  }) {}

  public validate = (validationToken: keyof ValidationTokens, value: unknown): boolean => {
    const result = this.schemas[validationToken].safeParse(value);
    if ('error' in result) {
      console.error(validationToken, result.error?.format());
    }
    return result.success;
  };
}
