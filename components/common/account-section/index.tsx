import React, { useContext } from "react";
import Image from "next/image";
import styles from "./account-section.module.scss";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";

const AccountSection = () => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  return (
    <>
      <div className={styles["account-detail-section"]}>
        <div className={styles["account-image-section"]}>
          <div className={styles["account-image-text"]}>
            {appState?.lang == "en" ? `Welcome to your account` : t("welcome")}
          </div>
          <div className={styles["account-right"]}>
            <Image src={"/main-image.png"} width={650} height={760} layout='responsive' />
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountSection;
