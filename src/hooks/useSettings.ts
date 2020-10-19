import { createContext, useState } from "react";
import { getValue } from "../components/Toggle/Toggle";

export interface Settings {
  playKeypress: boolean;
  darkMode: boolean;
  setChecked: (id: keyof Settings, value: boolean) => void;
}

export const SettingsContext = createContext<Settings>({
  playKeypress: true,
  darkMode: false,
  setChecked: () => {},
});

export const useInitialSettings = (): Settings => {
  const [playKeypress, setPlayKeypress] = useState<boolean>(
    getValue("playKeypress", true)
  );

  const [darkMode, setDarkMode] = useState<boolean>(
    getValue("darkMode", false)
  );

  return {
    playKeypress,
    darkMode,
    setChecked: (id: string, value: boolean) => {
      switch (id) {
        case "playKeypress":
          return setPlayKeypress(value);
        case "darkMode":
          return setDarkMode(value);
        default:
          console.error("No setting", id);
      }
    },
  };
};
