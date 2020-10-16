export default (letters: JSX.Element[]) => {
  const details = letters.reduce(
    (acc, letter) => {
      const correct = letter.props.status === "Correct" ? 1 : 0;
      const incorrect = letter.props.status === "Incorrect" ? 1 : 0;
      return {
        correct: acc.correct + correct,
        incorrect: acc.incorrect + incorrect,
      };
    },
    { correct: 0, incorrect: 0 }
  );
  const ratio = details.correct / (details.correct + details.incorrect);
  return ratio * 100;
};
