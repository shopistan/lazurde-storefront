import React, { useState, useEffect } from "react";
import CrossSmall from "components/icons/CrossSmall";
import styles from "./modal.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

interface ModalProps {
  className?: string;
  isOpened?: Boolean;
  children?: JSX.Element | string;
  onClose?: Function;
  bgBluryModal?: boolean;
  modalWidth?: string;
  modalHeight?: string;
}

const Modal = ({
  className = "",
  isOpened = false,
  children,
  onClose = () => {},
  bgBluryModal = false,
  modalWidth = "562px",
  modalHeight = "381px",
}: ModalProps): JSX.Element => {
  const [openState, setOpenState] = useState(isOpened);
  const [size] = useWindowSize();

  useEffect(() => {
    setOpenState(isOpened);
  }, [isOpened]);

  return (
    <>
      {!bgBluryModal ? (
        <div
          className={`${styles["div-modal-main"]} ${className}`}
          data-open={openState}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className={styles["modal-body"]}>
            <div className={styles["div-top-bar"]}>
              <div className={styles["div-left"]}></div>
              <div
                className={styles["div-right"]}
                onClick={() => {
                  setOpenState(false);
                  onClose && onClose();
                }}
              >
                <CrossSmall width={"12px"} height={"12px"} />
              </div>
            </div>
            <div className={styles["div-modal-body"]}>{children}</div>
          </div>
        </div>
      ) : (
        <div
          className={`${styles["bg-blury-modal_wrapper"]} ${className}`}
          data-open={openState}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={styles["bg-blury-modal_body"]}
            style={{
              width: size > desktopScreenSize ? modalWidth : "100%",
              height: size > desktopScreenSize ? modalHeight : "fit-content",
            }}
          >
            <div
              className={styles["bg-blury-modal_cross-btn"]}
              onClick={() => {
                setOpenState(false);
                onClose && onClose();
              }}
            >
              <CrossSmall width={"12px"} height={"12px"} />
            </div>
            <div className={styles["bg-blury-modal_content"]}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
