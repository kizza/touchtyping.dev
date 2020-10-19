import { useState, useEffect } from "react";
import { CharProps } from "../components/Char/Char";
import { wordAsString } from "../components/Word/Word";

const isValidWord = (word: CharProps[]) =>
  word.length > 0 && !["\n"].includes(wordAsString(word));

const isCompletedWord = (word: CharProps[]) =>
  word.every(char => ["Correct", "Incorrect"].includes(char.status));

const getCompletedWordCount = (words: CharProps[][]) =>
  words.filter(word => isValidWord(word)).filter(word => isCompletedWord(word))
    .length;

export default (words: CharProps[][], startTime: Date | undefined) => {
  const completedWordCount = getCompletedWordCount(words);
  const [statsForWordCount, setStatsForWordCount] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const getStats = () => {
      if (startTime === undefined) {
        return;
      }

      const now = new Date();
      const seconds = (now.getTime() - startTime.getTime()) / 1000;
      const wordsPerSecond = completedWordCount / seconds;
      const wordsPerMinute = wordsPerSecond * 60;

      // We'll update the state whever a new word is completed
      if (statsForWordCount !== completedWordCount) {
        setSeconds(seconds);
        setWordsPerMinute(wordsPerMinute);
        setStatsForWordCount(completedWordCount);
      }
    };

    const interval = setInterval(() => {
      getStats();
    }, 1000);
    getStats();

    return () => clearInterval(interval);
  }, [startTime, statsForWordCount, completedWordCount]);

  return { seconds, wordsPerMinute, completedWordCount };
};
