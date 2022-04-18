/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";

type IconsType = {
  link?: string;
  icon?: { url: string; altText: string };
};
interface IconsListProps {
  iconsList?: IconsType[];
  className?: string;
}

const FooterIcons = ({
  iconsList,
  className = "",
}: IconsListProps): JSX.Element => {
  return (
    <>
      <ul className={`${className} ${styles["icons__container"]}`}>
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
