import { createContext, useState } from "react";
import { getBoolean } from "../components/Toggle/Toggle";

export const ALL_LANGUAGES = [
  "Typescript",
  "Javascript",
  "Ruby",
  "CSharp",
] as const;

export type Language = typeof ALL_LANGUAGES[number];

export type Settings = {
  playKeypress: boolean;
  keypressConfetti: boolean;
  darkMode: boolean;
  setChecked: (id: keyof Settings, value: boolean) => void;
} & Record<Language, boolean>;

export const SettingsContext = createContext<Settings>({
  playKeypress: true,
  keypressConfetti: true,
  darkMode: false,
  Javascript: true,
  Typescript: true,
  Ruby: true,
  CSharp: true,
  setChecked: () => {},
});

interface LanguageSettings {
  values: Record<Language, boolean>;
  setters: Record<Language, (value: string) => void>;
}

const getLanguageSettings = () =>
  ALL_LANGUAGES.reduce((acc, language) => {
    const [value, setValue] = useState<boolean>(getBoolean(language, true));
    return {
      values: {
        ...acc.values,
        [language]: value,
      },
      setters: {
        ...acc.setters,
        [language]: setValue,
      },
    };
  }, {} as LanguageSettings);

const setLanguageSetting = (
  languageSettings: LanguageSettings,
  id: Language,
  value: string
) => {
  const setter = languageSettings.setters[id];
  if (setter) {
    console.log("Setting language", id, value);
    setter(value);
    return true;
  }
  return false;
};

export const useInitialSettings = (): Settings => {
  const [playKeypress, setPlayKeypress] = useState<boolean>(
    getBoolean("playKeypress", true)
  );

  const [keypressConfetti, setKeypressConfetti] = useState<boolean>(
    getBoolean("keypressConfetti", true)
  );

  const languageSettings = getLanguageSettings();

  const [darkMode, setDarkMode] = useState<boolean>(
    getBoolean("darkMode", false)
  );

  return {
    playKeypress,
    keypressConfetti,
    ...languageSettings.values,
    darkMode,
    setChecked: (id: string, value: any) => {
      switch (id) {
        case "playKeypress":
          return setPlayKeypress(value);
        case "keypressConfetti":
          return setKeypressConfetti(value);
        case "darkMode":
          return setDarkMode(value);
        default:
          if (setLanguageSetting(languageSettings, id as Language, value)) {
            // console.log("Setting language", id, value);
            // setter(value);
            return;
          }
          console.error("No setting", id);
      }
    },
  };
};
