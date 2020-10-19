import React, { useRef, useEffect, useContext } from "react";
import classnames from "classnames";
import styles from "./NextButton.module.scss";
import { SettingsContext } from "../../hooks/useSettings";

interface Props {
  allTyped: boolean;
  onCompleted: () => void;
}

export default ({ allTyped, onCompleted }: Props) => {
  const nextButton = useRef<HTMLButtonElement>(null);

  const { darkMode } = useContext(SettingsContext);

  const nextButtonClick = () => {
    nextButton.current && nextButton.current.blur();
    onCompleted();
  };

  useEffect(() => {
    if (allTyped) {
      nextButton.current && nextButton.current.focus();
    }
  });

  return (
    <button
      className={classnames(styles.NextButton, {
        [styles.DarkMode]: darkMode,
        [styles.Enabled]: allTyped,
      })}
      onClick={nextButtonClick}
      ref={nextButton}
    >
      Next
    </button>
  );
};
