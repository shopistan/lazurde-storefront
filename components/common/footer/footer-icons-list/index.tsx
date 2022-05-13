/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

type IconsType = {
  link?: string;
  width?: string | number;
  mobileWidth?: string | number;
  icon?: {
    url?: string;
    altText?: string;
  };
};

type sizeType = {
  width?: string | number;
  mobileWidth?: string | number;
};
interface IconsListProps {
  iconsList?: IconsType[];
  className?: string;
  iconSize?: sizeType[];
  isFooterIcons?: boolean;
}

const FooterIcons = ({
  iconsList,
  iconSize = [],
  className = "",
  isFooterIcons = false,
}: IconsListProps): JSX.Element => {
  const [size] = useWindowSize();
  return (
    <>
      <ul className={`${className} ${styles["icons__container"]}`}>
        {iconsList?.length > 0 &&
          iconsList.map((socialIcon, index) => {
            const { link, icon, width, mobileWidth } = socialIcon;
            return (
              <li
                className="icons__item"
                key={index}
                style={{
                  width:
                    size > desktopScreenSize
                      ? width || iconSize[index]?.width
                      : mobileWidth || iconSize[index]?.mobileWidth,
                }}
              >
                <Link href={link}>
                  <a
                    className={
                      styles[`${isFooterIcons ? "footer-payment-icon" : ""}`]
                    }
                  >
                    <Image
                      className={styles["icons__custom-img-style"]}
                      src={icon?.url || ""}
                      alt={icon?.altText || "icon"}
                      width={
                        size > desktopScreenSize
                          ? width || iconSize[index]?.width
                          : mobileWidth || iconSize[index]?.mobileWidth
                      }
                      height={isFooterIcons ? 24 : 20}
                      layout="responsive"
                    />
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default FooterIcons;
