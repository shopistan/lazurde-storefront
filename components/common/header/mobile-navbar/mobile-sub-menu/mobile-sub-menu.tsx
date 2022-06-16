import React, { useContext } from "react";
import styles from "../style.module.scss";
import { Cross, BackArrow, CrossSmall } from "components/icons";
import Link from "next/link";
import Label from "components/common/ui/label";
import { AppContext } from "lib/context";
import { MobileSubMenuProps } from "lib/types/mobile-header";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";

type ArabicCategoryType = {
  linkHeading?: string;
  linkTitle?: [{ title?: string }];
};

const MobileSubMenu = ({
  active = false,
  closeMenu,
  closeSubMenu,
  subMenuData,
  menuTitle = "",
}: MobileSubMenuProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();

  return (
    <div
      className={`${styles[`mobile-header__sub-menu-wrapper`]} ${
        active ? `${styles[`mobile-header__sub-menu-active`]}` : ``
      }`}
      data-testid="submenu"
    >
      <div className={styles["mobile-header__sub-menu-close-icon"]}>
        <div
          data-testid="close-sub-menu"
          onClick={() => {
            closeSubMenu();
          }}
          className={styles["mobile-header__sub-menu-back-btn"]}
        >
          <BackArrow fill="#000000" opacity="0.6" />
          <span data-testid="back" className="opacity-60">
            back
          </span>
        </div>
        <button
          data-testid="cross-btn"
        >
          {width >= desktopScreenSize ? (
            <Cross
              width="20px"
              height="20px"
              onClick={() => {
                closeMenu();
                closeSubMenu();
              }}
            />
          ) : (
            <CrossSmall
              onClick={() => {
                closeMenu();
                closeSubMenu();
              }}
            ></CrossSmall>
          )}
        </button>
      </div>
      {menuTitle ? (
        <div className={styles["mobile-header__menu-title"]}>{menuTitle}</div>
      ) : null}
      <div
        data-testid="sub-links"
        className={styles["mobile-header__sub-menu-list-wrapper"]}
      >
        <ul className={styles["mobile-header__sub-menu-list"]}>
          {subMenuData?.dropdownData &&
            subMenuData?.dropdownData.length > 0 &&
            subMenuData?.dropdownData?.map((data, index) => {
              const { title, catArr } = data;
              const currentCategoryArabic: ArabicCategoryType =
                subMenuData?.categoryLinks?.[index];
              return (
                <li
                  key={index}
                  className={styles["mobile-header__sub-menu-list-items"]}
                >
                  <Label className={styles["mobile-header__sub-menu-heading"]}>
                    {appState?.lang === "en"
                      ? title
                      : currentCategoryArabic?.linkHeading}
                  </Label>
                  <ul>
                    {catArr &&
                      catArr.length > 0 &&
                      catArr?.map((data, index) => {
                        const categoryLinkArabic =
                          currentCategoryArabic?.linkTitle[index];

                        return (
                          <li
                            key={index}
                            className={`${styles["mobile-header__sub-menu-list-item"]}`}
                            onClick={() => {
                              closeMenu();
                              closeSubMenu();
                            }}
                          >
                            <Link href={data?.url || "/"}>
                              <a data-is-bold={data?.isBold}>
                                {appState?.lang === "en"
                                  ? data?.title
                                  : categoryLinkArabic?.title}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MobileSubMenu;
