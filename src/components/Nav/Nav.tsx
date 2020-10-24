import classnames from "classnames";
import React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Toggle, { booleanOnSave } from "../Toggle/Toggle";
import styles from "./Nav.module.scss";
import {
  faFileCode as faCode,
  /* faCode, */
  faSmile,
  faMoon,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { ALL_LANGUAGES, Language } from "../../hooks/useSettings";

interface Props extends RouteComponentProps {
  open: boolean;
  closing: boolean | undefined;
  closeMenu: () => void;
  darkMode: boolean;
}

const languageSettings = () => {
  const languages = Object.keys(ALL_LANGUAGES) as Language[];
  return languages.map(language => (
    <Toggle
      key={`toggle${language}`}
      label={language}
      setting={language}
      textIcon={ALL_LANGUAGES[language]}
      formatOnSave={booleanOnSave}
    />
  ));
};

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
      <div className={styles.Toggles}>
        <h2>Keypress</h2>
        <Toggle
          label="Play keypress"
          setting="playKeypress"
          iconOn={faVolumeUp}
          iconOff={faVolumeUp}
          formatOnSave={booleanOnSave}
        />
        <Toggle
          label="Confetti"
          setting="keypressConfetti"
          iconOn={faSmile}
          iconOff={faSmile}
          formatOnSave={booleanOnSave}
        />
        <h2>Languages</h2>
        {languageSettings()}
        <h2>Theme</h2>
        <Toggle
          label="Dark mode"
          setting="darkMode"
          iconOn={faMoon}
          iconOff={faMoon}
          formatOnSave={booleanOnSave}
        />
      </div>
    </div>
  );
};

export default withRouter(Nav);
