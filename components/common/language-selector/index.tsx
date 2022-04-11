import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Select from "../ui/select";
import Button from 'components/common/ui/button/index';

import { useRouter } from "next/router";
import { getChannelFromLocale } from "lib/utils/common";
import {
  AppStateType,
  BrandType,
  ChannelType,
  LangType,
  LocaleType,
  RegionType,
} from "lib/types/common";
import { AppContext } from "lib/context";

type optionProps = { label: string, value: string }

const countryArr = [
  {
    label: 'Egypt',
    value: 'eg'
  },
  {
    label: 'UAE',
    value: 'ae'
  },
  {
    label: 'KSA',
    value: 'sa'
  }
]

const languageArr = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'عربي',
    value: 'ar'
  },
]
const LanguageSelector = ({showButton}: {showButton: Boolean}): JSX.Element => {
  const router = useRouter();
  const { locales, locale, pathname, query, asPath, defaultLocale } = router;

  const { appState, saveAppState } = useContext(AppContext);
  const [region, setRegion] = useState({ lang: appState.lang, region: appState.region })

  const navigateToLocale = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  // const getDropdownDefaultValue = () => {
  //   return (locale || "").split("-")[1];
  // };

  // useEffect(() => {
  //   let lang: LangType = "en";
  //   let region: RegionType = "sa";
  //   if (locale && locale.split("-").length > 0) {
  //     lang = (locale.split("-")[0] || "en") as LangType;
  //     region = (locale.split("-")[1] || "sa") as RegionType;
  //   }
  //   const brand: BrandType = "lazurde";
  //   const channel: ChannelType = getChannelFromLocale(locale as LocaleType);
  //   const newAppState: AppStateType = {
  //     lang,
  //     region,
  //     brand,
  //     locale: locale as LocaleType,
  //     channel,
  //   };
  //   saveAppState(newAppState);
  // }, []);

  useEffect(() => {
    if (!showButton) {
      navigateToLocale(`${region.lang}-${region.region}`)
    }
  }, [region]);

  useEffect(() => {
    if (appState.lang === 'en') {
      document.documentElement.dir = 'ltr'
    } else {
      document.documentElement.dir = 'rtl'
    }
  }, [appState]);

  useEffect(() => {
    if (router.locale.search('-') !== -1) {
      const route = (router.locale || "").split("-");
      saveAppState({
        ...appState,
        region: route[1],
        lang: route[0],
        locale: `${route[0]}-${route[1]}`,
      });
    }

  }, [router.locale]);

  const submitChanges = (() => {
    navigateToLocale(`${region.lang}-${region.region}`)
  })

  const onCountryChange = ((selectedData: optionProps) => {
    setRegion({ lang: appState.lang, region: selectedData.value })
  })

  const onLanguageChange = ((selectedData: optionProps) => {
    setRegion({ region: appState.region, lang: selectedData.value })
  })

  return (
    <>
      <Select options={countryArr} onChange={onCountryChange} defaultValue={appState.region}></Select>
      <Select options={languageArr} onChange={onLanguageChange} defaultValue={appState.lang}></Select>
      {showButton &&
        <div className={styles["submit-btn"]}>
          <Button type={'button'} buttonText={"Continue"} buttonStyle={"black"} buttonSize={'sm'} onClick={() => submitChanges()}></Button>
        </div>
      }
    </>

  );
};
export default LanguageSelector;
