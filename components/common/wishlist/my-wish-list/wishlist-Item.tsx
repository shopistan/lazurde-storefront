/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { Bag, CrossSmall } from "components/icons";

interface WishListItemsProps {
  item?: any;
  appState: any;
  removeWishListItem: Function;
  handleAddToBag: Function;
  renderSpinner: Function;
  adding: Boolean;
}

const WishListItems = ({
  item,
  appState,
  removeWishListItem,
  handleAddToBag,
  renderSpinner,
  adding,
}: WishListItemsProps) => {
  const [removingItem, setRemovingItem] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const imageSrc = item?.["Image URL"];
  return (
    <>
      <div className={styles["account-wishlist-main"]}>
        <div className={styles["cart-item-wrapper"]}>
          <div className={styles["cart-image"]}>
            <Image
              width={100}
              height={100}
              src={imageSrc || "/blue-ring.png"}
              alt=""
              layout="fixed"
            />
          </div>
          <div className={styles["item-details"]}>
            <div className={styles["item-title"]}>
              <span data-testid="heading">
                {appState?.lang === "en"
                  ? item?.["Product Title"] || "No Title"
                  : "مجوهرات الماس تتصدر"}
              </span>
              <span>{`$${
                item?.totalPrice?.sale?.toLocaleString() ||
                item?.totalPrice?.amount?.toLocaleString() ||
                "0.00"?.toLocaleString()
              }`}</span>
            </div>
            <div className={styles["item-buttons"]}>
              {item?.isLocation === "true" && (
                <div data-testid="btn" className={styles["add-to-bag-btn"]}>
                  {addingItem || adding ? (
                    renderSpinner()
                  ) : (
                    <Bag
                      fill="#000000"
                      stroke="#000000"
                      width="16px"
                      height="16px"
                    />
                  )}
                  <button
                    onClick={() => {
                      setAddingItem(true);
                      handleAddToBag(item);
                    }}
                    disabled={addingItem}
                  >
                    {appState?.lang === "en"
                      ? addingItem || adding
                        ? "Adding..."
                        : "Add to Bag"
                      : addingItem
                      ? "جارٍ الإضافة ..."
                      : "أضف الى الحقيبة"}
                  </button>
                </div>
              )}

              <div data-testid="removebtn" className={styles["remove-btn"]}>
                {removingItem ? (
                  renderSpinner()
                ) : (
                  <CrossSmall width={12} height={12} />
                )}
                <button
                  onClick={() => {
                    setRemovingItem(true);
                    removeWishListItem(item);
                  }}
                  disabled={removingItem}
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
            </div>
          </div>
        </div>
        {item?.isLocation === "false" && (
          <div className={styles["error-notice"]}>
            <Image width={20} height={20} src={"/help.png"} alt="" />
            <p>
              {appState?.lang === "en"
                ? `This product is not available in your region`
                : `هذا المنتج غير متوفر في منطقتك`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default WishListItems;
