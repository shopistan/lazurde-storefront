import React, { useEffect } from "react";
import styles from "../right-side-detail.module.scss";
import Label from "components/common/ui/label";
import Image from "next/image";
import { CrossSmall, TabbyIcon } from "components/icons";
import Link from "next/link";
import { slashFormatDate } from "lib/utils/common";

interface SubDetailProps {
  isStockAvailable?: boolean;
}

const SubDetail = ({ isStockAvailable }: SubDetailProps): JSX.Element => {
  const date = new Date();

  return (
    <>
      <div
        className={`${styles["sub-detail-wrapper"]} ${
          !isStockAvailable ? "" : styles["product-not-available-wrapper"]
        }`}
      >
        {!isStockAvailable ? (
          <>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/icon1.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>As low as $75/mo with</Label>
              <Link href="https://docs.tabby.ai/#section/Promo-Messages">
                <a className={styles["label-link"]}>
                  <TabbyIcon />
                </a>
              </Link>
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
                  {`Expected Delivery: ${slashFormatDate(
                    date
                  )} - ${slashFormatDate(date?.setDate(date?.getDate() + 2))}`}
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
              <Label className={styles["label"]}>Click and collect </Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/available.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>Available</Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/return.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>30 day return</Label>
            </div>
            <div className={styles["sub-detail-point"]}>
              <Image
                src="/icons/question.svg"
                width={20}
                height={20}
                layout="fixed"
                alt="tabby"
              />
              <Label className={styles["label"]}>Have a question?</Label>
              <Link href="/contact-us">
                <a className={styles["label-link"]}>Have a question?</a>
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
                The product is currently unavailable. Please call client care
                for more information
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
              <Label className={styles["label"]}>Have a question?</Label>
              <Link href="/contact-us">
                <a className={styles["label-link"]}>Have a question?</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SubDetail;
