import React, { FC, useState, useEffect, useContext } from "react";
import styles from "./user-navbar.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {
  Bag,
  Heart,
  MapPin,
  Divider,
  MenuIcon,
  Globe,
  User,
} from "components/icons";
import BrandSidebar from "./brand-sidebar";
import { BrandSidebarProps, ErrorObject } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { desktopScreenSize } from "lib/utils/common";
import { getWishList } from "lib/utils/wishlist";
import SideBar from "components/common/ui/sidebar";
import AccountSidebar from "components/common/right-sidebars/account-sidebar";
import WhishListSidebar from "components/common/minicart-wishlist-sidebars/wish-list";
import MiniCart from "components/common/minicart-wishlist-sidebars/mini-cart";
import Language from "./language-sidebar";

const UserNavBar: FC<{ brandSideBar: BrandSidebarProps }> = ({
  brandSideBar,
}): JSX.Element => {
  const {
    appState,
    saveAppState,
    allWishListProducts,
    setAllWishListProducts,
  } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [isOpened, setIsOpened] = useState(false);
  const [width] = useWindowSize();
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [sidebarchild, setSidebarChild] = useState({
    account: false,
    whishlist: false,
    miniCart: false,
    language: false,
  });
  const GRANT_TYPE = "code";

  useEffect(() => {
    const hasWishListData = allWishListProducts;
    const initializeWislist = async () => {
      if (hasWishListData && hasWishListData.length > 1) return;
      const authToken =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";

      const wishlistArray = await getWishList(authToken);
      if (wishlistArray?.data?.items.length < 1) return;
      setAllWishListProducts &&
        setAllWishListProducts(wishlistArray?.data?.items);
      typeof window !== "undefined" &&
        window.sessionStorage.setItem(
          "wishListArray",
          JSON.stringify(wishlistArray?.data?.items)
        );
    };
    initializeWislist();
  }, []);

  useEffect(() => {
    if (isOpened || sidebarOpened) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 280);
    }
  }, [isOpened, sidebarOpened]);

  const signInUser = async () => {
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      whishlist: false,
      account: true,
      miniCart: false,
      language: false,
    });
  };

  const handlewhishlist = () => {
    setIsOpened(false);
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      whishlist: true,
      account: false,
      miniCart: false,
      language: false,
    });
  };

  const handleMiniCart = () => {
    setIsOpened(false);
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      miniCart: true,
      whishlist: false,
      account: false,
      language: false,
    });
  };

  const handlelanguage = () => {
    setIsOpened(false);
    setSidebarOpened(!sidebarOpened);
    setSidebarChild({
      language: true,
      miniCart: false,
      whishlist: false,
      account: false,
    });
  };

  return (
    <div className={styles["user-navbar"]} data-testid="product-card">
      <div className={styles["left_div"]}>
        <div>
          <button
            className={styles["sidebar_btn"]}
            type="button"
            onClick={() => {
              setIsOpened(!isOpened);
              setSidebarOpened(false);
            }}
          >
            <MenuIcon color="white" />
          </button>
        </div>
        <div className={styles["boutique_text"]}>
          <span>{t("userNavBarTitle")}</span>
        </div>
        <div className={styles["brand_ticker"]}>
          <ul>
            <li className="item-1">
              <Link href="/">
                <a
                  data-testid="item1"
                  onClick={() =>
                    saveAppState({
                      ...appState,
                      brand: `L'azurde`,
                    })
                  }
                >{`L'azurde`}</a>
              </Link>
            </li>
            <li className="item-2">
              <Link href="/missl">
                <a
                  onClick={() =>
                    saveAppState({
                      ...appState,
                      brand: `Miss L'`,
                    })
                  }
                >{`Miss L'`}</a>
              </Link>
            </li>
            <li className="item-3">
              <Link href="/kenaz">
                <a
                  onClick={() =>
                    saveAppState({
                      ...appState,
                      brand: `Kenaz`,
                    })
                  }
                >{`Kenaz`}</a>
              </Link>
            </li>
            <li className="item-4">
              <Link href="/">
                <a
                  onClick={() =>
                    saveAppState({
                      ...appState,
                      brand: `L'azurde`,
                    })
                  }
                >{`L'azurde`}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["right_div"]}>
        <Link href={"/"}>
          <a>
            <MapPin />
          </a>
        </Link>

        <div className={styles["link"]} onClick={() => handlelanguage()}>
          <Globe />
        </div>

        <div className={styles["link"]} onClick={() => signInUser()}>
          <User />
        </div>

        <div className={styles["link"]} onClick={() => handlewhishlist()}>
          <Heart />
        </div>

        <div>
          <Divider />
        </div>

        <div className={styles["link"]} onClick={() => handleMiniCart()}>
          <Bag />
        </div>
      </div>
      {width > desktopScreenSize && (
        <div
          role={"overlay"}
          className={styles["overlay"]}
          data-opened={isOpened}
          onClick={() => setIsOpened(!isOpened)}
        ></div>
      )}
      <BrandSidebar
        {...brandSideBar}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />

      <div
        className={styles["rightside-drawer"]}
        data-opened={sidebarOpened}
        onClick={() => {
          setSidebarOpened(false);
        }}
      >
        <SideBar
          isopend={sidebarOpened}
          setIsOpened={setSidebarOpened}
          onClick={(event: any) => {
            event.stopPropagation();
          }}
        >
          {sidebarchild.account ? (
            <AccountSidebar />
          ) : sidebarchild.whishlist ? (
            <WhishListSidebar />
          ) : sidebarchild.miniCart ? (
            <MiniCart />
          ) : sidebarchild.language ? (
            <Language />
          ) : null}
        </SideBar>
      </div>
    </div>
  );
};

export default UserNavBar;
