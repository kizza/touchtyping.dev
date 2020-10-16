import classnames from "classnames";
import React from "react";
import Word from "../Word/Word";
import styles from "./Line.module.scss";

interface Props {
  words: JSX.Element[][];
  className: string;
}

export default ({ words, className }: Props) => (
  <div className={classnames(styles.Line, className)}>
    {words.map((token, i) => (
      <Word children={token} key={`word${i}`} />
    ))}
  </div>
);
