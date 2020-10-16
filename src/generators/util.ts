export const camelize = (input: string) =>
  input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");

export const pascalize = (input: string) =>
  input
    .replace(
      /(\w)(\w*)/g,
      (_g0, g1, g2) => `${g1.toUpperCase()}${g2.toLowerCase()}`
    )
    .replace(/ /g, "");
