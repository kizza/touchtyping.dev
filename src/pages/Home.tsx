import React, { useState, useEffect, useContext } from "react";
import Challenge from "../components/Challenge/Challenge";
import { buildRandomFunction } from "../generators";
import useKeyboard from "../hooks/useKeyboard";
import useMistypedKeys from "../hooks/useMistypedKeys";
import useResult from "../hooks/useResult";
import useSoundEffects from "../hooks/useSoundEffects";
import useTimer from "../hooks/useTimer";
import { SettingsContext } from "../hooks/useSettings";

export default () => {
  const settings = useContext(SettingsContext);
  const [text, setText] = useState<string>(buildRandomFunction(settings));
  const [typed, clearTyped] = useKeyboard(text.length);
  const { startTime, clearStartTime } = useTimer(typed);
  const { letters } = useResult(text, typed);
  const { mistyped, clearMistyped } = useMistypedKeys(letters);

  useSoundEffects(typed.length);

  useEffect(() => {
    if (letters.length === 1) {
      console.log(letters);
    }
  }, [letters]);

  const onCompleted = () => {
    clearTyped();
    clearMistyped();
    clearStartTime();
    setText(buildRandomFunction(settings));
  };

  const firstKeyPressIsEnter = typed === "\n" && startTime === undefined;
  if (firstKeyPressIsEnter) {
    onCompleted();
  }

  return (
    <Challenge
      letters={letters}
      mistyped={mistyped}
      startTime={startTime}
      onCompleted={onCompleted}
    />
  );
};
