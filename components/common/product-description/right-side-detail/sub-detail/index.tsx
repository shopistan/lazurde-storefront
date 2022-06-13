import React, { useEffect, useContext } from "react";
import styles from "../right-side-detail.module.scss";
import Label from "components/common/ui/label";
import Image from "next/image";
import { CrossSmall, TabbyIcon } from "components/icons";
import Link from "next/link";
import { slashFormatDate } from "lib/utils/common";
import TabbyModal from "components/common/tabby-popup";
import TamaraModal from "components/common/tamara-popup";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface SubDetailProps {
  isStockAvailable?: boolean;
  productPricing?: any;
}

const SubDetail = ({
  isStockAvailable,
  productPricing = {},
}: SubDetailProps): JSX.Element => {
  const date = new Date();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`${styles["sub-detail-wrapper"]} ${
          !isStockAvailable ? "" : styles["product-not-available-wrapper"]
        }`}
      >
        {!isStockAvailable ? (
          <>
            <div
              className={styles["sub-detail-point"]}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "3px",
              }}
            >
              <TabbyModal productPricing={productPricing}/>
              <TamaraModal productPricing={productPricing}/>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/delivery.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              {date && (
                <Label className={styles["label"]}>
                  {`${
                    appState.lang == "en"
                      ? "Expected Delivery"
                      : t("delivery-arabic")
                  }: ${slashFormatDate(date)} - ${slashFormatDate(
                    date?.setDate(date?.getDate() + 2)
                  )}`}
                </Label>
              )}
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/click-collect-icon.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>
                {appState.lang == "en"
                  ? "Click and collect "
                  : t("Click and collect")}
              </Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/available.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>
                {appState.lang == "en" ? "Available" : t("Available")}
              </Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/return.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>
                {appState.lang == "en" ? "30 day return" : t("30 day return")}
              </Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/question.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>
                {appState.lang == "en"
                  ? "Have a question?"
                  : t("Have a question?")}
              </Label>
              <Link href="/contact-us">
                <a className={styles["label-link"]}>
                  {appState.lang == "en"
                    ? "Ask an Expert"
                    : t("Have a question?")}
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles["product-not-available"]}>
              <div className={styles["cross-btn"]}>
                <CrossSmall width={"12px"} height={"12px"} />
              </div>
              <Label className={styles["label"]}>
                {appState.lang == "en"
                  ? " The product is currently unavailable. Please call client care for more information"
                  : t("unavailable-arabic")}
              </Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/question.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>
                {appState.lang == "en"
                  ? "Have a question?"
                  : t("Have a question?")}
              </Label>
              <Link href="/contact-us">
                <a className={styles["label-link"]}>
                  {appState.lang == "en"
                    ? "Have a question?"
                    : t("Have a question?")}
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SubDetail;
