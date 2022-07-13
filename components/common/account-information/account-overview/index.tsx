import React, { useContext } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";

const AccountOverView = () => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  return (
    <>
      <div className={styles["account-detail-section"]}>
        <div className={styles["account-image-section"]}>
          <div data-testid="heading" className={styles["account-image-text"]}>
            {appState?.lang == "en" ? `Welcome to your account` : t("welcome")}
          </div>
          <div className={styles["account-right"]}>
            <Image
              role="image"
              src={"/main-image.png"}
              width={650}
              height={760}
              layout="responsive"
              alt="main-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountOverView;
