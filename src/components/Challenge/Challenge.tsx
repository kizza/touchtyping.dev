import classnames from "classnames";
import React, { useContext } from "react";
import useAccuracy from "../../hooks/useAccuracy";
import { Mistyped } from "../../hooks/useMistypedKeys";
import useTokens from "../../hooks/useTokens";
import useWordsPerMinute from "../../hooks/useWordsPerMinute";
import { CharProps } from "../Char/Char";
import Line from "../Line/Line";
import NextButton from "../NextButton/NextButton";
import Stats from "../Stats/Stats";
import { WordProps } from "../Word/Word";
import styles from "./Challenge.module.scss";
import { SettingsContext } from "../../hooks/useSettings";

interface Props {
  letters: CharProps[];
  mistyped: Mistyped;
  startTime: Date | undefined;
  onCompleted: () => void;
}

// Dotnet has a curly on the second line
const discernFormat = (lines: CharProps[][][]) => {
  if (lines.length > 1) {
    return lines[1][0][0].char === "{" ? "Dotnet" : "Node";
  }
  return "Node";
};

export default ({ letters, mistyped, startTime, onCompleted }: Props) => {
  const accuracy = useAccuracy(letters);

  const { darkMode } = useContext(SettingsContext);

  const { words, lines } = useTokens(letters, mistyped);

  const { wordsPerMinute, completedWordCount, seconds } = useWordsPerMinute(
    words,
    startTime
  );

  const allTyped = letters.every(letter =>
    ["Correct", "Incorrect"].includes(letter.status)
  );

  const format = discernFormat(lines);

  const structure = lines.map(
    words => words.map(word => ({ letters: word })) as WordProps[]
  );

  return (
    <div
      className={classnames(
        styles.Challenge,
        styles[format],
        darkMode && styles.DarkMode
      )}
    >
      <div className={styles.Inner}>
        <div
          className={classnames(styles.Border, allTyped && styles.Completed)}
        >
          <div className={classnames(styles.Code, styles.SolarizedLight)}>
            {structure.map((words, i) => (
              <Line words={words} key={`line${i}`} className={styles.Line} />
            ))}
          </div>
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
