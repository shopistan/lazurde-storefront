import React, { FC, useState, useContext } from "react";
import styles from "./promo-bar.module.scss";
import Link from "next/link";
import Cross from './../../../icons/Cross';
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import useWindowSize from "lib/utils/useWindowSize";
interface PromoBarProps {
  title: string;
  linkText: string;
  mobileLinkText: string;
  link: string;
  bgColor: string;
}

const PromoBar: FC<PromoBarProps> = ({
  title,
  bgColor,
  linkText,
  mobileLinkText,
  link,
}): JSX.Element => {
  const [isClosed, setIsClosed] = useState(false)
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize()
  const dynamicText = width > 1023 ? linkText : mobileLinkText
  return (
    <div className={styles["promobar"]} data-visible={isClosed} data-testid="product-card" style={{ backgroundColor: bgColor }}>
      <div className={styles["title"]} data-testid='test-title'>
        {/* {`${t("promoBarTitle") === ' ' ? title : t("promoBarTitle")} `} */}
        {appState.lang === 'en' ? `${title} ` : t("promoBarTitle")}
        <Link href={link || '/'} locale={false}>
          <a className={styles["link-text"]}>
            <span data-testid='test-title'>
              {/* {`${t("promoBarLinkTitle") === ' ' ? linkText : t("promoBarLinkTitle")} ` || "Title Here"} */}
              {appState.lang === 'en' ? dynamicText : t("promoBarLinkTitle")}
            </span>
          </a>
        </Link></div>
      <button className={styles["closeButton"]} type='button' onClick={() => {
        setIsClosed(true)
      }}>
        <Cross width={'20px'} height={'20px'} />
      </button>
    </div>
  );
};

export default PromoBar;