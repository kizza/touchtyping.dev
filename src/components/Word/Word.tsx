import classnames from "classnames";
import React from "react";
import styles from "./Word.module.scss";
import Char, { CharProps } from "../Char/Char";

export type Syntax =
  | "Const"
  | "Bracket"
  | "Variable"
  | "EnterToken"
  | undefined;

export interface WordProps {
  letters: CharProps[];
  syntax?: Syntax;
}

/* const specialCaseClass = (letters: CharProps[]) => { */
/*   if (letters && letters.length === 1) { */
/*     switch (letters[0].char) { */
/*       case "\n": */
/*         return styles.EnterToken; */
/*       default: */
/*         return undefined; */
/*     } */
/*   } */
/* }; */

export const wordAsString = (word: CharProps[]) =>
  word
    .map(char => char.char)
    .join("")
    .trim();

export default ({ letters, syntax }: WordProps) => {
  const syntaxClass = syntax ? styles[syntax] : undefined;
  return (
    <div className={classnames(styles.Word, syntaxClass)}>
      {letters.map((char, i) => (
        <Char {...char} key={`char${i}`} />
      ))}
    </div>
  );
};
