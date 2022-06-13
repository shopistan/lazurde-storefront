import WriteAReview from "components/common/reviews/write-review";
import Button from "components/common/ui/button";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { Heart } from "components/icons";
import React, { useState, useContext } from "react";
// import ProductColorSelection from "../color-selection";
import SizeChart from "./size-selection";
import ColorSelection from "./color-selection";
import ButtonATC from "components/common/ui/button-add-to-cart";
import styles from "./right-side-detail.module.scss";
import SubDetail from "./sub-detail";
import WishList from "components/common/wishlist";
import NotifyMeModal from "./notify-me-modal";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";
import { addProductToCart } from "lib/utils/cart";
import { ATCPayload } from "lib/types/cart";
import { useRouter } from "next/router";

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
  fetchingReviews?: Function;
  setIsRatingError?: Function;
  isRatingError?: string;
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
  fetchingReviews = () => {},
  setIsRatingError,
  isRatingError,
}: RightSideDetailProps): JSX.Element => {
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [isStockAvailable, setIsStockAvailable] = useState(
    productData?.sku === "TestItemStock"
  );
  const [quantityCounter, setQuantityCounter] = useState(1);
  const { t } = useTranslation("common");

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

  const handleAddToCart = async () => {
    const payload: ATCPayload = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items: [
        {
          sku: productData && productData?.sku,
          itemId: productData && productData?.itemId,
          quantity: quantityCounter,
          priceListId: "100000",
          price: {
            currency: currency,
            amount: basePrice,
            discount: {
              discountAmount: finalPrice,
            },
          },
        },
      ],
    };
    const response = await addProductToCart(payload);
    if (response?.hasError) {
      alert("error while adding product");
    } else {
      // router?.push("/cart");
    }
  };

  return (
    <>
      <div className={styles["detail"]}>
        <div className={styles["collection-and-outofstock"]}>
          <Label className={styles["collection-tag"]}>
            <>
              {/* {appState?.lang == "en" ? `Collection` : t("pdpTag-arabic")} */}
            </>
          </Label>
          {isStockAvailable ? (
            <Label className={styles["outofstock-tag"]}>
              {appState?.lang == "en" ? `Out of Stock` : t("pdpTag-arabic")}
            </Label>
          ) : null}
        </div>
        <Label className={styles["title"]}>
          {appState.lang == "en"
            ? productData && productData["Product Title"]
            : t("pdpTitle-arabic")}
        </Label>
        <div className={styles["review-section"]}>
          <div className={styles["wishlist-icon"]}>
            <WishList itemID={productData && productData["itemId"]} />
          </div>
          <div className={styles["rating-stars"]}>
            <StarRating
              count={5}
              rating={totalRating}
              pointerEventsNone={true}
            />
          </div>
          <div className={styles["write-review-btn"]}>
            <Button
              onClick={() => setModalOpen(true)}
              className={styles["btn"]}
            >
              {appState.lang == "en" ? "write a review" : t("pdpButton-arabic")}
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
              onClick={() => {
                handleAddToCart();
              }}
              buttonSize={"fill"}
              buttonText={
                appState.lang == "en"
                  ? "Add To Cart"
                  : t("addCartButton-arabic")
              }
              showCounter={true}
              quantityCounter={quantityCounter}
              setQuantityCounter={setQuantityCounter}
            />
          ) : (
            <Button
              className={styles["book-apt-btn"]}
              buttonSize={"fill"}
              buttonText={
                appState.lang == "en"
                  ? "Notify me when available"
                  : t("notifyButton-arabic")
              }
              buttonStyle="black"
              onClick={() => {
                setNotifyModalOpen(true);
              }}
            ></Button>
          )}
        </div>
        {/* <Button
          className={styles["book-apt-btn"]}
          buttonSize={"fill"}
          buttonText={
            appState.lang == "en"
              ? "Book An Appointment"
              : t("appointmentButton-arabic")
          }
          buttonStyle="white"
        ></Button> */}
      </div>
      <SubDetail
        isStockAvailable={isStockAvailable}
        productData={productData}
      />
      {modalOpen && (
        <WriteAReview
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
          productData={productData}
          fetchingReviews={fetchingReviews}
          setIsRatingError={setIsRatingError}
          isRatingError={isRatingError}
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
