import { CharProps, CharStatus } from "../components/Char/Char";

type Letter = string;
type Typed = string;
type Untyped = string;
type ZippedChars = [Letter, Typed | Untyped];

interface ResultStatus {
  letters: CharProps[];
  cursorAt: number;
}

const UNTYPED = "^";

const charStatus = ([char, typed]: ZippedChars): CharStatus => {
  if (typed === UNTYPED) {
    return "Untyped";
  }
  return char === typed ? "Correct" : "Incorrect";
};

export default (input: string, typed: string): ResultStatus => {
  const typedChars = typed.split("");

  const zipped: ZippedChars[] = input
    .split("")
    .map((char, i) => [char, typedChars[i] || UNTYPED]);

  const result = zipped.reduce(
    (acc, each, i) => {
      const [char, typed] = each;
      const { letters, cursorAt } = acc;
      const status = charStatus(each);
      const cursorPosition =
        cursorAt === -1 && typed === UNTYPED ? i : cursorAt;

      return {
        letters: [
          ...letters,
          {
            char,
            status,
            typedChar: typed === UNTYPED ? "" : typed,
            showCursor: cursorPosition === i,
          },
        ],
        cursorAt: cursorPosition,
      };
    },
    { letters: [] as CharProps[], cursorAt: -1 } as ResultStatus
  );

  return result;
};
