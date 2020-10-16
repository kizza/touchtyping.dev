import { Mistyped } from "./useMistypedKeys";
import useTokeniser from "./useTokeniser";

const lettersWithCorrections = (letters: JSX.Element[], mistyped: Mistyped) =>
  letters.map((letter, i) =>
    mistyped[i] === true
      ? { ...letter, props: { ...letter.props, wasCorrected: true } }
      : letter
  );

export default (letters: JSX.Element[], mistyped: Mistyped) => {
  const words = useTokeniser<JSX.Element>(
    lettersWithCorrections(letters, mistyped),
    (letter: JSX.Element) => letter.props.char === " ", // Split _inclusively_ of space character (include it within the token)
    (letter: JSX.Element) => letter.props.char === "\n" // Split _exclusively_ on new line (
  );

  const lines = useTokeniser<JSX.Element[]>(
    words,
    (tokens: JSX.Element[]) =>
      tokens.length === 1 && tokens[0].props.char === "\n", // Split _inclusively_ of line breaks
    () => false
  );

  return { words, lines };
};
