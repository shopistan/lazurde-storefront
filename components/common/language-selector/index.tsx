import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Select from "../ui/select";

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
const LanguageSelector = (): JSX.Element => {

  const router = useRouter();
  const { locales, locale, pathname, query, asPath, defaultLocale } = router;

  const { appState, saveAppState } = useContext(AppContext);

  const navigateToLocale = () => {
    router.push({ pathname, query }, asPath, { locale: appState.locale });
  };

  const getDropdownDefaultValue = () => {
    return (locale || "").split("-")[1];
  };

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
    navigateToLocale();
    if (appState.lang === 'en') {
      document.documentElement.dir = 'ltr'
    } else {
      document.documentElement.dir = 'rtl'
    }
  }, [appState]);


  const onCountryChange = ((selectedData: optionProps) => {
    const region = selectedData.value
    saveAppState({
      ...appState,
      region: region,
      locale: `${appState.lang}-${region}`,
    });
  })

  const onLanguageChange = ((selectedData: optionProps) => {
    const language = selectedData.value
    saveAppState({
      ...appState,
      lang: language,
      locale: `${language}-${appState.region}`,
    });
  })

  return (
    <>
      <div>
        <span></span>
      </div>
      <Select options={countryArr} onChange={onCountryChange} defaultValue={appState.region}></Select>
      <Select options={languageArr} onChange={onLanguageChange} defaultValue={appState.lang}></Select>
    </>

  );
};
export default LanguageSelector;
