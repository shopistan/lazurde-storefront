/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross, BackArrow } from "components/icons";
import styles from "./brand-sidebar.module.scss";
import { BrandArrType, ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";
import { updateBrand } from "lib/utils/common";
import {desktopScreenSize} from 'lib/utils/common'


interface SidebarProps {
  mainImg?: ImageType;
  mainTitle?: string;
  logoArr?: { logoImg: ImageType }[];
  brandArr?: BrandArrType[];
  isOpened?: boolean;
  setIsOpened?: Function;
  closeIcon?: boolean;
  closeMenu?: Function;
}

const BrandContainer: FC<BrandArrType> = ({
  brandImg,
  label,
  labelUrl,
}): JSX.Element => {
  const { appState, saveAppState } = useContext(AppContext);
  const [width] = useWindowSize();

  const brandValue = labelUrl && labelUrl.split("/")[1];

  return (
    <div className={styles["brands-list"]}>
      {width > desktopScreenSize && (
        <Image
          src={brandImg.url}
          alt={brandImg.altText}
          width={"186px"}
          height={"183px"}
          layout="intrinsic"
        />
      )}

      <Link href={labelUrl}>
        <a
          onClick={() => {
            if (brandValue && brandValue?.length > 0) {
              updateBrand(brandValue, saveAppState, appState);
            } else {
              updateBrand("Lazurde", saveAppState, appState);
            }
          }}
        >
          {label}
        </a>
      </Link>
    </div>
  );
};

const BrandSideBar: FC<SidebarProps> = ({
  mainImg,
  mainTitle,
  logoArr,
  brandArr,
  isOpened,
  setIsOpened,
  closeIcon,
  closeMenu,
}): JSX.Element => {
  const { appState, saveAppState } = useContext(AppContext);
  const router = useRouter();

  return (
    <div
      className={styles["brand_sidebar_div"]}
      data-opened={isOpened}
      onClick={() => {
        setIsOpened(false);
      }}
    >
      <div
        className={styles["brand_sidebar"]}
        data-opened={isOpened}
        onClick={(event) => event.stopPropagation()}
      >
        {closeIcon && (
          <div className={styles["menu-close-icon"]}>
            <div
              className={`opacity-60`}
              onClick={() => {
                setIsOpened(false);
                closeMenu();
                updateBrand("Lazurde", saveAppState, appState);
                router.push("/");
              }}
            >
              <BackArrow fill="#000000" opacity="0.6" />
              <span className="opacity-60">
                {appState?.lang === "en"
                  ? "Back to L’azurde"
                  : "ىلا عجرا L’azurde"}
              </span>
            </div>
            <button onClick={() => setIsOpened(false)}>
              <Cross width={"20px"} height={"20px"} />
            </button>
          </div>
        )}
        <div className={styles["text_div"]}>
          <div>
            <img src={mainImg?.url} alt={mainImg?.altText} />
          </div>
          <div className={styles["slogan_div"]}>
            <span>
              {mainTitle || "One Account. One Checkout. Multiple Brands"}
            </span>
          </div>
          <div className={`flex gap-x-[8px] ${styles["brands-logo"]}`}>
            {logoArr?.length > 0 &&
              logoArr.map((data, index) => {
                const { url, altText } = data.logoImg;
                return (
                  <div key={index}>
                    <img key={index} src={url} alt={altText} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles["brand_div"]}>
          {brandArr?.length > 0 &&
            brandArr.map((data) => {
              return BrandContainer({ ...data });
            })}
        </div>
      </div>
    </div>
  );
};

export default BrandSideBar;
