import React, { useState } from "react";
import Challenge from "../components/Challenge/Challenge";
import { buildRandomFunction } from "../generators";
import useKeyboard from "../hooks/useKeyboard";
import useMistypedKeys from "../hooks/useMistypedKeys";
import useResult from "../hooks/useResult";
import useSoundEffects from "../hooks/useSoundEffects";
import useTimer from "../hooks/useTimer";

export default () => {
  const [text, setText] = useState<string>(buildRandomFunction());
  const [typed, clearTyped] = useKeyboard(text.length);
  const { startTime, clearStartTime } = useTimer(typed);
  const { letters } = useResult(text, typed);
  const { mistyped, clearMistyped } = useMistypedKeys(letters);

  useSoundEffects(typed.length);

  const onCompleted = () => {
    clearTyped();
    clearMistyped();
    clearStartTime();
    setText(buildRandomFunction());
  };
  return (
    <Challenge
      letters={letters}
      mistyped={mistyped}
      startTime={startTime}
      onCompleted={onCompleted}
    />
  );
};
