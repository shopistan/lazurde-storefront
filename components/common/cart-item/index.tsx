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
import Spinner from "../ui/spinner";
import { getInventoryByIds, getInventoryAuth } from "lib/utils/inventory";
interface CartItemObject {
  title: string;
  ["Product Title"]: string;
  ["Image URL"]: string;
  ["Brand"]: string;
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
  userAuth?: string;
  wishListItem?: boolean;
}
const CartItem = ({
  item,
  handleChange,
  updatingCartItem = false,
  removeItem = () => { },
  getCartData,
  userAuth,
  wishListItem = false,
}: CartItemProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  const [updatingItem, setUpdatingItem] = useState(false);
  const [removingItem, setRemovingItem] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [value, setValue] = useState("");
  const [inventoryData, setInventoryData] = useState(100);
  const [showError, setShowError] = useState("");
  // const [removingItem, setRemovingItem]
  const imageSrc = item?.["Image URL"];
  const brandName = item?.["Brand"];

  useEffect(() => {
    const getInventoryData = async () => {
      if (!userAuth) return;
      const authToken =
        userAuth ||
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU1Mzg0MTUzLCJleHAiOjE2NTUzODU5NTN9.W3PtK3P0VUST_btUg_vR8gCoAwNUezTw1EpCiYS5VBHqu063Q1eQLUONZsbjIfrxO6X9PlWJi-S2Uxmlvpd302XupGTRatfEfJN4L6RSgFQ_gFbU_DI7HZ5JNXnZ0M92ozvZtzR91gRZ874iujUZJgvKzg6zd_Smnh37SuM2RvU";
      const itemId = Number(item.itemId);
      const inventoryData = await getInventoryByIds(authToken, itemId);
      setInventoryData(
        inventoryData?.data?.inventory[0]?.counters?.["on-hand"] || 100
      );
    };
    getInventoryData();
  }, [userAuth]);

  useEffect(() => {
    if (!updatingCartItem) {
      // setValue(item?.quantity?.toString());
      setUpdatingItem(false);
      setRemovingItem(false);
      setAddingItem(false);
    }
  }, [updatingCartItem]);

  const handleAddToCart = async (item: CartItemObject) => {
    setAddingItem(true);
  
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
          src={imageSrc || "/public/blue-ring.png"}
          alt=""
          layout="fixed"
        />
        {!wishListItem && (
          <Label
            className={`${styles["cart-image_tag"]} ${styles[
              `${brandName === `Miss L'`
                ? "bg_missl"
                : brandName === "Kenaz"
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
                brandName === "Miss L'"
                  ? missLogo
                  : brandName === "Kenaz"
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
              ? item?.["Product Title"] || "No Title"
              : "مجوهرات الماس تتصدر"}
          </span>
          <span>{`$${item?.totalPrice?.sale?.toLocaleString() ||
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
          <div className={styles["item-quantity"]} key={item?.quantity || 1}>
            <span>
              {appState?.lang === "en" ? "Quantity: " : "كمية "}
              <input
                type="number"
                id="quantity"
                name="quantity"
                max="999"
                defaultValue={item?.quantity}
                // value={value}
                onChange={(e) => {
                  // setValue(e.target.value);
                  if(e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3)
                  setShowError("");
                }}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                onBlur={(e) => {
                  const enteredValue = e.target.value
                  if (!inventoryData) return
                  if (Number(enteredValue || 1) >= Number(item?.quantity) && Number(inventoryData || 1) <= Number(item?.quantity)) {
                    e.target.value = inventoryData?.toString()
                    setShowError(item?.itemId?.toString());
                    return
                  }
                  if (Number(enteredValue || 1) === Number(item?.quantity)) { return }
                  if (
                    Number(enteredValue) > Number(inventoryData)
                  ) {
                    e.target.value = inventoryData?.toString()
                    // setValue(inventoryData.toString());
                    setShowError(item?.itemId?.toString());
                    setUpdatingItem(true);
                    handleChange(Number(inventoryData), item);
                    return;
                  }
                  setUpdatingItem(true);
                  handleChange(Number(enteredValue), item);
                }}
                disabled={updatingItem}
              />
            </span>
            {showError === item?.itemId?.toString() ? (
              <div>
                <span style={{ color: "red", fontSize: "13px" }}>
                  Can not exceed stock quantity
                </span>
              </div>
            ) : null}
          </div>
        )}
        <div className={styles["remove-btn"]}>
          {addingItem || removingItem ? (
            <Spinner width={12} height={12} stroke={2} />
          ) : (
            <CrossSmall width={12} height={12} />
          )}
          <button
            onClick={() => {
              setRemovingItem(true);
              removeItem(item);
            }}
            disabled={addingItem || removingItem}
          >
            {addingItem ? (
              appState?.lang === "en"
                ? "Adding..."
                : "جارٍ الإزالة…"
            ) : (
              appState?.lang === "en"
                ? removingItem
                  ? "Removing..."
                  : "Remove"
                : removingItem
                  ? "جارٍ الإزالة…"
                  : "إزالة"
            )}
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
