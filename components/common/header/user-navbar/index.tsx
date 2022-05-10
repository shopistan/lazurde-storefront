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
import { BrandSidebarProps } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import {desktopScreenSize} from 'lib/utils/common'

const UserNavBar: FC<{ brandSideBar: BrandSidebarProps }> = ({
  brandSideBar,
}): JSX.Element => {
  const { appState, saveAppState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [isOpened, setIsOpened] = useState(false);
  const [width] = useWindowSize();

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 280);
    }
  }, [isOpened]);

  return (
    <div className={styles["user-navbar"]} data-testid="product-card">
      <div className={styles["left_div"]}>
        <div>
          <button
            className={styles["sidebar_btn"]}
            type="button"
            onClick={() => {
              setIsOpened(!isOpened);
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
        <Link href={"/"}>
          <a>
            <Globe />
          </a>
        </Link>
        <Link href={"/"}>
          <a>
            <User />
          </a>
        </Link>
        <Link href={"/"}>
          <a>
            <Heart />
          </a>
        </Link>
        <div>
          <Divider />
        </div>
        <Link href={"/"}>
          <a>
            <Bag />
          </a>
        </Link>
      </div>
      {width > desktopScreenSize && (
        <div
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
    </div>
  );
};

export default UserNavBar;
