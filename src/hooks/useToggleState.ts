import { useState, useEffect } from "react";

export const useToggleState = () => {
  const state = useState<"open" | "closing" | "closed">("closed");
  const [toggleState, setToggleState] = state;

  useEffect(() => {
    let timer: any;
    if (toggleState === "closing") {
      timer = setTimeout(() => {
        setToggleState("closed");
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [toggleState, setToggleState]);

  return state;
};
