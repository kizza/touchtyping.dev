import styles from "./Footer.module.scss";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default () => (
  <div className={styles.Footer}>
    <p>
      <a
        href="https://github.com/kizza/touchtyping.dev"
        className={styles.GithubLink}
        title="View on github"
      >
        <FontAwesomeIcon icon={faGithub} size="lg" fixedWidth={true} />
        <span>View on github </span>
      </a>
    </p>
  </div>
);
