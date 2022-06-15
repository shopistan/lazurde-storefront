import React, { FC, useState, useContext, useEffect } from "react";
import styles from "./promo-bar.module.scss";
import Link from "next/link";
import Cross from "./../../../icons/Cross";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import useWindowSize from "lib/utils/useWindowSize";
import Button from "components/common/ui/button";
import { desktopScreenSize } from "lib/utils/common";
import Skeleton from "react-loading-skeleton";
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
  const [isClosed, setIsClosed] = useState(true);
  const { t } = useTranslation("common");
  const { appState, setSearchWrapperPosition } = useContext(AppContext);
  const [width] = useWindowSize();
  // const dynamicText = width > desktopScreenSize ? linkText : mobileLinkText;
  const [dynamicText, setDynamicText] = useState("");

  useEffect(() => {
    setIsClosed(
      typeof window !== "undefined"
        ? JSON.parse(window.localStorage.getItem("promo-bar-visible"))
        : "false"
    );
    setSearchWrapperPosition({
      promo: false,
      langSelector: false,
    });
    let dT = width > desktopScreenSize ? linkText : mobileLinkText;
    setDynamicText(dT);
  }, []);

  return (
    <div
      className={styles["promobar"]}
      data-visible={isClosed}
      data-testid="promo-div"
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles["title"]} data-testid="test-title">
        {appState.lang === "en" ? `${title} ` : t("promoBarTitle")}
        {/* {title} */}
        <Link href={link || "/"} locale={false}>
          <a className={styles["link-text"]}>
            <span data-testid="link-text">
              {/* {dynamicText || <Skeleton />} */}
              {appState.lang === "en" ? dynamicText : t("promoBarLinkTitle")}
            </span>
          </a>
        </Link>
      </div>
      <Button
        className={styles["closeButton"]}
        type="button"
        onClick={() => {
          setIsClosed(true);
          typeof window !== "undefined" &&
            window.localStorage.setItem("promo-bar-visible", "true");
          setSearchWrapperPosition({
            promo: true,
            langSelector: false,
          });
        }}
      >
        <Cross width={"20px"} height={"20px"} />
      </Button>
    </div>
  );
};

export default PromoBar;
