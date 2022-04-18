import React from "react";
import Link from "next/link";
import Heading from "components/common/ui/heading";
import styles from "./style.module.scss";

type LinksArrType = {
  text?: string;
  url?: string;
};
interface FooterLinkProps {
  heading?: string;
  links?: LinksArrType[];
  key?: number;
}

const FooterLinks = ({
  heading = "",
  links = [],
  key,
}: FooterLinkProps): JSX.Element => {
  return (
    <div className={styles["menu__column"]} key={key}>
      <Heading element="h2" className={styles["menu__heading"]}>
        {heading}
      </Heading>
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
    </div>
  );
};

export default FooterLinks;
