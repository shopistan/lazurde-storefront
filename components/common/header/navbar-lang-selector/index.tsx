import React, { useState, useEffect, useContext } from "react";
import styles from "./navbar-lang-selector.module.scss";
import Cross from "../../../icons/Cross";
import useTranslation from "next-translate/useTranslation";
import LanguageSelector from "./../../language-selector/index";
import { AppContext } from "lib/context";

const LangSelector = (): JSX.Element => {
  const [isClosed, setIsClosed] = useState("true");
  const { t } = useTranslation("common");
  const { setSearchWrapperPosition } = useContext(AppContext);

  useEffect(() => {
    setIsClosed(
      typeof window !== "undefined"
        ? JSON.parse(window.localStorage.getItem("lang-selector-visible"))
        : "false"
    );
    setSearchWrapperPosition({
      promo: false,
      langSelector: false,
    });
  }, []);

  const hideSelector = () => {
    setIsClosed("true");
    typeof window !== "undefined" &&
      window.localStorage.setItem("lang-selector-visible", "true");
    setSearchWrapperPosition({
      promo: false,
      langSelector: true,
    });
  };

  return (
    <div
      className={styles["navbar-lang"]}
      data-visible={isClosed}
      data-testid="product-card"
    >
      <div className={styles["main-section"]}>
        <div className={styles["title"]}>
          <span>{t("NavbarLangSelectorTitle")} </span>
        </div>
        <div className={styles["selector"]}>
          <LanguageSelector showButton={true} onSubmit={hideSelector} />
        </div>
      </div>
      <button
        className={styles["closeButton"]}
        type="button"
        onClick={() => {
          setIsClosed("true");
          typeof window !== "undefined" &&
            window.localStorage.setItem("lang-selector-visible", "true");
          setSearchWrapperPosition({
            promo: false,
            langSelector: true,
          });
        }}
      >
        <Cross width={"20px"} height={"20px"} />
      </button>
    </div>
  );
};

export default LangSelector;
