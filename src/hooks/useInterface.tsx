import classnames from "classnames";
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

  const maskProps = {
    showing: showMask,
    closing: menuClosing,
    onClose: closeMask,
  };

  return {
    pageClassNames,
    contentClassNames,
    maskProps,
    openMenu,
    closeMenu,
    menuOpen,
    menuClosing,
  };
};
