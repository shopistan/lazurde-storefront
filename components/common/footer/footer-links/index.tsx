import React, { useContext } from "react";
import Link from "next/link";
import Heading from "components/common/ui/heading";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";

type LinksArrType = {
  text?: string;
  url?: string;
};
interface FooterLinkProps {
  heading?: string;
  links?: LinksArrType[];
  index?: number;
  role?: string;
  arabicLinks?: LinksArrType[];
}

const FooterLinks = ({
  heading = "",
  links = [],
  index,
  role = "role",
  arabicLinks = [],
}: FooterLinkProps): JSX.Element => {
  const { appState } = useContext(AppContext);

  return (
    <div role={role} className={styles["menu__column"]} key={index}>
      <Heading element="h2" className={styles["menu__heading"]}>
        {heading}
      </Heading>
      <ul className={styles["menu__links"]}>
        {links &&
          links.length > 0 &&
          links.map((link, index) => (
            <li key={index}>
              <Link href={link.url}>
                <a className="opacity-60">
                  {appState?.lang === "en"
                    ? link.text
                    : Array.isArray(arabicLinks) && arabicLinks[index]?.text}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
