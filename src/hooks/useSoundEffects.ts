import { useState } from "react";
import keypress from "../assets/typewriter.mp3";

export const playKeypress = () => new Audio(keypress).play();

export default (typedLength: number) => {
  const [cachedTypedLength, setCachedTypedLength] = useState(0);

  if (typedLength !== cachedTypedLength) {
    playKeypress();
    setCachedTypedLength(typedLength);
  }
};
