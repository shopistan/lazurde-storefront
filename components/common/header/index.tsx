import { HeaderProps } from "lib/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({ navLinks, brandImage }: HeaderProps) => {
  const brandIconUrl =
    "https://cdn.lazurde.com/static/version1643995588/frontend/Gurubhyo/Lazurde/ar_SA/images/logo.svg";
  const router = useRouter();
  const { locales, locale, pathname, query, asPath } = router;
  // console.log(
  //     "Configured Locales",
  //     locales,
  //     "Locale",
  //     locale,
  //     "Pathname",
  //     pathname,
  //     "Query",
  //     query,
  //     "AsPath",
  //     asPath
  // );

  const setLang = (lang: string) => {
    window.localStorage.setItem("lang", lang);
  };

  const setRegion = (region: string) => {
    window.localStorage.setItem("region", region);
  };

  const getLocale = () => {
    const lang = window.localStorage.getItem("lang") || "en";
    const region = window.localStorage.getItem("region") || "sa";
    return `${lang}-${region}`;
  };

  const navigateToLocale = () => {
    router.push({ pathname, query }, asPath, { locale: getLocale() });
  };

  const onRegionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
    navigateToLocale();
  };

  const getDropdownDefaultValue = () => {
    return (locale || "").split("-")[1];
  };

  useEffect(() => {
    if (locale && locale.split("-").length > 0) {
      setLang(locale.split("-")[0] || "en");
      setRegion(locale.split("-")[1] || "sa");
    }
  }, []);
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
            setLang("ar");
            navigateToLocale();
          }}
          className={styles.lang}
        >
          عربى
        </span>
        <span className={styles.lang}> | </span>
        <span
          onClick={() => {
            setLang("en");
            navigateToLocale();
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
