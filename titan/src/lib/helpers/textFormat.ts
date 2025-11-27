/**
 * Format a text to upper camel case
 * @param baseText
 * @returns
 */
export const toUpperCamelCase = (baseText: string): string => {
  try {
    return baseText
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    return baseText;
  }
};
