type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

const truthy = <T>(value: T): value is Truthy<T> => !!value;

export const compact = <T>(arr: T[]) => arr.filter(truthy);

export const orderBy = function orderBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc',
  comparator?: (a: any, b: any) => number,
): T[] {
  const compare = comparator || ((a, b) => (order === 'asc' ? a - b : b - a));
  return array.slice().sort((a, b) => compare(a[key], b[key]));
};
