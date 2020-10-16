import React from "react";
import Char, { CharStatus } from "../components/Char/Char";

// type Char = string;
type Typed = string;
type Untyped = string;

type CharInput = [string, Typed | Untyped];

interface TypedStatus {
  letters: JSX.Element[];
  cursorAt: number;
}

const UNTYPED = "@";

const charStatus = ([char, typed]: CharInput): CharStatus => {
  if (typed === UNTYPED) {
    return "Untyped";
  }
  return char === typed ? "Correct" : "Incorrect";
};

export default (input: string, typed: string): TypedStatus => {
  const typedChars = typed.split("");

  const zipped: CharInput[] = input
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
          <Char
            key={`key${i}`}
            char={char}
            typedChar={typed === UNTYPED ? "" : typed}
            showCursor={cursorPosition === i}
            status={status}
          />,
        ],
        cursorAt: cursorPosition,
      };
    },
    { letters: [] as JSX.Element[], cursorAt: -1 } as TypedStatus
  );

  return result;
};
