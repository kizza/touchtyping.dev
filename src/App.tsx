import classnames from "classnames";
import "animate.css/animate.min.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Mask from "./components/Mask/Mask";
import Nav from "./components/Nav/Nav";
import { useToggleState } from "./hooks/useToggleState";
import routes from "./routes";

function App() {
  const [menuState, setMenuState] = useToggleState();

  const menuClosing = menuState === "closing";
  const showMask = menuState === "open";

  const openMenu = () => setMenuState("open");
  const closeMenu = () => menuState === "open" && setMenuState("closing");
  const closeMask = () => {
    closeMenu();
  };

  const bodyClasses = classnames(styles.Page, {
    [styles.Blurred]: showMask,
    [styles.Offset]: menuState === "open",
    [styles.Closing]: menuState === "closing",
  });

  return (
    <div className={styles.App}>
      <Router>
        <div className={bodyClasses}>
          <Header openMenu={openMenu} />
          <div
            className={classnames(styles.Content, showMask && styles.Blurred)}
          >
            <div className={styles.Inner}>{routes}</div>
          </div>
          {/* <Footer /> */}
        </div>

        <Nav
          open={menuState === "open"}
          closing={menuClosing}
          closeMenu={closeMenu}
        />
      </Router>

      <Mask showing={showMask} closing={menuClosing} onClose={closeMask} />
    </div>
  );
}

export default App;
