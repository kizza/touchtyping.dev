import "animate.css/animate.min.css";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import { useInterface } from "./hooks/useInterface";
import {
  SettingsContext,
  useInitialSettings,
  Settings,
} from "./hooks/useSettings";
import routes from "./routes";
import Footer from "./components/Footer/Footer";
import Mask from "./components/Mask/Mask";

const useDarkMode = (darkMode: boolean) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#282828" : "white";
    document.body.style.color = darkMode ? "#eee" : "#32302F";
  }, [darkMode]);
};

const useFadeIn = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return loaded;
};

function App() {
  const {
    pageClassNames,
    contentClassNames,
    maskProps,
    openMenu,
    closeMenu,
    menuOpen,
    menuClosing,
  } = useInterface(styles);

  const settingsContextValue = useInitialSettings();
  const { darkMode } = settingsContextValue;
  useDarkMode(darkMode);

  const loaded = useFadeIn();

  return (
    <div
      className={classnames(styles.App, {
        [styles.Gruvbox]: darkMode,
        [styles.Loaded]: loaded,
        animate__fadeIn: true,
        animate__animated: loaded,
      })}
    >
      <SettingsContext.Provider value={settingsContextValue}>
        <Router>
          <div className={pageClassNames}>
            <Header openMenu={openMenu} darkMode={darkMode} />
            <div className={contentClassNames}>
              <div className={styles.Inner}>{routes}</div>
            </div>
            <Footer />
          </div>

          <Nav
            open={menuOpen}
            closing={menuClosing}
            closeMenu={closeMenu}
            darkMode={darkMode}
          />
        </Router>
      </SettingsContext.Provider>

      <Mask {...maskProps} />
    </div>
  );
}

export default App;
