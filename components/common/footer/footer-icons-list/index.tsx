/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
// import Image from "next/image";

import styles from "./style.module.scss";

interface iconProps {
  url: string;
  altText: string;
}
interface iconsObj {
  link: string;
  icon: iconProps;
}

interface iconsListType {
  iconsList?: iconsObj[];
}

const FooterIcons = ({ iconsList }: iconsListType) => {
  return (
    <>
      <ul className={styles["icons__container"]}>
        {iconsList?.length > 0 &&
          iconsList.map((socialIcon, index) => {
            const { link, icon } = socialIcon;
            return (
              <li className="icons__item" key={index}>
                <Link href={link}>
                  <a>
                    <img
                      className={styles["icons__custom-img-style"]}
                      src={icon?.url}
                      alt={icon?.altText}
                      // width={20}
                      // height={20}
                      // layout="fill"
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
