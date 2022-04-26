/* eslint-disable react/no-unknown-property */
import React, { Children, useState } from "react";
import Link from "next/link";
import styles from "./Accordion.module.scss";
import { MinusIcon, PlusIcon } from "components/icons";

type LinksArrType = { url?: string; text?: string };
interface AccordionProps {
  index?: number;
  heading?: string | JSX.Element;
  links?: { [key: string]: string }[] | [];
  isPlusMinusIcon?: boolean;
  children: string | JSX.Element;
  arrowIcon: Boolean;
}

const Accordion = ({
  index = 0,
  heading = "",
  links = [],
  children,
  arrowIcon = false,
}: AccordionProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div tabIndex={index} className={`${styles["wrapper"]}`}>
      <div
        className={`${styles["div-heading"]}`}
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <div className={`${styles["heading-text"]}`}>{heading}</div>
        <div className={`${styles["heading-icons"]}`} data-opened={isOpened}>
          {arrowIcon ? (
            <div>^</div>
          ) : (
            <div className={`${styles["plus-icon"]}`}>
              {!isOpened ? <PlusIcon /> : <MinusIcon />}
            </div>
          )}
        </div>
      </div>
      <div className={`${styles["custom-content"]}`} data-opened={isOpened}>
        {children}
      </div>
    </div>
  );
};
export default Accordion;
