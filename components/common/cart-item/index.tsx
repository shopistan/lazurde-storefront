import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./cart-item.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize, mobileScreenSize } from "lib/utils/common";
import { Bag, CrossSmall } from "components/icons";

interface CartItemObject {
  title: string;
  ["Image URL"]: string;
  quantity: string;
  lineItemId: number;
  itemId: string;
  cartId: string;
  totalPrice: {
    amount: number;
    currency: string;
  };
  attributes: Array<{
    mapping: string;
    name: string;
    value: string;
  }>;
}
interface CartItemProps {
  item: CartItemObject;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: CartItemObject
  ) => void;
  updatingCartItem?: boolean;
  removeItem?: (item: CartItemObject) => void;
  wishListItem?: boolean;
}
const CartItem = ({
  item,
  handleChange,
  updatingCartItem = false,
  removeItem = () => {},
  wishListItem = false,
}: CartItemProps): JSX.Element => {
  const [width] = useWindowSize();
  const [updatingItem, setUpdatingItem] = useState(false);
  const [removingItem, setRemovingItem] = useState(false);
  // const [removingItem, setRemovingItem]
  const imageSrc = item?.attributes?.find((attr) => attr?.mapping === "image");

  useEffect(() => {
    if (!updatingCartItem) {
      setUpdatingItem(false);
      setRemovingItem(false);
    }
  }, [updatingCartItem]);

  return (
    <div className={styles["cart-item-wrapper"]}>
      <Image
        width={width > mobileScreenSize ? "146px" : "100px"}
        height={width > mobileScreenSize ? "146px" : "100px"}
        src={imageSrc?.value || "/public/blue-ring.png"}
        alt=""
      />
      <div className={styles["item-details"]}>
        <div className={styles["item-title"]}>
          <span>
            {item?.title ||
              item?.attributes?.find((attr) => attr?.mapping === "title")
                ?.value ||
              "No Title"}
          </span>
          <span>{`$${
            item?.totalPrice?.amount?.toLocaleString() ||
            "0.00"?.toLocaleString()
          }`}</span>
        </div>
        {width > mobileScreenSize && (
          <div className={styles["item-category"]}>
            <span>Rings</span>
          </div>
        )}
        {!wishListItem && (
          <div className={styles["item-quantity"]}>
            <span>
              Quantity:{" "}
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="500"
                defaultValue={item?.quantity}
                onChange={(e) => {
                  handleChange(e, item);
                  setUpdatingItem(true);
                }}
                disabled={updatingItem}
              />
            </span>
          </div>
        )}
        <div className={styles["remove-btn"]}>
          <CrossSmall width={12} height={12} />
          <button
            onClick={() => {
              setRemovingItem(true);
              removeItem(item);
            }}
          >
            {removingItem ? "Removing..." : "Remove"}
          </button>
        </div>
        {wishListItem && (
          <div className={styles["add-to-bag-btn"]}>
            <Bag fill="#000000" stroke="#000000"/>
            <button
              onClick={() => {
                setRemovingItem(true);
                removeItem(item);
              }}
            >
              {"Add to Bag"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
