import classnames from "classnames";
import React from "react";
import Word, { WordProps } from "../Word/Word";
import styles from "./Line.module.scss";

export interface LineProps {
  words: WordProps[];
  className: string;
}

export default ({ words, className }: LineProps) => (
  <div className={classnames(styles.Line, className)}>
    {words.map((token, i) => (
      <Word {...token} key={`word${i}`} />
    ))}
  </div>
);
