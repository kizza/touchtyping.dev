import classnames from "classnames";
import React from "react";
import styles from "./Header.module.scss";

interface Props {
  openMenu: () => void;
  darkMode: boolean;
}

export default ({ darkMode, openMenu }: Props) => (
  <div className={styles.Overlay}>
    <div className={classnames(styles.Header, darkMode && styles.DarkMode)}>
      <h1>touchtyping.dev</h1>
      <button className={styles.Hamburger} onMouseDown={openMenu}>
        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </button>
    </div>
  </div>
);
