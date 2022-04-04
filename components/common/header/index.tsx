import { AppContext } from "lib/context";
import {
  AppStateType,
  BrandType,
  ChannelType,
  HeaderProps,
  LangType,
  LocaleType,
  RegionType,
} from "lib/types/common";
import { getChannelFromLocale } from "lib/utils/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({ navLinks, brandImage }: HeaderProps) => {
  const brandIconUrl =
    "https://cdn.lazurde.com/static/version1643995588/frontend/Gurubhyo/Lazurde/ar_SA/images/logo.svg";
  const router = useRouter();
  const { locales, locale, pathname, query, asPath, defaultLocale } = router;
  // console.log(
  //   "Configured Locales",
  //   locales,
  //   "Locale",
  //   locale,
  //   "Pathname",
  //   pathname,
  //   "Query",
  //   query,
  //   "AsPath",
  //   asPath,
  //   "defaultLocale",
  //   defaultLocale
  // );

  const { appState, saveAppState } = useContext(AppContext);

  const navigateToLocale = () => {
    router.push({ pathname, query }, asPath, { locale: appState.locale });
  };

  const onRegionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    saveAppState({
      ...appState,
      region: event.target.value,
      locale: `${appState.lang}-${event.target.value}`,
    });
    navigateToLocale();
  };

  const getDropdownDefaultValue = () => {
    return (locale || "").split("-")[1];
  };

  useEffect(() => {
    let lang: LangType = "en";
    let region: RegionType = "sa";
    if (locale && locale.split("-").length > 0) {
      lang = (locale.split("-")[0] || "en") as LangType;
      region = (locale.split("-")[1] || "sa") as RegionType;
    }
    const brand: BrandType = "lazurde";
    const channel: ChannelType = getChannelFromLocale(locale);
    const newAppState: AppStateType = {
      lang,
      region,
      brand,
      locale: locale as LocaleType,
      channel,
    };
    saveAppState(newAppState);
  }, []);
  useEffect(() => {
    navigateToLocale();
  }, [appState]);
  return (
    <div className={styles["header-container"]}>
      <Link href={"/"} locale={false}>
        <a>
          <Image src={brandIconUrl} width={100} height={75}></Image>
        </a>
      </Link>
      <div className={styles["header-links-wrapper"]}>
        <Link href={"/missl"}>
          <a className={styles["header-link"]}>Miss'L</a>
        </Link>
        <Link href={"/kenaz"}>
          <a className={styles["header-link"]}>Kenaz</a>
        </Link>
      </div>
      <div className={styles["locale-selector-wrapper"]}>
        <span
          onClick={() => {
            saveAppState({
              ...appState,
              lang: "ar",
              locale: `ar-${appState.region}`,
            });
          }}
          className={styles.lang}
        >
          عربى
        </span>
        <span className={styles.lang}> | </span>
        <span
          onClick={() => {
            saveAppState({
              ...appState,
              lang: "en",
              locale: `en-${appState.region}`,
            });
          }}
          className={styles.lang}
        >
          English
        </span>
        <select
          onChange={(e) => onRegionSelect(e)}
          value={getDropdownDefaultValue()}
        >
          <option value={"sa"}>السعودية</option>
          <option value={"eg"}>مصر</option>
          <option value={"ae"}>الإمارات</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
