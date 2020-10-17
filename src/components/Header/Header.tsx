import React from "react";
import styles from "./Header.module.scss";

interface Props {
  openMenu: () => void;
}

export default ({ openMenu }: Props) => (
  <div className={styles.Overlay}>
    <div className={styles.Header}>
      <h1>Ninja Typer</h1>
      <a className={styles.Hamburger} href="#menu" onMouseDown={openMenu}>
        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </a>
    </div>
  </div>
);
