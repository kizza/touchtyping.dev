import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Settings, SettingsContext } from "../../hooks/useSettings";
import styles from "./Toggle.module.scss";

interface Props {
  label: string;
  setting: keyof Settings;
  iconOn: any;
  iconOff: any;
  formatOnSave: (value: any) => string;
}

export const getValue = (id: string, fallback: any) => {
  const stored = localStorage.getItem(id);
  return stored ? stored : fallback;
};

export const getBoolean = (id: string, fallback: boolean) => {
  const stored = localStorage.getItem(id);
  return stored ? stored === "yes" : fallback;
};

const setValue = (id: string, value: string) => localStorage.setItem(id, value);

export const booleanOnSave = (value: boolean) => (value ? "yes" : "no");

export const jsonOnSave = (value: any) => JSON.stringify(value);

export const buildId = (setting: Props["setting"]) => {
  return `toggle-${setting}`;
};

export default ({ label, setting, iconOn, iconOff, formatOnSave }: Props) => {
  const id = buildId(setting);
  const settings = useContext(SettingsContext);
  const checked = settings[setting] as boolean;
  const { setChecked } = settings;

  const onChange = () => {
    const value = !checked;
    setChecked(setting, value);
    setValue(setting, formatOnSave(value));
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
        <FontAwesomeIcon
          icon={checked ? iconOn : iconOff}
          size="2x"
          fixedWidth
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
