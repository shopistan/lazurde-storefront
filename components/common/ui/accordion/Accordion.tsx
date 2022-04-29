/* eslint-disable react/no-unknown-property */
import React from "react";
import Link from "next/link";
import styles from "./Accordion.module.scss";

type LinksArrType = { url?: string; text?: string };
interface AccordionProps {
  index?: number;
  heading?: string;
  links?: LinksArrType[];
  isPlusMinusIcon?: boolean;
}

const Accordion = ({
  index = 0,
  heading = "",
  links = [],
  isPlusMinusIcon = false,
}: AccordionProps): JSX.Element => {
  return (
    <div
      tabIndex={index}
      className={`collapse collapse-arrow ${styles["collapse__wrapper"]}`}
    >
      <input type="checkbox" />
      <div
        className={`collapse-title text-xl font-medium ${
          styles["collapse__custom-title"]
        } ${isPlusMinusIcon ? "plus-minus-icon" : ""}`}
      >
        {heading}
      </div>
      <div className={`collapse-content ${styles["collapse__custom-content"]}`}>
        {links && (
          <ul className={styles["menu__links"]}>
            {links &&
              links.length > 0 &&
              links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>
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
