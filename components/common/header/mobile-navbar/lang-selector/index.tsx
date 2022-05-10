import React, { useState, useContext, useEffect } from "react";
import styles from "../style.module.scss";
import { langSelectData, kenazLangSelectData } from "lib/mock-data/data";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";
import { OptionProps } from "lib/types/mobile-header";

import LanguageSelector from "./select-dropdown";

const MobileLanguageSelector = (): JSX.Element => {
  const router = useRouter();
  const { pathname, query, asPath } = router || {
    pathname: "",
    query: "",
    asPath: "",
  };
  const { locale, push } = useRouter() || { locale: "", push: () => {} };
  const { appState, saveAppState } = useContext(AppContext);
  const [region, setRegion] = useState({
    lang: appState.lang,
    region: appState.region,
  });

  useEffect(() => {
    navigateToLocale(`${region.lang}-${region.region}`);
  }, [region]);

  useEffect(() => {
    if (appState?.lang === "en") {
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.dir = "rtl";
    }
  }, [appState]);

  useEffect(() => {
    if (locale?.search("-") !== -1) {
      const route = (locale || "").split("-");
      saveAppState({
        ...appState,
        region: route[1],
        lang: route[0],
        locale: `${route[0]}-${route[1]}`,
      });
    }
  }, [locale]);

  const handleSelect = (selectedData: OptionProps) => {
    const _selectedData = selectedData?.value.split("-");
    setRegion({
      region: _selectedData[1],
      lang: _selectedData[0],
    });
  };

  const navigateToLocale = (locale: string) => {
    push({ pathname, query }, asPath, { locale: locale });
  };

  return (
    <div className={styles["mobile-header__lang-wrapper"]}>
      <LanguageSelector
        options={
          appState?.brand === "kenaz" ? kenazLangSelectData : langSelectData
        }
        onChange={handleSelect}
        defaultValue={appState.locale}
        iconWidth={20}
      />
    </div>
  );
};
export default MobileLanguageSelector;
