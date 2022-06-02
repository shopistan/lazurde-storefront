import React, { FC, useState, useContext } from "react";
import styles from "./user-navbar.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
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
import Axios from "axios";
import { OKTA_CLIENT_ID, OKTA_DOMAIN, OKTA_REDIRECT_URI } from "general-config";

const sidebarData = {
  mainImg: {
    url: "/",
    altText: "image",
  },
  mainTitle: "main title",
  logoArr: [
    {
      logoImg: {
        url: "/",
        altText: "image",
      },
    },
  ],
  brandArr: [
    {
      url: "/",
      altText: "image",
      label: "label",
      labelUrl: "/",
    },
  ],
};

const signInUser = async () => {
  try {
    const signInRes = await Axios.get(`${OKTA_DOMAIN}/authorize`, {
      params: {
        client_id: OKTA_CLIENT_ID,
        responseType: "code",
        scope: "openid",
        redirect_uri: OKTA_REDIRECT_URI,
        state: "state-8600b31f-52d1-4dca-987c-386e3d8967e9",
        code_challenge_method: "S256",
        code_challenge: "qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es",
      },
    });
    console.log(signInRes);
  } catch (error) {
    console.log("Error signing in: ", (error as ErrorObject).message);
  }
};

const UserNavBar: FC<{ brandSideBar: BrandSidebarProps }> = ({
  brandSideBar,
}): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState(false);

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
            <li className="item-1">{`Lazurde`}</li>
            <li className="item-2">{`Miss'L`}</li>
            <li className="item-3">{`Kenaz`}</li>
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
        {/* <Link href={"/"}>
          <a> */}
        <div onClick={signInUser}>
          <User />
        </div>
        {/* </a>
        </Link> */}
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
      <BrandSidebar
        {...brandSideBar}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </div>
  );
};

export default UserNavBar;
