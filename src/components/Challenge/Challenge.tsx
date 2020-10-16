import classnames from "classnames";
import React from "react";
import useAccuracy from "../../hooks/useAccuracy";
import { Mistyped } from "../../hooks/useMistypedKeys";
import useTokens from "../../hooks/useTokens";
import useWordsPerMinute from "../../hooks/useWordsPerMinute";
import Line from "../Line/Line";
import NextButton from "../NextButton/NextButton";
import Stats from "../Stats/Stats";
import styles from "./Challenge.module.scss";

interface Props {
  letters: JSX.Element[];
  mistyped: Mistyped;
  startTime: Date | undefined;
  onCompleted: () => void;
}

// Dotnet has a curly on the second line
const discernFormat = (lines: JSX.Element[][][]) => {
  if (lines.length > 1) {
    return lines[1][0][0].props.char === "{" ? "Dotnet" : "Node";
  }
  return "Node";
};

export default ({ letters, mistyped, startTime, onCompleted }: Props) => {
  const accuracy = useAccuracy(letters);

  const { words, lines } = useTokens(letters, mistyped);

  const { wordsPerMinute, completedWordCount, seconds } = useWordsPerMinute(
    words,
    startTime
  );

  const allTyped = letters.every(letter =>
    ["Correct", "Incorrect"].includes(letter.props.status)
  );

  const format = discernFormat(lines);

  return (
    <div className={classnames(styles.Challenge, styles[format])}>
      <div className={styles.Inner}>
        <h1>Ninja Typer</h1>
        <div
          className={classnames(
            styles.Code,
            styles.SolarizedLight,
            allTyped && styles.Completed
          )}
        >
          {lines.map((words, i) => (
            <Line words={words} key={`line${i}`} className={styles.Line} />
          ))}
        </div>

        <NextButton allTyped={allTyped} onCompleted={onCompleted} />

        <Stats
          accuracy={accuracy}
          wordsPerMinute={wordsPerMinute}
          completedWordCount={completedWordCount}
          seconds={seconds}
        />
      </div>
    </div>
  );
};
