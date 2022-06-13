/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Accordion.module.scss";
import { MinusIcon, PlusIcon, ChevronDown, ArrowDown } from "components/icons";
interface AccordionProps {
  className?: string;
  index?: number;
  heading?: string | JSX.Element;
  links?: { [key: string]: string }[] | [];
  isPlusMinusIcon?: boolean;
  children?: string | JSX.Element;
  arrowIcon?: Boolean;
  role?: string;
  arrowColor?: string;
  arrowDown?: Boolean;
}

const Accordion = ({
  className = "",
  index = 0,
  heading = "",
  links = [],
  children,
  arrowIcon = false,
  role = "",
  arrowColor,
  arrowDown = false,
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
          {arrowDown ? (
            <div className={`${isOpened && styles['arrowDown-open']}`}>
              <ArrowDown />
            </div>
          ) : arrowIcon ? (
            <div className={styles["angle-down"]}>
              <ChevronDown
                color={arrowColor || "#ffffff"}
                width="10px"
                height="7px"
              />
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
        {links && links.length > 0 && (
          <ul className={styles["menu__links"]}>
            {links.map((link, index) => (
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
