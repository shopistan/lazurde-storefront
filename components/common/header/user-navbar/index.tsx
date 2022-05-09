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
import { updateBrand } from "lib/utils/common";
import { AppContext } from "lib/context";

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
                  onClick={() => updateBrand("Lazurde", saveAppState, appState)}
                >{`Lazurde`}</a>
              </Link>
            </li>
            <li className="item-2">
              <Link href="/missl">
                <a
                  onClick={() => updateBrand("MissL", saveAppState, appState)}
                >{`Miss'L`}</a>
              </Link>
            </li>
            <li className="item-3">
              <Link href="/kenaz">
                <a
                  onClick={() => updateBrand("Kenaz", saveAppState, appState)}
                >{`Kenaz`}</a>
              </Link>
            </li>
            <li className="item-4">
              <Link href="/">
                <a
                  onClick={() => updateBrand("Lazurde", saveAppState, appState)}
                >{`Lazurde`}</a>
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
      {width > 1023 && (
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
