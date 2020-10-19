import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { SettingsContext } from "../../hooks/useSettings";
import styles from "./Toggle.module.scss";

interface Props {
  label: string;
  setting: "playKeypress" | "darkMode";
  iconOn: any;
  iconOff: any;
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

export const buildId = (setting: Props["setting"]) => {
  return `toggle-${setting}`;
};

export default ({ label, setting, iconOn, iconOff }: Props) => {
  const id = buildId(setting);
  const settings = useContext(SettingsContext);
  const checked = settings[setting];
  const { setChecked } = settings;

  const onChange = () => {
    const value = !checked;
    setChecked(setting, value);
    setValue(setting, value ? "yes" : "no");
  };

  return (
    <div className={styles.EmojiToggle}>
      <input
        type="checkbox"
        onChange={onChange}
        id={id}
        checked={checked}
        className={styles.Toggle}
      />
      <div className={styles.Handle}>
        <FontAwesomeIcon icon={checked ? iconOn : iconOff} size="sm" />
      </div>
      <label htmlFor={id} className={styles.Well}>
        <FontAwesomeIcon icon={checked ? iconOn : iconOff} size="2x" />
        <span>{label}</span>
      </label>
    </div>
  );
};
