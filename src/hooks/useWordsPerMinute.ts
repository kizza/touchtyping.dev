import { useState, useEffect } from "react";

const wordAsString = (word: JSX.Element[]) =>
  word.map(char => char.props.char).join("");

const isValidWord = (word: JSX.Element[]) =>
  word.length > 0 && !["\n"].includes(wordAsString(word));

const isCompletedWord = (word: JSX.Element[]) =>
  word.every(char => ["Correct", "Incorrect"].includes(char.props.status));

const getCompletedWordCount = (words: JSX.Element[][]) =>
  words.filter(word => isValidWord(word)).filter(word => isCompletedWord(word))
    .length;

export default (words: JSX.Element[][], startTime: Date | undefined) => {
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
