import classnames from "classnames";
import React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Toggle from "../Toggle/Toggle";
import styles from "./Nav.module.scss";

interface Props extends RouteComponentProps {
  open: boolean;
  closing: boolean | undefined;
  closeMenu: () => void;
  darkMode: boolean;
}

const Nav = ({ open, closing, closeMenu, darkMode }: Props) => {
  return (
    <div
      className={classnames(styles.Nav, {
        [styles.DarkMode]: darkMode,
        [styles.Open]: open,
        [styles.Closing]: closing,
        animate__slideInLeft: open,
        animate__slideOutLeft: closing,
        animate__animated: open || closing,
      })}
    >
      <ul>
        <li>
          <NavLink
            to="/"
            onClick={closeMenu}
            activeClassName={styles.active}
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={closeMenu}
            activeClassName={styles.active}
          >
            About
          </NavLink>
        </li>
      </ul>
      <div>
        <Toggle setting="playKeypress" emoji="EmojiSound" />
        <Toggle setting="darkMode" emoji="EmojiTheme" />
      </div>
    </div>
  );
};

export default withRouter(Nav);
