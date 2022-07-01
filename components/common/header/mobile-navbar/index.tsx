import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Bag, Heart, MenuIcon, Search, LazurdeLogo } from "components/icons";
import Link from "next/link";
import MobileMenu from "./mobile-menu/mobile-menu";
import Image from "next/image";
import { MobileHeaderProps } from "lib/types/mobile-header";
import SideBar from "components/common/ui/sidebar";
import WhishListSidebar from "components/common/minicart-wishlist-sidebars/wish-list";
import MiniCart from "components/common/minicart-wishlist-sidebars/mini-cart";

const MobileNavBar = ({
  menuData,
  headerId,
  brandSideBar,
  siteLogo,
  siteLogoUrl,
  setOpenSearchDialog,
}: MobileHeaderProps): JSX.Element => {
  const [menu, setMenu] = useState<Boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [sidebarchild, setSidebarChild] = useState({
    account: false,
    whishlist: false,
    miniCart: false,
    language: false,
  });

  useEffect(() => {
    if (sidebarOpened) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 280);
    }
  }, [sidebarOpened]);

  const handleMiniCart = () => {
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      miniCart: true,
      whishlist: false,
      account: false,
      language: false,
    });
  };

  const handleWishListCart = () => {
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      miniCart: false,
      whishlist: true,
      account: false,
      language: false,
    });
  };

  const onSideBarClose = () => {
    setSidebarOpened(false);
    setSidebarChild({
      miniCart: false,
      whishlist: false,
      account: false,
      language: false,
    });
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const renderSiteLogo = () => {
    return (
      <div className={styles["mobile-header__logo"]}>
        <Link href={siteLogoUrl || "/"}>
          <a>
            <Image
              src={siteLogo?.url || "/placeholder.jpg"}
              width={152}
              height={20}
              layout="fixed"
              alt={siteLogo?.altText}
            />
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
          <button onClick={() => setOpenSearchDialog(true)}>
            <Search />
          </button>
        </div>
        {renderSiteLogo()}
        <div className={styles["mobile-header__right"]}>
          <button onClick={() => handleWishListCart()}>
            <Heart fill="#000000" stroke="#000000" />
          </button>
          <button onClick={() => handleMiniCart()}>
            <Bag fill="#000000" stroke="#000000" />
          </button>
        </div>
      </div>
      <MobileMenu
        active={menu}
        closeMenu={closeMenu}
        siteLogo={renderSiteLogo}
        menuData={menuData}
        headerId={headerId}
        brandSideBar={brandSideBar}
      />

      <div className={styles["rightside-drawer"]} data-opened={sidebarOpened}>
        <SideBar
          isopend={sidebarOpened}
          setIsOpened={setSidebarOpened}
          onClose={onSideBarClose}
        >
          {sidebarchild.whishlist ? (
            <WhishListSidebar />
          ) : sidebarchild.miniCart ? (
            <MiniCart />
          ) : null}
        </SideBar>
      </div>
    </>
  );
};

export default MobileNavBar;
