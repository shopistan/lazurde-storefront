import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import styles from "../../../styles/Layout.module.css";
import useTranslation from 'next-translate/useTranslation';


interface LayoutProps {

}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
    const router = useRouter();
    const { locales, locale, pathname, query, asPath } = router;
    console.log(
        "Configured Locales",
        locales,
        "Locale",
        locale,
        "Pathname",
        pathname,
        "Query",
        query,
        "AsPath",
        asPath
    );

    const { t } = useTranslation('common')
    console.log('TEE', t('sampleTranslationText'))

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
        //console.log("current locale", (locale || '').split("-")[1]);
        return (locale || '').split("-")[1];
    };

    useEffect(() => {
        if (locale && locale.split("-").length > 0) {
            setLang(locale.split("-")[0] || "en");
            setRegion(locale.split("-")[1] || "sa");
        }
    }, []);

    return (
        <div className={styles.layout_container}>
            <header className={styles.header}>
                <h1>
                    <Link href={"/"} locale={false}>
                        <a style={{ color: "maroon" }}>Lazurde.com</a>
                    </Link>
                </h1>
                <div>
                    <span
                        onClick={() => {
                            setLang("ar");
                            navigateToLocale();
                        }}
                        className={styles.lang}
                    >
                        عربى
                    </span>
                    <span> | </span>
                    <span
                        onClick={() => {
                            setLang("en");
                            navigateToLocale();
                        }}
                        className={styles.lang}
                    >
                        English
                    </span>
                </div>
                <select
                    onChange={(e) => onRegionSelect(e)}
                    value={getDropdownDefaultValue()}
                >
                    <option value={"sa"}>السعودية</option>
                    <option value={"eg"}>مصر</option>
                    <option value={"ae"}>الإمارات</option>
                </select>
            </header>
            <h3>{t('sampleTranslationText')}</h3>
            <main>{children}</main>
            <footer>
                <span onClick={() => router.back()} className={styles.go_back}>
                    Go Back
                </span>
            </footer>
        </div>
    );
}

export default Layout;
