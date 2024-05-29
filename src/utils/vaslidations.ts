// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

export const validateMandatoryFields = <T extends AnyObject>(
  obj: T,
  fields: (keyof T)[]
): boolean => {
  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null) {
      return false;
    }
  }
  return true;
};
