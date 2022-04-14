import React, { useState } from "react";
import styles from "./style.module.scss";
import { Bag, Heart, MenuIcon, Search, LazurdeLogo } from "components/icons";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

const MobileNavBar = ({ menuData }: any): JSX.Element => {
  const [menu, setMenu] = useState<Boolean>(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const renderSiteLogo = () => {
    return (
      <div className={styles["mobile-header__logo"]}>
        <Link href="/">
          <a>
            <LazurdeLogo width={152} height={20} />
          </a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className={styles["mobile-header__wrapper"]}>
        <div className={styles["mobile-header__left"]}>
          <button onClick={handleMenu}>
            <MenuIcon color="#000000" />
          </button>
          <button>
            <Search />
          </button>
        </div>
        {renderSiteLogo()}
        <div className={styles["mobile-header__right"]}>
          <button>
            <Heart fill="#000000" stroke="#000000" />
          </button>
          <button>
            <Bag fill="#000000" stroke="#000000" />
          </button>
        </div>
      </div>
      <MobileMenu
        active={menu}
        closeMenu={closeMenu}
        siteLogo={renderSiteLogo}
        menuData={menuData}
      />
    </>
  );
};

export default MobileNavBar;
