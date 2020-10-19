import classnames from "classnames";
import React from "react";
import Word, { WordProps, Syntax, wordAsString } from "../Word/Word";
import styles from "./Line.module.scss";
import { CharProps } from "../Char/Char";

export interface LineProps {
  words: WordProps[];
  className: string;
}

const getSyntaxFromText = (word: CharProps[]): Syntax => {
  const string = wordAsString(word);
  switch (string) {
    case "\n":
      return "EnterToken";
    case "function":
      return "Const";
    case "const":
    case "public":
    case "private":
    case "var":
      return "Const";
    default:
      console.log("nothing for", string);
      return undefined;
  }
};

/* const getSyntax = (word: WordProps, last?: WordProps): Syntax => { */
/*   if (last) { */
/*     switch (last.syntax) { */
/*       case "Const": */
/*         return "Variable"; */
/*       default: */
/*         break; */
/*     } */
/*   } */
/*   return getSyntaxFromText(word.letters); */
/* }; */

const wordsWithSyntax = (words: WordProps[]) => {
  return words;
  /* const result = words.reduce((acc, word) => { */
  /*   const [last] = [...acc].reverse(); */
  /*   return [ */
  /*     ...acc, */
  /*     { */
  /*       ...word, */
  /*       syntax: getSyntax(word, last), */
  /*     } as WordProps, */
  /*   ]; */
  /* }, [] as WordProps[]); */
  /* return result; */
};

export default ({ words, className }: LineProps) => (
  <div className={classnames(styles.Line, className)}>
    {wordsWithSyntax(words).map((token, i) => (
      <Word {...token} key={`word${i}`} />
    ))}
  </div>
);
