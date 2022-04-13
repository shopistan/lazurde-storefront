import React, { useState } from "react";
import styles from "./style.module.scss";
import { Cross } from "components/icons";
import Link from "next/link";
import { ArrowRight } from "components/icons";
import MobileSubMenu from "./mobile-sub-menu";

interface menuProps {
  active?: Boolean;
  closeMenu?: Function;
  menuData?: [];
  siteLogo?: any;
}

type objectData = {
  title: string;
  url: string;
};

interface dataProps {
  title: string;
  catArr: [objectData];
}

interface linksProps {
  navTitle: string;
  navArr: [];
}

const MobileMenu = ({
  active = false,
  closeMenu,
  siteLogo,
  menuData,
}: menuProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<Boolean>(false);
  const [subMenuData, setSubMenuData] = useState<dataProps[]>([]);

  return (
    <>
      <div
        className={`${styles[`mobile-header__menu-wrapper`]} ${
          active ? `${styles[`mobile-header__menu-active`]}` : ``
        }`}
      >
        <div className={styles["mobile-header__menu-close-icon"]}>
          <button onClick={() => closeMenu()}>
            <Cross width={"20px"} height={"20px"} />
          </button>
        </div>
        <div>{siteLogo()}</div>
        <div className={styles["mobile-header__menu-list-wrapper"]}>
          <ul className={styles["mobile-header__menu-list"]}>
            {menuData &&
              menuData.length > 0 &&
              menuData?.map((links: linksProps, index) => {
                const { navTitle, navArr } = links;
                return (
                  <>
                    <li
                      key={index}
                      className={styles["mobile-header__menu-list-item"]}
                      onClick={() => {
                        setIsSubMenuOpen(!isSubMenuOpen);
                        navArr && setSubMenuData(navArr);
                      }}
                    >
                      <span>{navTitle}</span>
                      <ArrowRight fill="#000000" width="6" height="8px" />
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
      <MobileSubMenu
        active={isSubMenuOpen}
        closeMenu={closeMenu}
        closeSubMenu={setIsSubMenuOpen}
        subMenuData={subMenuData && subMenuData}
      />
    </>
  );
};

export default MobileMenu;
