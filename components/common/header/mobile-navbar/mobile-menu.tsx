import React, { useState } from "react";
import styles from "./style.module.scss";
import { Cross } from "components/icons";
import Link from "next/link";
import { ArrowRight } from "components/icons";
import MobileSubMenu from "./mobile-sub-menu";
import UserLinks from "./user-links";
import BrandSideBar from "../user-navbar/brand-sidebar/index";
import { BrandSidebarProps } from "lib/types/common";

interface menuProps {
  active?: Boolean;
  closeMenu?: Function;
  menuData?: [];
  siteLogo?: any;
  headerId?: string;
  brandSideBar?: BrandSidebarProps;
}

interface dataProps {
  title?: string;
  catArr?: [objectData];
}

type objectData = {
  title?: string;
  url?: string;
};
interface linksProps {
  navTitle?: string;
  titleUrl?: string;
  navArr?: [{ title: string; catArr: [objectData] }];
}

const MobileMenu = ({
  active = false,
  closeMenu,
  menuData,
  headerId,
  brandSideBar,
}: menuProps): JSX.Element => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<Boolean>(false);
  const [subMenuData, setSubMenuData] = useState<dataProps[]>([]);
  const [isOpened, setIsOpened] = useState(false);

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
        <div className={styles["mobile-header__brand-name"]}>
          {headerId === "kenazHeader"
            ? "Kenaz"
            : headerId === "missLHeader"
            ? "Miss L’"
            : "L’azurde"}
        </div>
        <div className={styles["mobile-header__menu-list-wrapper"]}>
          <ul className={styles["mobile-header__menu-list"]}>
            {menuData &&
              menuData.length > 0 &&
              menuData?.map((links: linksProps, index) => {
                const { navTitle, titleUrl, navArr } = links;
                const categoryData = navArr[0];

                return (
                  <>
                    <li
                      key={index}
                      className={styles["mobile-header__menu-list-item"]}
                      onClick={() => {
                        if (
                          categoryData?.catArr.length > 0 &&
                          categoryData?.title
                        ) {
                          setIsSubMenuOpen(!isSubMenuOpen);
                          navArr && setSubMenuData(navArr);
                        }
                      }}
                    >
                      {titleUrl.length > 0 &&
                      categoryData?.title.length <= 0 ? (
                        <>
                          <Link href={titleUrl}>
                            <a>{navTitle}</a>
                          </Link>
                        </>
                      ) : (
                        <>
                          <span>{navTitle}</span>
                        </>
                      )}
                      {categoryData?.catArr.length > 0 &&
                        categoryData?.title && (
                          <ArrowRight fill="#000000" width="6" height="8px" />
                        )}
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
        <div
          className={styles["mobile-header__boutique-btn"]}
          onClick={() => {
            setIsOpened(true);
          }}
        >
          <span>Shop by Boutique</span>
          <ArrowRight fill="#000000" width="6" height="8px" />
        </div>
        <UserLinks />
      </div>
      <MobileSubMenu
        active={isSubMenuOpen}
        closeMenu={closeMenu}
        closeSubMenu={setIsSubMenuOpen}
        subMenuData={subMenuData && subMenuData}
      />
      <BrandSideBar
        {...brandSideBar}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        closeIcon={true}
        closeMenu={closeMenu}
      />
    </>
  );
};

export default MobileMenu;
