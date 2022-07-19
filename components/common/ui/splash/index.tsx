import { findAllByTestId } from "@testing-library/react";
import React from "react";
import Spinner from "../spinner";
import styles from "./splash.module.scss";

const Splash = ({ isLoading = false }: { isLoading: boolean }) => {
  return (
    <div className={styles["splash-container"]} data-isLoading={isLoading}>
      <div className={styles["div-spinner-text"]}>
        <div className={styles["div-spinner"]}>
          <Spinner></Spinner>
        </div>
        <div className={styles["div-loading-text"]}>Loading...</div>
      </div>
    </div>
  );
};

export default Splash;
