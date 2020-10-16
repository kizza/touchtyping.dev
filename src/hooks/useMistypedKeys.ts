import { useState } from "react";
import { CharProps } from "../components/Char/Char";

export type Mistyped = Record<number, boolean>;

const getCurrentlyMistyped = (letters: CharProps[]): Mistyped =>
  letters.reduce(
    (acc, letter, i) => ({
      ...acc,
      ...(letter.status === "Incorrect" && { [i]: true }),
    }),
    {} as Mistyped
  );

export default (letters: CharProps[]) => {
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
