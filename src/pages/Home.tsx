import React, { useContext, useState } from "react";
import Challenge from "../components/Challenge/Challenge";
import { buildRandomFunction } from "../generators";
import useKeyboard from "../hooks/useKeyboard";
import useMistypedKeys from "../hooks/useMistypedKeys";
import useResult from "../hooks/useResult";
import { SettingsContext } from "../hooks/useSettings";
import useSoundEffects from "../hooks/useSoundEffects";
import useTimer from "../hooks/useTimer";
import Banner from "../components/Banner/Banner";

export default () => {
  const settings = useContext(SettingsContext);
  const [text, setText] = useState<string>(buildRandomFunction(settings));
  const [typed, clearTyped] = useKeyboard(text.length);
  const { startTime, clearStartTime } = useTimer(typed);
  const { letters } = useResult(text, typed);
  const { mistyped, clearMistyped } = useMistypedKeys(letters);

  useSoundEffects(typed.length);

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
    <>
      <Challenge
        letters={letters}
        mistyped={mistyped}
        startTime={startTime}
        onCompleted={onCompleted}
      />
      <Banner
        message={`A "real" keyboard will give you the full experience`}
        mobileOnly
      />
    </>
  );
};
