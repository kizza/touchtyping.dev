import { useState, useContext } from "react";
import keypress from "../assets/typewriter.mp3";
import { SettingsContext } from "./useSettings";

export const playTheKeypress = () => new Audio(keypress).play();

export default (typedLength: number) => {
  const [cachedTypedLength, setCachedTypedLength] = useState(0);

  const { playKeypress } = useContext(SettingsContext);

  if (playKeypress && typedLength !== cachedTypedLength) {
    playTheKeypress();
    setCachedTypedLength(typedLength);
  }
};
