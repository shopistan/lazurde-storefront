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
import { addProductToCart } from "lib/utils/cart";
import { ATCPayload } from "lib/types/cart";
interface CartItemObject {
  title: string;
  ["Image URL"]: string;
  quantity: string;
  lineItemId: number;
  itemId: string;
  cartId: string;
  totalPrice: {
    amount: number;
    sale: number;
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
    // event: React.ChangeEvent<HTMLInputElement>,
    value: number,
    item: CartItemObject
  ) => void;
  updatingCartItem?: boolean;
  removeItem?: (item: CartItemObject) => void;
  getCartData?: Function;
  wishListItem?: boolean;
}
const CartItem = ({
  item,
  handleChange,
  updatingCartItem = false,
  removeItem = () => {},
  getCartData,
  wishListItem = false,
}: CartItemProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  const [updatingItem, setUpdatingItem] = useState(false);
  const [removingItem, setRemovingItem] = useState(false);
  const [value, setValue] = useState("");
  // const [removingItem, setRemovingItem]
  const imageSrc = item?.attributes?.find((attr) => attr?.mapping === "image");
  const brandName = item?.attributes?.find((attr) => attr?.name === "Brand");

  useEffect(() => {
    if (!updatingCartItem) {
      setValue(item?.quantity?.toString());
      setUpdatingItem(false);
      setRemovingItem(false);
    }
  }, [updatingCartItem]);

  const handleAddToCart = async (item: CartItemObject) => {
    setRemovingItem(true);

    const selectedProduct: {
      sku?: string;
      itemId?: string;
      Size?: number;
      Color?: string;
    } = item;

    const productPricing = {
      currency: "0",
      base: 0,
      finalPrice: 0,
    };

    const payload: ATCPayload = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items: [
        {
          sku: selectedProduct && selectedProduct?.sku,
          itemId: selectedProduct && selectedProduct?.itemId,
          quantity: 1,
          priceListId: "100000",
          price: {
            currency: productPricing?.currency,
            amount: productPricing?.base,
            discount: {
              discountAmount: productPricing?.finalPrice,
            },
          },
        },
      ],
    };
    const response = await addProductToCart(payload);
    if (response) {
      getCartData && getCartData();
      removeItem(item);
    }
  };

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
              height={"11px"}
              quality={100}
              src={
                brandName?.value === "Miss L'"
                  ? missLogo
                  : brandName?.value === "Kenaz"
                  ? kenazLogo
                  : lazurdeLogo
              }
              alt=""
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
            item?.totalPrice?.sale?.toLocaleString() ||
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
                defaultValue={item?.quantity}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                onBlur={() => {
                  if (Number(value || 1) !== Number(item?.quantity)) {
                    setUpdatingItem(true);
                    handleChange(Number(value), item);
                  } else setValue(item?.quantity);
                }}
                disabled={updatingItem}
              />
            </span>
            {/* <div>
              <span>Error While updating quanitity!</span>
            </div> */}
          </div>
        )}
        <div className={styles["remove-btn"]}>
          <CrossSmall width={12} height={12}/>
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
            <Bag fill="#000000" stroke="#000000" width="12px" height="16px" />
            <button
              onClick={() => {
                handleAddToCart(item);
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
