export const createEnumFromArray = <T, K extends keyof T, R extends boolean = false>(array: T[], key: T[K] extends string | number ? K : never, resultIndex?: R): Record<T[K] & (string | number), R extends true ? number : T> => {
  // eslint-disable-next-line local/types-in-distinct-file
  type TResult = R extends true ? number : T;

  return array.reduce((acc, curr, index) => {
    const keyValue = curr[key];

    if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
      throw new TypeError(`Key value must be a string or a number. Got: ${String(keyValue)}`);
    }

    if (acc[keyValue] || !keyValue) {
      throw new Error(`Invalid or duplicate key: ${String(keyValue)}`);
    }

    acc[keyValue] = (resultIndex ? index : curr) as TResult;
    return acc;
  }, {} as Record<T[K] & (string | number), TResult>);
};
