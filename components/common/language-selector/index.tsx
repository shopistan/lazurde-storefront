import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Select from "../ui/select";
import Button from "components/common/ui/button/index";
import useTranslation from "next-translate/useTranslation";
import { LOCATION_ID_AE, LOCATION_ID_SA, LOCATION_ID_EG } from "general-config";
import { useRouter } from "next/router";

import { AppContext } from "lib/context";

type optionProps = { label: string; value: string };

const countryArr = [
  {
    label: "Egypt",
    img: "/flag-egypt.png",
    value: "eg",
  },
  {
    label: "UAE",
    img: "/flag-uae.png",
    value: "ae",
  },
  {
    label: "KSA",
    img: "/flag-sa.png",
    value: "sa",
  },
];

const kenazCountryArr = [
  {
    label: "KSA",
    img: "/flag-sa.png",
    value: "sa",
  },
];

const languageArr = [
  {
    label: "English",
    img: "",
    value: "en",
  },
  {
    label: "عربي",
    img: "",
    value: "ar",
  },
];

const LanguageSelector = ({
  showButton,
  className = "",
  mainWrapperClass = "",
  optionClassName = "",
  onSubmit,
}: {
  showButton?: Boolean;
  className?: string;
  mainWrapperClass?: string;
  optionClassName?: string;
  onSubmit?: Function;
}): JSX.Element => {
  const router = useRouter();
  const { pathname, query, asPath } = router || {
    pathname: "",
    query: "",
    asPath: "",
  };
  const { locale, push } = useRouter() || { locale: "", push: () => {} };
  const { t } = useTranslation("common");

  const { appState, saveAppState } = useContext(AppContext);
  const [region, setRegion] = useState({
    lang: appState.lang,
    region: appState.region,
  });

  const navigateToLocale = (locale: string) => {
    push({ pathname, query }, asPath, { locale: locale });
  };

  useEffect(() => {
    if (!showButton) {
      navigateToLocale(`${region.lang}-${region.region}`);
    }
  }, [region]);

  useEffect(() => {
    if (appState.lang === "en") {
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.dir = "rtl";
    }
  }, [appState]);

  useEffect(() => {
    if (appState?.region === "ae") {
      saveAppState({
        ...appState,
        locationNum: LOCATION_ID_AE,
      });
    }
    if (appState?.region === "sa") {
      saveAppState({
        ...appState,
        locationNum: LOCATION_ID_SA,
      });
    }
    if (appState?.region === "eg") {
      saveAppState({
        ...appState,
        locationNum: LOCATION_ID_EG,
      });
    }
  }, [appState?.region]);

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

  const submitChanges = () => {
    navigateToLocale(`${region.lang}-${region.region}`);
  };

  const onCountryChange = (selectedData: optionProps) => {
    setRegion({ lang: appState.lang, region: selectedData.value });
  };

  const onLanguageChange = (selectedData: optionProps) => {
    setRegion({ region: appState.region, lang: selectedData.value });
  };

  return (
    <div
      data-testid={"main-wrapper"}
      className={`${styles["language-selector"]} ${mainWrapperClass}`}
    >
      <Select
        options={appState?.brand === "Kenaz" ? kenazCountryArr : countryArr}
        onChange={onCountryChange}
        defaultValue={appState.region}
        className={className}
        optionClassName={optionClassName}
      ></Select>
      <Select
        options={languageArr}
        onChange={onLanguageChange}
        defaultValue={appState.lang}
        className={className}
        optionClassName={optionClassName}
      ></Select>
      {showButton && (
        <div className={styles["submit-btn"]}>
          <Button
            type={"button"}
            buttonText={t("langSelectorBtnTxt")}
            buttonStyle={"black"}
            buttonSize={"sm"}
            onClick={() => {
              submitChanges();
              onSubmit && onSubmit();
            }}
          ></Button>
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
