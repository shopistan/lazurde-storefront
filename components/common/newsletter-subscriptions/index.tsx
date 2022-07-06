import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const NewsSubscriptions = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [renderCom, setRenderCom] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setRenderCom(true);
  }, []);

  const handleAction = () => {
    router.push("/newsletter");
  };
  return (
    <>
      <div className={styles["account-newsletter-container"]}>
        <div className={styles["account-newsletter-heading-section"]}>
          <div className={styles["account-newsletter-icon"]}>
            <Image
              alt="icon"
              src={"/newsletter.png"}
              width={20}
              height={20}
              layout="fixed"
            />
          </div>
          <div className={styles["account-newsletter-heading"]}>
            {appState?.lang == "en"
              ? "Newsletter Subscriptions"
              : t("Newsletter Subscriptions")}
          </div>
        </div>
        <div className={styles["account-newsletter-content-section"]}>
          <form className={styles["form"]} action="">
            <div className={styles["Checkboxes"]}>
              <div className={styles["Checkbox-1"]}>
                <input
                  type="checkbox"
                  id="All-Subscriptions"
                  name="All-Subscriptions"
                  value="All-Subscriptions"
                />
                <label>
                  {appState?.lang == "en"
                    ? "All Subscriptions"
                    : t("All Subscriptions")}
                </label>
                <br />
              </div>
              <div className={styles["Checkbox-2"]}>
                <input
                  type="checkbox"
                  id="Lazurde-Subscriptions"
                  name="Lazurde-Subscriptions"
                  value="Lazurde-Subscriptions"
                />
                <label>
                  {" "}
                  {appState?.lang == "en"
                    ? "L’azurde Subscriptions"
                    : t("L’azurde Subscriptions")}
                </label>
                <br />
              </div>
              <div className={styles["Checkbox-3"]}>
                <input
                  type="checkbox"
                  id="MissL-Subscriptions"
                  name="MissL-Subscriptions"
                  value="MissL-Subscriptions"
                />
                <label>
                  {appState?.lang == "en"
                    ? "Miss L ‘ Subscriptions"
                    : t("Miss L ‘ Subscriptions")}
                </label>
                <br />
              </div>
              <div className={styles["Checkbox-4"]}>
                <input
                  type="checkbox"
                  id="Kenaz-Subscriptions"
                  name="Kenaz-Subscriptions"
                  value="Kenaz-Subscriptions"
                />
                <label>
                  {appState?.lang == "en"
                    ? "Kenaz Subscriptions"
                    : t("Kenaz Subscriptions")}
                </label>
                <br />
              </div>
              <div className={styles["Checkbox-5"]}>
                <input
                  type="checkbox"
                  id="InStyle-Subscriptions"
                  name="InStyle-Subscriptions"
                  value="InStyle-Subscriptions"
                />
                <label>
                  {appState?.lang == "en"
                    ? "InStyle Subscriptions"
                    : t("InStyle Subscriptions")}
                </label>
                <br />
              </div>
            </div>
            <div
              className={styles["Save-button"]}
              onClick={() => {
                handleAction();
              }}
            >
              {appState?.lang == "en" ? "Save" : t("save")}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsSubscriptions;
