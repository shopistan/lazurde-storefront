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
  modalWidth = "",
  modalHeight = "",
  divTopBar = "",
  divModalRight = "",
}: ModalProps): JSX.Element => {
  const [openState, setOpenState] = useState(isOpened);
  const [alertContainer, setAlertContainer] = useState<any>("");
  const [size] = useWindowSize();

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
      const html = document.querySelector("html");
      html.style.overflow = "hidden";
    }
    setOpenState(isOpened);

    return () => {
      document.body.style.overflow = "auto";
      const html = document.querySelector("html");
      html.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <>
      <div
        role={"overlay"}
        className={styles["overlay"]}
        data-open={openState}
        data-is-blurry={bgBluryModal}
      />
      <div
        className={`${styles["div-modal-main"]} ${className}`}
        data-open={openState}
        onClick={() => {
          onClose && onClose();
        }}
      >
        <div
          className={`${styles["modal-body"]} ${modalBodyClassName}`}
          onClick={(event) => {
            event.stopPropagation();
          }}
          style={{
            width: size > desktopScreenSize ? modalWidth : "100%",
            height: size > desktopScreenSize ? modalHeight : "100%",
          }}
        >
          <div className={`${styles["div-top-bar"]} ${divTopBar}`}>
            <div className={styles["div-left"]}></div>
            <div className={`${styles["div-right"]} ${divModalRight}`}>
              <CrossSmall
                width={"12px"}
                height={"12px"}
                onClick={() => {
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
    </>
  );
};

export default Modal;
