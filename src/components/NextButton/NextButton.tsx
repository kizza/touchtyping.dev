import classnames from "classnames";
import React, { useEffect, useRef } from "react";
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
      className={classnames(styles.NextButton, {
        [styles.Enabled]: allTyped,
      })}
      onClick={nextButtonClick}
      ref={nextButton}
    >
      Next
    </button>
  );
};
