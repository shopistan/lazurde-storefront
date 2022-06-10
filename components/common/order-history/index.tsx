import React from "react";
import Label from "../ui/label";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";
import styles from "./order-history.module.scss";

const OrderHistory = ({}) => {
  return (
    <div className={styles["history-container"]}>
      <div className={styles["history-first"]}>
        <Image src={"/order.png"} width={13.75} height={15.28} />
        <Label className={styles["history-first-title"]}>Order Details</Label>
        <Label className={styles["history-first-text"]}>
          Thanks for your order! Check out the details below.
        </Label>
      </div>
      <div className={styles["history-second"]}>
        <div className={styles["history-second-first"]}>
          <div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <Label>Order No:</Label>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <Label>Order Date:</Label>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <Label>View Digital Receipt & Warranty</Label>
            </div>
          </div>
          <div>
            <Image src={"/barcode.svg"} width={160} height={160} />
          </div>
        </div>
        <Button>Return Order</Button>
      </div>
      <div className={styles["history-third"]}>
        <Label className={styles["history-third-title"]}>
          Ready for Collection
        </Label>
        <Label className={styles["history-third-text"]}>
          <>
            L’azurde #5234 2976 <br /> Al Imam Saud Ibn Abdul Aziz Branch Rd{" "}
            <br /> Al Nakheel Mall, Riyadh 12483, Saudi Arabia
          </>
        </Label>
      </div>
    </div>
  );
};
export default OrderHistory;
