import React, { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
interface newsSubscriptionsProps {}

const NewsSubscriptions = (): JSX.Element => {
  const [renderCom, setRenderCom] = useState(false);
  useEffect(() => {
    setRenderCom(true);
  }, []);

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
            Newsletter Subscriptions
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
                <label> All Subscriptions</label>
                <br />
              </div>
              <div className={styles["Checkbox-2"]}>
                <input
                  type="checkbox"
                  id="Lazurde-Subscriptions"
                  name="Lazurde-Subscriptions"
                  value="Lazurde-Subscriptions"
                />
                <label> L’azurde Subscriptions</label>
                <br />
              </div>
              <div className={styles["Checkbox-3"]}>
                <input
                  type="checkbox"
                  id="MissL-Subscriptions"
                  name="MissL-Subscriptions"
                  value="MissL-Subscriptions"
                />
                <label>Miss L ‘ Subscriptions</label>
                <br />
              </div>
              <div className={styles["Checkbox-4"]}>
                <input
                  type="checkbox"
                  id="Kenaz-Subscriptions"
                  name="Kenaz-Subscriptions"
                  value="Kenaz-Subscriptions"
                />
                <label>Kenaz Subscriptions</label>
                <br />
              </div>
              <div className={styles["Checkbox-5"]}>
                <input
                  type="checkbox"
                  id="InStyle-Subscriptions"
                  name="InStyle-Subscriptions"
                  value="InStyle-Subscriptions"
                />
                <label> InStyle Subscriptions</label>
                <br />
              </div>
            </div>
            <div className={styles["Save-button"]}>
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsSubscriptions;
