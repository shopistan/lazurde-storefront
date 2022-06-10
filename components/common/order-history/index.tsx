import React, { FC } from "react";
import Label from "../ui/label";
import Image from "next/image";
import Button from "../ui/button";
import Link from "next/link";
import styles from "./order-history.module.scss";
import { updateOrderDate, ordeFormatDate } from "lib/utils/common";

interface OrderHistoryProps {
  order?: any;
}

const OrderHistory: FC<OrderHistoryProps> = ({ order }) => {
  console.log("order", order);

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
              <Label>
                <>Order No: {order.orderId}</>
              </Label>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <p>Order Date: {updateOrderDate(order.updatedAt)}</p>
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
      <div className={styles["history-forth"]}>
        <div>
          <div className={styles["history-forth-first"]}>
            <Label className={styles["history-forth-title"]}>
              Click & Collect Order
            </Label>
            <p className={styles["history-forth-text"]}>
              {order.items.length} Items
            </p>
          </div>
          <div>
            <p className={styles["history-forth-description"]}>
              Estimated Collection: {ordeFormatDate(order.updatedAt)}
            </p>
          </div>
        </div>
        <div className={styles["history-forth-second"]}>
          {order.items &&
            order.items.length > 0 &&
            order.items.map((object: any, index: any) => {
              return (
                <div key={index}>
                  <div>
                    <Image src={"/small-ring.png"} width={100} height={100} />
                  </div>
                  <div>
                    <p>{object.title}</p>
                    <p>${object.price}</p>
                    <p>Quantity: {object.quantity}</p>
                    <p>Size: {object.price}</p>
                    <p>Color: {object.price}</p>
                    <p>Style Number: {object.sku}</p>
                    <p>Order Date: {updateOrderDate(order.updatedAt)}</p>
                    <p>{order.status}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles["history-fifth"]}>
        <p className={styles["history-fifth-title"]}>Payment Details</p>
        {order.payments &&
          order.payments.length > 0 &&
          order.payments.map((object: any, index: any) => {
            return (
              <div className={styles["history-fifth-second"]}>
                <p>{object.cardHolder}</p>
                <p>{object.cardNumber}</p>
                <p>{object.expiryDate}</p>
                <p>{object.paymentMethod}</p>
              </div>
            );
          })}
      </div>
      {order.items &&
        order.items.length > 0 &&
        order.items.map((object: any, index: any) => {
          return (
            <>
              <div className={styles["history-six"]}>
                <p className={styles["history-six-first"]}>Order Total</p>
                <div>
                  <div
                    className={`${styles["history-flex"]} ${styles["history-price"]}`}
                  >
                    <p>Sub-Total:</p>
                    <p>${object.price.toFixed(2)}</p>
                  </div>
                  <div
                    className={`${styles["history-flex"]} ${styles["discount-price"]}`}
                  >
                    <p>Discount:</p>
                    <p>${object.discount.toFixed(2)}</p>
                  </div>
                </div>
                <div className={styles["history-flex"]}>
                  <p className={styles["history-six-first"]}>Total:</p>
                  <p className={styles["history-six-first"]}>
                    ${(object.price - object.discount).toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};
export default OrderHistory;
