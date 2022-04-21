import React, { FC, useState, useContext } from "react";
import styles from "./promo-bar.module.scss";
import Link from "next/link";
import Cross from './../../../icons/Cross';
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import useWindowSize from "lib/utils/useWindowSize";
import Button from "components/common/ui/button";
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
    <div className={styles["promobar"]} data-visible={isClosed} data-testid="promo-div" style={{ backgroundColor: bgColor }}>
      <div className={styles["title"]} data-testid='test-title'>
        {appState.lang === 'en' ? `${title} ` : t("promoBarTitle")}
        <Link href={link || '/'} locale={false}>
          <a className={styles["link-text"]}>
            <span data-testid='link-text'>
              {appState.lang === 'en' ? dynamicText : t("promoBarLinkTitle")}
            </span>
          </a>
        </Link></div>
      <Button className={styles["closeButton"]} type='button' onClick={() => {
        setIsClosed(true)
      }}>
        <Cross width={'20px'} height={'20px'} />
      </Button>
    </div>
  );
};

export default PromoBar;