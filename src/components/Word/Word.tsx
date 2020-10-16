import classnames from "classnames";
import React from "react";
import styles from "./Word.module.scss";
import Char, { CharProps } from "../Char/Char";

export interface WordProps {
  letters: CharProps[];
}

const specialCaseClass = (letters: CharProps[]) => {
  if (letters && letters.length === 1) {
    switch (letters[0].char) {
      case "\n":
        return styles.EnterToken;
      default:
        return undefined;
    }
  }
};

export default ({ letters }: WordProps) => {
  return (
    <div className={classnames(styles.Word, specialCaseClass(letters))}>
      {letters.map((char, i) => (
        <Char {...char} key={`char${i}`} />
      ))}
    </div>
  );
};
