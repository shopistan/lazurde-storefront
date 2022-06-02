import { ImageType } from "lib/types/common";
import Image from "next/image";
import React from "react";
import styles from "./cart-item.module.scss";

interface CartItemObject {
  title: string;
  ["Image URL"]: string;
}
interface CartItemProps {
  item: CartItemObject;
}
const CartItem = ({ item }: CartItemProps): JSX.Element => {
  return (
    <div className={styles["cart-item-wrapper"]}>
      <Image width={146} height={146} src={item["Image URL"]} alt="" />
      <div className={styles["item-details"]}>
        <div className={styles["item-title"]}>
          <span>{item?.title}</span>
          <span>$1,200.00</span>
        </div>
        <div className={styles["item-category"]}>
          <span>Rings</span>
        </div>
        <div className={styles["item-quantity"]}>
          <span>Quantity: 1</span>
        </div>
        <div className={styles["remove-btn"]}>
          <Image
            src="/public/icons/cross-icon.png"
            alt=""
            height="12px"
            width="12px"
          />
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
