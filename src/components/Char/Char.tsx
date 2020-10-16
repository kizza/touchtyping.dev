import classnames from "classnames";
import React from "react";
import styles from "./Char.module.scss";

export type CharStatus = "Correct" | "Incorrect" | "Untyped";

interface Props {
  char: string;
  status: CharStatus;
  showCursor: boolean;
  wasCorrected?: boolean;
  typedChar?: string;
}

const specialCharClassName = (char: string) => {
  switch (char) {
    case "\n":
      return styles.EnterKey;
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
}: Props) => {
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
