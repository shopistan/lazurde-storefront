import React, { useState, useContext, useEffect } from "react";
import styles from "../style.module.scss";
import { langSelectData } from "lib/mock-data/data";
import { AppContext } from "lib/context";
import { useRouter } from "next/router";
import { optionProps } from "../types";

import LanguageSelector from "./select-dropdown";

const MobileLanguageSelector = () => {
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const { appState, saveAppState } = useContext(AppContext);
  const [region, setRegion] = useState({
    lang: appState.lang,
    region: appState.region,
  });

  useEffect(() => {
    navigateToLocale(`${region.lang}-${region.region}`);
  }, [region]);

  useEffect(() => {
    if (appState.lang === "en") {
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.dir = "rtl";
    }
  }, [appState]);

  useEffect(() => {
    if (router.locale.search("-") !== -1) {
      const route = (router.locale || "").split("-");
      saveAppState({
        ...appState,
        region: route[1],
        lang: route[0],
        locale: `${route[0]}-${route[1]}`,
      });
    }
  }, [router.locale]);

  const handleSelect = (selectedData: optionProps) => {
    const _selectedData = selectedData?.value.split("-");
    setRegion({
      region: _selectedData[1],
      lang: _selectedData[0],
    });
  };

  const navigateToLocale = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  return (
    <div className={styles["mobile-header__lang-wrapper"]}>
      <LanguageSelector
        options={langSelectData}
        onChange={handleSelect}
        defaultValue={appState.locale}
        iconWidth={20}
      />
    </div>
  );
};
export default MobileLanguageSelector;
