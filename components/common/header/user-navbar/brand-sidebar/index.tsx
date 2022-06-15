/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { BackArrow, CrossSmall } from "components/icons";
import styles from "./brand-sidebar.module.scss";
import { BrandArrType, ImageType } from "lib/types/common";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";
import { updateBrand } from "lib/utils/common";
import { desktopScreenSize } from "lib/utils/common";

interface SidebarProps {
  mainImg?: ImageType;
  mainTitle?: string;
  logoArr?: {
    width?: string | number;
    mobileWidth?: string | number;
    logoImg: {
      url?: string;
      altText?: string;
    };
  }[];
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
  const router = useRouter();

  return (
    <div
      className={styles["brands-list"]}
      onClick={() => {
        router.push(labelUrl);

        saveAppState({
          ...appState,
          brand: label ? label : "",
        });
      }}
    >
      {width > desktopScreenSize && (
        <Image
          src={brandImg.url || "/"}
          alt={brandImg.altText}
          width={"186px"}
          height={"183px"}
          layout="intrinsic"
        />
      )}

      <Link href={labelUrl}>
        <a
          onClick={() =>
            saveAppState({
              ...appState,
              brand: label ? label : "",
            })
          }
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
  const [size] = useWindowSize();

  return (
    <div
      role={"brandSideBarMain"}
      className={styles["brand_sidebar_div"]}
      data-opened={isOpened}
      onClick={() => {
        setIsOpened(false);
      }}
    >
      <div
        role={"brandSideBarDiv"}
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
                saveAppState({
                  ...appState,
                  brand: `L'azurde`,
                });
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
            <button
              style={{
                padding: "0",
              }}
            >
              <CrossSmall
                width={"12px"}
                height={"12px"}
                onClick={() => setIsOpened(false)}
              />
            </button>
          </div>
        )}
        <div className={styles["text_div"]}>
          <div>
            <Image
              src={mainImg?.url || "/"}
              alt={mainImg?.altText || ""}
              layout="fixed"
              width={184}
              height={24}
            />
          </div>
          <div className={styles["slogan_div"]}>
            <span>
              {mainTitle || "One Account. One Checkout. Multiple Brands"}
            </span>
          </div>
          <div className={`flex gap-x-[8px] ${styles["brands-logo"]}`}>
            {logoArr?.length > 0 &&
              logoArr.map((data, index) => {
                const { url, altText } = data?.logoImg;
                return (
                  <div key={index}>
                    <Image
                      key={index}
                      src={url || "/"}
                      alt={altText || ""}
                      layout="fixed"
                      width={
                        size > desktopScreenSize
                          ? data?.width || 89
                          : data?.mobileWidth || 80
                      }
                      height={15}
                    />
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
