import classnames from "classnames";
import React, { useContext } from "react";
import Confetti, { ConfettiConfig } from "react-dom-confetti";
import { Syntax } from "../Word/Word";
import styles from "./Char.module.scss";
import { SettingsContext } from "../../hooks/useSettings";

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

const confettiConfig: ConfettiConfig = {
  angle: 90,
  spread: 10,
  startVelocity: 16,
  elementCount: 2,
  dragFriction: 0.12,
  duration: 400,
  stagger: 3,
  width: "8px",
  height: "8px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const confetti = (active: boolean) => (
  <div className={styles.Confetti}>
    <Confetti config={confettiConfig} active={active} />
  </div>
);

export default ({
  char,
  typedChar,
  wasCorrected,
  showCursor,
  status,
}: CharProps) => {
  const { keypressConfetti } = useContext(SettingsContext);

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
      {keypressConfetti && confetti(status === "Correct")}
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
