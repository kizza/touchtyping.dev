import classnames from "classnames";
import React from "react";
import styles from "./Mask.module.scss";

interface Props {
  showing: boolean;
  closing: boolean | undefined;
  onClose: () => void;
}

export default ({ showing, onClose, closing }: Props) => (
  <div
    onMouseDown={onClose}
    className={classnames({
      [styles.Modal]: true,
      [styles.Showing]: showing,
      [styles.Closing]: closing,
    })}
  >
    <div></div>
  </div>
);
