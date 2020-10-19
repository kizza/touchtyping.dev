import classnames from "classnames";
import React, { useContext } from "react";
import { SettingsContext } from "../../hooks/useSettings";
import styles from "./Toggle.module.scss";

export type EmojiType = "EmojiHappy" | "EmojiSound" | "EmojiTheme";

interface Props {
  setting: "playKeypress" | "darkMode";
  emoji: EmojiType;
}

export const getValue = (id: string, fallback: boolean) => {
  const stored = localStorage.getItem(id);
  if (stored) {
    return stored === "yes";
  } else {
    return fallback;
  }
};

const setValue = (id: string, value: string) => localStorage.setItem(id, value);

export const buildId = (emoji: EmojiType) => {
  return `toggle${emoji}`;
};

export default ({ setting, emoji }: Props) => {
  const id = buildId(emoji);
  const settings = useContext(SettingsContext);
  const checked = settings[setting];
  const { setChecked } = settings;

  const onChange = () => {
    const value = !checked;
    setChecked(setting, value);
    setValue(setting, value ? "yes" : "no");
  };

  return (
    <div className={classnames(styles.EmojiToggle, styles[emoji])}>
      <input
        type="checkbox"
        onChange={onChange}
        id={id}
        checked={checked}
        className={styles.Toggle}
      />
      <div className={styles.Emoji}></div>
      <label htmlFor={id} className={styles.Well}></label>
    </div>
  );
};
