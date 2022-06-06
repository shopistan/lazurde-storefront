import React from "react";
import Image from "next/image";
import Label from "../ui/label";
import { orderData } from "lib/mock-data/data";
import Button from "../ui/button";
import Link from "next/link";
import styles from "./order-details.module.scss";
import { ordeFormatDate } from "lib/utils/common";

const OrderDetails = ({}) => {
  const date = new Date();
  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-main"]}>
        <Image src={"/order.png"} width={13.75} height={15.28} />
        <Label className={styles["order-heading"]}>My Orders</Label>
        {orderData.orders.length > 0 && (
          <Label className={styles["order-text"]}>
            {`Displaying ${orderData.orders.length}  Orders`}
          </Label>
        )}
      </div>
      <div className={styles["order-section"]}>
        {orderData?.orders &&
          orderData?.orders.length > 0 &&
          orderData?.orders?.map((order, index) => {
            console.log("order", order);
            return (
              <>
                <div className={styles["order-details"]}>
                  <div className={styles["order-delivery"]}>
                    <div>
                      <Label className={styles["order-sent"]}>
                        We’ve Sent It!
                      </Label>
                      <Label className={styles["delivery-estimate"]}>
                        {`Estimated Delivery ${ordeFormatDate(
                          orderData?.orders[index]?.createdAt
                        )}`}
                      </Label>
                    </div>
                    <div>
                      <Button>{`Track Parcel ${index + 1}`}</Button>
                    </div>
                  </div>
                  <div className={styles["order-image"]}>
                    {<Image src={"/small-ring.png"} width={100} height={100} />}
                  </div>
                </div>
                <div className={styles["order-history"]}>
                  <div>
                    <div className={styles["order-date"]}>
                      <Image src={"/calendar.png"} width={18} height={18} />
                      <p className={styles["order-date-text"]}>
                        Order Date:{" "}
                        <span>{orderData?.orders[index]?.createdAt}</span>
                      </p>
                    </div>
                    <div className={styles["order-date"]}>
                      <Image src={"/calendar.png"} width={18} height={18} />
                      <p className={styles["order-number-text"]}>
                        Order Number:{" "}
                        <span> {orderData?.orders[index]?.orderId}</span>
                      </p>
                    </div>
                    <div className={styles["order-date"]}>
                      <Image src={"/calendar.png"} width={18} height={18} />
                      <Link href={"/"}>
                        <a className={styles["order-link"]}>
                          View Digital Receipt & Warranty
                        </a>
                      </Link>
                    </div>
                  </div>
                  <Button>View Order</Button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};
export default OrderDetails;
