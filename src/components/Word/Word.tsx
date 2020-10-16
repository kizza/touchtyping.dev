import classnames from "classnames";
import React from "react";
import styles from "./Word.module.scss";

interface Props {
  children: JSX.Element[];
}

const specialCaseClass = (children: JSX.Element[]) => {
  if (children && children.length === 1) {
    switch (children[0].props.char) {
      case "\n":
        return styles.EnterToken;
      default:
        return undefined;
    }
  }
};

export default ({ children }: Props) => {
  return (
    <div className={classnames(styles.Word, specialCaseClass(children))}>
      {children}
    </div>
  );
};
