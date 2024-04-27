export const handleErrorType =
  // eslint-disable-next-line no-unused-vars
  (type: any, cb: (e: unknown) => never) =>
  (error: unknown): never => {
    if (error instanceof type) cb(error);
    else throw error;
  };

export const handleUniqueConstraintError = (field: string) => (): never => {
  throw new UniqueConstraintError(field);
};

export class UniqueConstraintError extends Error {
  constructor(field: string, options?: ErrorOptions) {
    super(`The ${field} is already registered`, options);
  }
}
