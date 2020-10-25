import classnames from "classnames";
import React from "react";
import styles from "./Banner.module.scss";

interface Props {
  message: string;
  mobileOnly: boolean;
}

export default ({ message, mobileOnly }: Props) => (
  <div className={classnames(styles.Banner, mobileOnly && styles.MobileOnly)}>
    <p>{message}</p>
  </div>
);
