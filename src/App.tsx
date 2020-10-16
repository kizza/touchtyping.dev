import React, { useState } from "react";
import "./App.css";
import Challenge from "./components/Challenge/Challenge";
import { buildRandomFunction } from "./generators";
import useKeyboard from "./hooks/useKeyboard";
import useMistypedKeys from "./hooks/useMistypedKeys";
import useResult from "./hooks/useResult";
import useTimer from "./hooks/useTimer";

function App() {
  const [text, setText] = useState<string>(buildRandomFunction());
  const [typed, clearTyped] = useKeyboard(text.length);
  const { startTime, clearStartTime } = useTimer(typed);
  const { letters } = useResult(text, typed);
  const { mistyped, clearMistyped } = useMistypedKeys(letters);

  const onCompleted = () => {
    clearTyped();
    clearMistyped();
    clearStartTime();
    setText(buildRandomFunction());
  };

  return (
    <div className="App">
      <Challenge
        letters={letters}
        mistyped={mistyped}
        startTime={startTime}
        onCompleted={onCompleted}
      />
    </div>
  );
}

export default App;
