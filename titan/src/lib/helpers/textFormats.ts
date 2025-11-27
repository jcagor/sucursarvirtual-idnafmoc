export const nameFormat = (name: string): string => {
  const words = name.toLowerCase().split(" ");

  const transformedName = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return transformedName.join(" ");
};
