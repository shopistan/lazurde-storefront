import React, { useState, useEffect } from "react";
import CrossSmall from "components/icons/CrossSmall";
import styles from "./modal.module.scss";

const Modal = ({
  className = '',
  isOpened = false,
  children,
  onClose = () => { },
}: {
  className: string;
  isOpened: Boolean;
  children: JSX.Element | string;
  onClose: Function;
}): JSX.Element => {
  const [openState, setOpenState] = useState(isOpened);

  useEffect(() => {
    setOpenState(isOpened);
  }, [isOpened]);

  return (
    <div className={`${styles["div-modal-main"]} ${styles[className]}`} data-open={openState} onClick={(event) => { event.stopPropagation() }}>
      <div className={styles["div-top-bar"]}>
        <div className={styles["div-left"]}></div>
        <div
          className={styles["div-right"]}
          onClick={() => {
            setOpenState(false);
            onClose && onClose();
          }}
        >
          <CrossSmall />
        </div>
      </div>
      <div className={styles["div-modal-body"]}>{children}</div>
    </div>
  );
};

export default Modal;
