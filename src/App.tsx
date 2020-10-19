import "animate.css/animate.min.css";
import classnames from "classnames";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import { useInterface } from "./hooks/useInterface";
import { SettingsContext, useInitialSettings } from "./hooks/useSettings";
import routes from "./routes";
import Footer from "./components/Footer/Footer";

function App() {
  const {
    pageClassNames,
    contentClassNames,
    openMenu,
    closeMenu,
    menuOpen,
    menuClosing,
    Mask,
  } = useInterface(styles);

  const settingsContextValue = useInitialSettings();

  const { darkMode } = settingsContextValue;

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#282828" : "white";
    document.body.style.color = darkMode ? "#eee" : "#333";
  }, [darkMode]);

  return (
    <div className={classnames(styles.App, darkMode && styles.DarkMode)}>
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

      <Mask />
    </div>
  );
}

export default App;
