/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Accordion.module.scss";
import { MinusIcon, PlusIcon, ChevronDown } from "components/icons";
interface AccordionProps {
  className?: string;
  index?: number;
  heading?: string | JSX.Element;
  links?: { [key: string]: string }[] | [];
  isPlusMinusIcon?: boolean;
  children?: string | JSX.Element;
  arrowIcon: Boolean;
  role?: string;
}

const Accordion = ({
  className = "",
  index = 0,
  heading = "",
  links = [],
  children,
  arrowIcon = false,
  role = "",
}: AccordionProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      tabIndex={index}
      className={`${styles["wrapper"]} ${styles[className]}`}
      role={role}
    >
      <div
        className={`${styles["div-heading"]}`}
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <div className={`${styles["heading-text"]}`}>{heading}</div>
        <div className={`${styles["heading-icons"]}`} data-opened={isOpened}>
          {arrowIcon ? (
            <div className={styles["angle-down"]}>
              <ChevronDown color="#ffffff" width="10px" height="7px" />
            </div>
          ) : (
            <div className={`${styles["plus-icon"]}`}>
              {!isOpened ? <PlusIcon /> : <MinusIcon />}
            </div>
          )}
        </div>
      </div>
      <div className={`${styles["custom-content"]}`} data-opened={isOpened}>
        {children}
        {links && (
          <ul className={styles["menu__links"]}>
            {links &&
              links.length > 0 &&
              links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url || "/"}>
                    <a className="opacity-60">{link.text}</a>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Accordion;
