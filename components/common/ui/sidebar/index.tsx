import React from "react";
import styles from "./sidebar.module.scss";

const SideBar = ({ isopend, children }: any): JSX.Element => {
  return (
    <>
      <div
        data-opened={isopend}
        className={styles.wrapper}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};
export default SideBar;
