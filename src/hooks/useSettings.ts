import { createContext, useState } from "react";
import { getBoolean } from "../components/Toggle/Toggle";

export const ALL_LANGUAGES = {
  Typescript: "ts",
  Javascript: "js",
  CSharp: "cs",
  Ruby: "rb",
} as const;

export type Language = keyof typeof ALL_LANGUAGES;

export type Settings = {
  playKeypress: boolean;
  keypressConfetti: boolean;
  darkMode: boolean;
  setChecked: (id: keyof Settings, value: boolean) => void;
} & Record<Language, boolean>;

const defaults = {
  playKeypress: true,
  keypressConfetti: true,
  darkMode: false,
  CSharp: true,
  Typescript: true,
  Javascript: false,
  Ruby: false,
  setChecked: () => {},
};

export const SettingsContext = createContext<Settings>(defaults);

interface LanguageSettings {
  values: Record<Language, boolean>;
  setters: Record<Language, (value: string) => void>;
}

const getLanguageSettings = () => {
  const languages = Object.keys(ALL_LANGUAGES) as Language[];
  return languages.reduce((acc, language) => {
    const [value, setValue] = useState<boolean>(
      getBoolean(language, defaults[language])
    );
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
};

const setLanguageSetting = (
  languageSettings: LanguageSettings,
  id: Language,
  value: string
) => {
  const setter = languageSettings.setters[id];
  if (setter) {
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
