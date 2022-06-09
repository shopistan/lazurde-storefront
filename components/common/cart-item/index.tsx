import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import styles from "./cart-item.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize, mobileScreenSize } from "lib/utils/common";
import { Bag, CrossSmall } from "components/icons";
import { AppContext } from "lib/context";
import Label from "components/common/ui/label";
import lazurdeLogo from "/public/lazurdeLogo.png";
import missLogo from "/public/missLogo.png";
import kenazLogo from "/public/kenazLogo.png";
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
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  const [updatingItem, setUpdatingItem] = useState(false);
  const [removingItem, setRemovingItem] = useState(false);
  const [value, setValue] = useState(item?.quantity);
  // const [removingItem, setRemovingItem]
  const imageSrc = item?.attributes?.find((attr) => attr?.mapping === "image");
  const brandName = item?.attributes?.find((attr) => attr?.name === "Brand");

  useEffect(() => {
    if (!updatingCartItem) {
      setUpdatingItem(false);
      setRemovingItem(false);
    }
  }, [updatingCartItem]);

  return (
    <div className={styles["cart-item-wrapper"]}>
      <div className={styles["cart-image"]}>
        <Image
          width={width < desktopScreenSize ? "100px" : "146px"}
          height={width < desktopScreenSize ? "100px" : "146px"}
          src={imageSrc?.value || "/public/blue-ring.png"}
          alt=""
          layout="fixed"
        />
        {!wishListItem && (
          <Label
            className={`${styles["cart-image_tag"]} ${
              styles[
                `${
                  brandName?.value === `Miss L'`
                    ? "bg_missl"
                    : brandName?.value === "Kenaz"
                    ? "bg_kenaz"
                    : "bg_lazurde"
                }`
              ]
            }`}
          >
            <Image
              width={"62px"}
              height={"8px"}
              src={
                brandName?.value === "Miss L'"
                  ? missLogo
                  : brandName?.value === "Kenaz"
                  ? kenazLogo
                  : lazurdeLogo
              }
              alt=""
              layout="fixed"
            />
          </Label>
        )}
      </div>
      <div className={styles["item-details"]}>
        <div className={styles["item-title"]}>
          <span>
            {appState?.lang === "en"
              ? item?.title ||
                item?.attributes?.find((attr) => attr?.mapping === "title")
                  ?.value ||
                "No Title"
              : "مجوهرات الماس تتصدر"}
          </span>
          <span>{`$${
            item?.totalPrice?.amount?.toLocaleString() ||
            "0.00"?.toLocaleString()
          }`}</span>
        </div>
        {/* {width > mobileScreenSize && (
          <div className={styles["item-category"]}>
            <span>{appState?.lang === "en" ? "Rings" : "خواتم"}</span>
          </div>
        )} */}
        {!wishListItem && (
          <div className={styles["item-quantity"]}>
            <span>
              {appState?.lang === "en" ? "Quantity: " : "كمية "}
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="500"
                defaultValue={item?.quantity}
                value={value}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    handleChange(e, item);
                    setUpdatingItem(true);
                    setValue(e.target.value);
                  }
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
            {appState?.lang === "en"
              ? removingItem
                ? "Removing..."
                : "Remove"
              : removingItem
              ? "جارٍ الإزالة…"
              : "إزالة"}
          </button>
        </div>
        {wishListItem && (
          <div className={styles["add-to-bag-btn"]}>
            <Bag fill="#000000" stroke="#000000" />
            <button
              onClick={() => {
                setRemovingItem(true);
                removeItem(item);
              }}
            >
              {appState?.lang === "en" ? "Add to Bag" : "أضف الى الحقيبة"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
