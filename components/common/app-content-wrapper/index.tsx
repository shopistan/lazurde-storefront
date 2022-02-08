import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "../../../styles/Wrapper.module.css";
import useTranslation from "next-translate/useTranslation";

interface AppContentWrapperProps {}

const AppContentWrapper: FC<AppContentWrapperProps> = ({
  children,
}): JSX.Element => {
  const router = useRouter();
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

  const { t } = useTranslation("common");

  return (
    <div className={styles.layout_container}>
      <h3>{t("sampleTranslationText")}</h3>
      <main>{children}</main>
      <footer>
        <span onClick={() => router.back()} className={styles.go_back}>
          Go Back
        </span>
      </footer>
    </div>
  );
};

export default AppContentWrapper;
