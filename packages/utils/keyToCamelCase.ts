const snakeToCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('_', '').replace('-', '')
  );
};

export const keyToCamelCase = <T extends Record<string, any>>(obj: T): any => {
  if (Array.isArray(obj)) {
    return obj.map(keyToCamelCase);
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = keyToCamelCase(value);
      return acc;
    }, {} as Record<string, any>);
  }

  return obj;
};
