import React, { useState, useEffect } from "react";
import CrossSmall from "components/icons/CrossSmall";
import styles from "./modal.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

interface ModalProps {
  className?: string;
  modalBodyClassName?: string;
  isOpened?: Boolean;
  children?: JSX.Element | string;
  onClose?: Function;
  bgBluryModal?: boolean;
  modalWidth?: string;
  modalHeight?: string;
  divModalBody?: string;
  divTopBar?: string;
  divModalRight?: string;
}

const Modal = ({
  className = "",
  modalBodyClassName = "",
  divModalBody = "",
  isOpened = false,
  children,
  onClose = () => {},
  bgBluryModal = false,
  modalWidth = "562px",
  modalHeight = "381px",
  divTopBar = "",
  divModalRight = "",
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
          <div className={`${styles["modal-body"]} ${modalBodyClassName}`}>
            <div className={`${styles["div-top-bar"]} ${divTopBar}`}>
              <div className={styles["div-left"]}></div>
              <div className={`${styles["div-right"]} ${divModalRight}`}>
                <CrossSmall
                  width={"12px"}
                  height={"12px"}
                  onClick={() => {
                    setOpenState(false);
                    onClose && onClose();
                  }}
                />
              </div>
            </div>
            <div className={`${styles["div-modal-body"]} ${divModalBody}`}>
              {children}
            </div>
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
            className={`${styles["bg-blury-modal_body"]} ${modalBodyClassName}`}
            style={{
              width: size > desktopScreenSize ? modalWidth : "100%",
              height: size > desktopScreenSize ? modalHeight : "fit-content",
            }}
          >
            <div className={styles["bg-blury-modal_cross-btn"]}>
              <CrossSmall
                width={"12px"}
                height={"12px"}
                onClick={() => {
                  setOpenState(false);
                  onClose && onClose();
                }}
              />
            </div>
            <div className={styles["bg-blury-modal_content"]}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
