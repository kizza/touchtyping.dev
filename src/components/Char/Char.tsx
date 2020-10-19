import classnames from "classnames";
import React from "react";
import { Syntax } from "../Word/Word";
import styles from "./Char.module.scss";

export type CharStatus = "Correct" | "Incorrect" | "Untyped";

export interface CharProps {
  char: string;
  status: CharStatus;
  showCursor: boolean;
  wasCorrected?: boolean;
  typedChar?: string;
  syntax?: Syntax;
}

const specialCharClassName = (char: string) => {
  switch (char) {
    case "\n":
      return styles.EnterKey;
    case "(":
    case ")":
    case "[":
    case "]":
    case "{":
    case "}":
      return styles.Bracket;
    default:
      return undefined;
  }
};

const formatChar = (char?: string) => {
  switch (char) {
    case " ":
      return "\u00A0"; // nbsp for jsx
    case "\n":
      return "\u00A0"; // nbsp for jsx
    default:
      return char;
  }
};

export default ({
  char,
  typedChar,
  wasCorrected,
  showCursor,
  status,
}: CharProps) => {
  return (
    <div
      className={classnames(
        styles.Char,
        specialCharClassName(char),
        wasCorrected && styles.WasCorrected,
        showCursor && styles.WithCursor,
        styles[status]
      )}
    >
      <span>{formatChar(char)}</span>
      <span
        className={classnames(
          styles.IncorrectFeedback,
          status === "Incorrect" && styles.FadeOut
        )}
      >
        {formatChar(typedChar)}
      </span>
    </div>
  );
};
