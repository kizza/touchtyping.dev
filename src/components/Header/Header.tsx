import React from "react";
import styles from "./Header.module.scss";

interface Props {
  openMenu: () => void;
}

export default ({ openMenu }: Props) => (
  <div className={styles.Overlay}>
<<<<<<< HEAD
    <div className={styles.Header}>
      <h1>Ninja Typer</h1>
      <a className={styles.Hamburger} href="#menu" onMouseDown={openMenu}>
=======
    <div className={classnames(styles.Header, darkMode && styles.DarkMode)}>
      <h1>touchtyping.dev</h1>
      <button className={styles.Hamburger} onMouseDown={openMenu}>
>>>>>>> 74e046b... Use button for hamburger
        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </button>
    </div>
  </div>
);
