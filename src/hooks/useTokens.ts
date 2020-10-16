import { Mistyped } from "./useMistypedKeys";
import useTokeniser from "./useTokeniser";
import { CharProps } from "../components/Char/Char";

const lettersWithCorrections = (letters: CharProps[], mistyped: Mistyped) =>
  letters.map((letter, i) =>
    mistyped[i] === true ? { ...letter, wasCorrected: true } : letter
  );

export default (letters: CharProps[], mistyped: Mistyped) => {
  const words = useTokeniser<CharProps>(
    lettersWithCorrections(letters, mistyped),
    letter => letter.char === " ", // Split _inclusively_ of space character (include it within the token)
    letter => letter.char === "\n" // Split _exclusively_ on new line (
  );

  const lines = useTokeniser<CharProps[]>(
    words,
    tokens => tokens.length === 1 && tokens[0].char === "\n", // Split _inclusively_ of line breaks
    () => false
  );

  return { words, lines };
};
