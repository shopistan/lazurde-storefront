import React, { useContext } from "react";
import styles from "./sidebar.module.scss";
import { BackArrow, Cross, CrossSmall } from "components/icons";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";

const SideBar = ({
  isopend,
  onClose = () => {},
  closeMobileNavBar = () => {},
  children,
  sidebarHeight = "876px",
}: any): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);

  return (
    <>
      <div
        data-opened={isopend}
        className={styles.wrapper}
        onClick={(event) => event.stopPropagation()}
        style={{
          height: width > desktopScreenSize ? sidebarHeight : "100%",
        }}
      >
        {width < desktopScreenSize ? (
          <div className={styles["close-menu-wrapper"]}>
            <div className={styles.closebtn}>
              <button>
                <CrossSmall
                  onClick={() => {
                    onClose && onClose();
                    closeMobileNavBar && closeMobileNavBar();
                  }}
                ></CrossSmall>
              </button>
            </div>
            <div
              onClick={() => {
                onClose && onClose();
              }}
              className={styles["back-btn"]}
            >
              <BackArrow fill="#000000" opacity="0.6" />
              <span data-testid="back" className="opacity-60">
                {appState?.lang === "en" ? "back" : "الى الخلف"}
              </span>
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </>
  );
};

export default SideBar;
