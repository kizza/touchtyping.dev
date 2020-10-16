import React, { useRef, useEffect } from "react";
import classnames from "classnames";
import styles from "./NextButton.module.scss";

interface Props {
  allTyped: boolean;
  onCompleted: () => void;
}

export default ({ allTyped, onCompleted }: Props) => {
  const nextButton = useRef<HTMLButtonElement>(null);

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
      className={classnames(styles.NextButton, allTyped && styles.Enabled)}
      onClick={nextButtonClick}
      ref={nextButton}
    >
      Next
    </button>
  );
};
