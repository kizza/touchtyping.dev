import React from "react";
import styles from "./Stats.module.scss";

const round = (num: number) => (isNaN(num) ? 0 : Math.round(num * 10) / 10);

interface Props {
  accuracy: number;
  wordsPerMinute: number;
  completedWordCount: number;
  seconds: number;
}

export default ({
  accuracy = 0,
  wordsPerMinute = 0,
  completedWordCount = 0,
  seconds = 0,
}: Props) => (
  <div className={styles.Stats}>
    <span>
      Accuracy <strong>{round(accuracy)}</strong>%
    </span>
    <span title={`${completedWordCount} words in ${round(seconds)} seconds)`}>
      WPM <strong>{round(wordsPerMinute)}</strong>
    </span>
    <span></span>
  </div>
);
