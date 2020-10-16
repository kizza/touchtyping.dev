import { useState, useEffect } from "react";

type Hook = [string, () => void];

export default (maxLength: number): Hook => {
  const [input, _setInput] = useState<string>("");

  useEffect(() => {
    const setInput = (chars: string) => {
      _setInput(chars.substr(0, maxLength));
    };

    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Shift":
        case "Escape":
        case "Control":
          break;
        case "Backspace":
          setInput(input.substr(0, input.length - 1));
          break;
        case "Enter":
          setInput(`${input}\n`);
          break;
        default:
          setInput(`${input}${event.key}`);
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, [input, maxLength]);

  const clearInput = () => _setInput("");

  return [input, clearInput];
};
