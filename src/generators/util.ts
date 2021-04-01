import nouns from "../locale/en/nouns";
import verbs from "../locale/en/verbs";

type WordGenerator = (existing: string[]) => string;

type FunctionName = string;
type TypeName = string;
type ArgumentName = string;
type VariableName = string;

export type Formatter<T> = (value: string) => T;

type Ingredients = (
  formatFunction: Formatter<FunctionName>,
  formatArgument: Formatter<ArgumentName>,
  formatVariable: Formatter<VariableName>,
  formatType: (value: string, secondValue: string) => TypeName
) => Record<string, string>;

export const ingredients: Ingredients = (
  formatFunction,
  formatArgument,
  formatVariable,
  formatType
) => {
  const {next: noun} = uniqueWords(uniqueNoun, 12);
  const {next: verbNoun} = uniqueWords(uniqueVerbNoun, 7);

  return {
    function1: formatFunction(verbNoun()),
    function2: formatFunction(verbNoun()),
    function3: formatFunction(verbNoun()),
    function4: formatFunction(verbNoun()),
    function5: formatFunction(verbNoun()),
    type1: formatType(noun(), noun()),
    type2: formatType(noun(), noun()),
    type3: formatType(noun(), noun()),
    arg1: formatArgument(noun()),
    arg2: formatArgument(noun()),
    var1: formatVariable(noun()),
    var2: formatVariable(noun()),
    var3: formatVariable(noun()),
    verbNoun1: verbNoun(),
    verbNoun2: verbNoun()
  };
};

const uniqueWords = (fn: WordGenerator, count: number) => {
  const words = Array.from(Array(count).keys()).reduce(
    (acc, _each) => [...acc, fn(acc)],
    [] as string[]
  );
  return { words, next: () => words.pop()! };
};

const uniqueNoun = (existing: string[]): string => {
  const noun = shuffle(nouns)[0];
  return existing.includes(noun) ? uniqueNoun(existing) : noun;
};

const uniqueVerb = (existing: string[]): string => {
  const verb = shuffle(verbs)[0];
  return existing.includes(verb) ? uniqueVerb(existing) : verb;
};

const uniqueVerbNoun = (existing: string[]): string => {
  const verbNoun = zip(shuffle(verbs), shuffle(nouns)).map(pair =>
    pair.join(" ")
  )[0];
  return existing.includes(verbNoun) ? uniqueVerb(existing) : verbNoun;
};

const zip = <T>(arr1: T[], arr2: T[]) => arr1.map((val, i) => [val, arr2[i]]);

const shuffle = <T>(array: T[]) => {
  const shuffled = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
};

export const snakize = (input: string) =>
  input.replace(/ /g, "_").toLowerCase()

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

export const oneOf = (options: any[]) =>
  options[Math.floor(Math.random() * options.length)];
