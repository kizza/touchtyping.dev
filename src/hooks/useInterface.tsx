import classnames from "classnames";
import React from "react";
import Mask from "../components/Mask/Mask";
import { useToggleState } from "./useToggleState";

export const useInterface = (styles: Record<string, any>) => {
  const [menuState, setMenuState] = useToggleState();

  const menuOpen = menuState === "open";
  const menuClosing = menuState === "closing";
  const showMask = menuOpen;

  const openMenu = () => setMenuState("open");
  const closeMenu = () => menuState === "open" && setMenuState("closing");
  const closeMask = () => {
    closeMenu();
  };

  const pageClassNames = classnames(styles.Page, {
    [styles.Blurred]: showMask,
    [styles.Offset]: menuState === "open",
    [styles.Closing]: menuState === "closing",
  });

  const contentClassNames = classnames(
    styles.Content,
    showMask && styles.Blurred
  );

  const MaskComponent = () => (
    <Mask showing={showMask} closing={menuClosing} onClose={closeMask} />
  );

  return {
    pageClassNames,
    contentClassNames,
    Mask: MaskComponent,
    openMenu,
    closeMenu,
    menuOpen,
    menuClosing,
  };
};
