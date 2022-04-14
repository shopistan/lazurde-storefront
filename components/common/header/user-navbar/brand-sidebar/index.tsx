/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  KenazLogo,
  LazurdeLogo,
  LazurdeLSLogo,
  MisslLogo,
  Cross,
  BackArrow,
} from "components/icons";
import styles from "./brand-sidebar.module.scss";
import { BrandProps, ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";

const brandData = [
  {
    url: "/brand-lazurde.jpg",
    altText: "brand image",
    label: "L’azurde",
    labelUrl: "/",
  },
  {
    url: "/brand-missL.jpg",
    altText: "brand image",
    label: "Miss L’",
    labelUrl: "/",
  },
  {
    url: "/brand-kenaz.jpg",
    altText: "brand image",
    label: "Kenaz",
    labelUrl: "/",
  },
  {
    url: "/brand-lazurdeLS.jpg",
    altText: "brand image",
    label: "L’azurde InStyle",
    labelUrl: "/",
  },
];

interface SidebarProps {
  mainImg?: ImageType;
  mainTitle?: string;
  logoArr?: [{ logoImg: ImageType }];
  brandArr?: BrandProps[];
  isOpened?: boolean;
  setIsOpened?: Function;
  closeIcon?: boolean;
  closeMenu?: Function;
}

const BrandContainer: FC<BrandProps> = ({
  brandImg,
  label,
  labelUrl,
}): JSX.Element => {
  const [width] = useWindowSize();
  return (
    <div>
      {width > 1023 && (
        <Image
          src={brandImg.url}
          alt={brandImg.altText}
          width={"186px"}
          height={"183px"}
          layout="intrinsic"
        />
      )}

      <Link href={labelUrl}>
        <a>{label}</a>
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
  return (
    <>
      <div
        className={styles["overlay"]}
        data-opened={isOpened}
        onClick={() => setIsOpened(!isOpened)}
      ></div>
      <div className={styles["brand_sidebar"]} data-opened={isOpened}>
        {closeIcon && (
          <div className={styles["menu-close-icon"]}>
            <div
              className={`opacity-60 ${styles[""]}`}
              onClick={() => {
                setIsOpened(false);
                closeMenu();
              }}
            >
              <BackArrow fill="#000000" opacity="0.6" />
              <span className="opacity-60">Back to L’azurde</span>
            </div>
            <button onClick={() => setIsOpened(false)}>
              <Cross width={"20px"} height={"20px"} />
            </button>
          </div>
        )}
        <div className={styles["text_div"]}>
          <div>
            <img src={mainImg?.url} alt={mainImg?.altText} />
            {/* <LazurdeLogo width="182px" height="24px" /> */}
          </div>
          <div className={styles["slogan_div"]}>
            <span>
              {mainTitle || "One Account. One Checkout. Multiple Brands"}
            </span>
          </div>
          <div className="flex gap-x-[8px]">
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
    </>
  );
};

export default BrandSideBar;
