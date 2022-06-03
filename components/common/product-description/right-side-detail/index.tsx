import WriteAReview from "components/common/reviews/write-review";
import Button from "components/common/ui/button";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { Heart } from "components/icons";
import React, { useState } from "react";
// import ProductColorSelection from "../color-selection";
import SizeChart from "./size-selection";
import ColorSelection from "./color-selection";
import ButtonATC from "components/common/ui/button-add-to-cart";
import styles from "./right-side-detail.module.scss";
import SubDetail from "./sub-detail";
import WishList from "components/common/wishlist";
import NotifyMeModal from "./notify-me-modal";

interface RightSideDetailProps {
  onSizeChange?: Function;
  itemId?: string | number;
  productSizeArray?: { Size?: string; Color?: string }[];
  totalRating?: number;
  onColorChange?: Function;
  currency?: string;
  basePrice?: number | string;
  discount?: string | number;
  finalPrice?: number | string;
  productData?: any;
}

const RightSideDetail = ({
  onSizeChange,
  onColorChange,
  productSizeArray = [],
  itemId = "",
  totalRating = 0,
  currency = "USD",
  basePrice = 0,
  discount = 0 || "",
  finalPrice = 0,
  productData = {},
}: RightSideDetailProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [isStockAvailable, setIsStockAvailable] = useState(false);

  const productPricing = () => {
    return (
      <>
        <div className={styles["price-wrapper"]}>
          {basePrice ? (
            <Label
              className={`${styles["base-price"]} ${
                discount ? styles["line-through"] : ""
              }`}
            >
              {`${currency === "USD" ? "$" : "SAR"}${
                basePrice && basePrice.toLocaleString()
              }`}
            </Label>
          ) : (
            ""
          )}
          {discount ? (
            <Label className={styles["discount"]}>
              {`${discount?.toLocaleString()}% off`}
            </Label>
          ) : (
            ""
          )}
          {finalPrice ? (
            <Label className={styles["final-price"]}>
              {`${currency === "USD" ? "$" : "SAR"}${
                finalPrice && finalPrice.toLocaleString()
              }`}
            </Label>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles["detail"]}>
        <Label className={styles["collection-tag"]}>Collection</Label>
        <Label className={styles["title"]}>Tiffany T Diamond Gold Ring</Label>
        <div className={styles["review-section"]}>
          <div className={styles["wishlist-icon"]}>
            <WishList itemID={itemId} />
          </div>
          <div className={styles["rating-stars"]}>
            <StarRating count={5} rating={totalRating} />
          </div>
          <div className={styles["write-review-btn"]}>
            <Button
              onClick={() => setModalOpen(true)}
              className={styles["btn"]}
            >
              write a review
            </Button>
          </div>
        </div>
      </div>
      {productPricing()}
      <SizeChart
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
      <ColorSelection
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
      />
      <div className={styles["div-cart-buttons"]}>
        <div>
          {!isStockAvailable ? (
            <ButtonATC
              buttonSize={"xxxl"}
              buttonText={"Add To Cart"}
              showCounter={true}
            />
          ) : (
            <Button
              className={styles["book-apt-btn"]}
              buttonSize={"xxxl"}
              buttonText={"Notify me when available"}
              buttonStyle="black"
              onClick={() => {
                setNotifyModalOpen(true);
              }}
            ></Button>
          )}
        </div>
        <Button
          className={styles["book-apt-btn"]}
          buttonSize={"xxxl"}
          buttonText={"Book An Appointment"}
          buttonStyle="white"
        ></Button>
      </div>
      <SubDetail isStockAvailable={isStockAvailable} />
      {modalOpen && (
        <WriteAReview
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
          productData={productData}
        />
      )}
      {notifyModalOpen && (
        <NotifyMeModal
          isOpened={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
        />
      )}
    </>
  );
};
export default RightSideDetail;
