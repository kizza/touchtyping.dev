import { useState } from "react";

export type Mistyped = Record<number, boolean>;

const getCurrentlyMistyped = (letters: JSX.Element[]): Mistyped =>
  letters.reduce(
    (acc, letter, i) => ({
      ...acc,
      ...(letter.props.status === "Incorrect" && { [i]: true }),
    }),
    {} as Mistyped
  );

export default (letters: JSX.Element[]) => {
  const { keys } = Object;
  const [mistyped, setMistyped] = useState<Mistyped>({});

  const currentlyMistyped = getCurrentlyMistyped(letters);

  const newlyMistyped = {
    ...mistyped,
    ...currentlyMistyped,
  };

  if (keys(newlyMistyped).toString() !== keys(mistyped).toString()) {
    setMistyped({ ...mistyped, ...currentlyMistyped });
  }

  const clearMistyped = () => setMistyped({});

  return { mistyped: newlyMistyped, clearMistyped };
};
