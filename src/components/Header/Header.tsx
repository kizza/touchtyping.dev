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
        {/* <FontAwesomeIcon icon={faCog} size="2x" /> */}

        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="7"></rect>
          <rect y="29" width="100" height="7"></rect>
          <rect y="59" width="100" height="7"></rect>
        </svg>
      </button>
    </div>
  </div>
);
