import WriteAReview from "components/common/reviews/write-review";
import Button from "components/common/ui/button";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
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
import { fetchProductPriceByItemId } from "lib/utils/product";
import { getInventoryByIds, getInventoryAuth } from "lib/api/inventory";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ProductProps = {
  Size?: number;
  Color?: string;
  sku?: string;
  itemId?: string;
  hasStock?: Boolean;
};
interface RightSideDetailProps {
  onSizeChange?: Function;
  itemId?: string | number;
  productSizeArray?: ProductProps[];
  totalRating?: number;
  onColorChange?: Function;
  productData?: any;
  fetchingReviews?: Function;
  setIsRatingError?: Function;
  isRatingError?: string;
  priceListId?: number;
  setIsloading?: Function;
}

const RightSideDetail = ({
  onSizeChange,
  onColorChange,
  productSizeArray = [],
  totalRating = 0,
  productData = {},
  fetchingReviews = () => {},
  setIsRatingError,
  isRatingError,
  priceListId,
  setIsloading,
}: RightSideDetailProps): JSX.Element => {
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [quantityCounter, setQuantityCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: -1, index: 0 });
  const [selectedColor, setSelectedColor] = useState({ color: "", index: 0 });
  const [selectedItem, setSelectedItem] = useState(productData);

  const [productPricing, setProductPricing] = useState<{
    currency: string;
    base: number | string;
    discount: string | number;
    finalPrice: number | string;
  }>();
  const [allProductPrices, setAllProductPrices] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    const getPrice = async () => {
      if (allProductPrices.length > 0) return;
      if (!productData && !productData?.itemId) return;
      const itemIdArray = [productData?.itemId];
      productData?.children?.length > 0 &&
        productData?.children?.map((item: { itemId: number }) => {
          itemIdArray.push(item.itemId);
        });

      if (itemIdArray[0] === undefined) return;

      const payload = {
        priceList: [priceListId],
        itemId: itemIdArray,
      };
      const response = await fetchProductPriceByItemId(payload);
      if (response && response?.status === 200) {
        setAllProductPrices(response?.data);
      }
      setIsloading(false);
    };
    getPrice();
  }, [productData]);

  useEffect(() => {
    getProductSku();
  }, [productData, selectedColor, selectedSize, allProductPrices]);

  const getSelectedPrice = (selectedProduct: { itemId: number } | any) => {
    if (selectedProduct.length < 1) return;

    const price = allProductPrices.find(
      (item) => item.itemId === selectedProduct.itemId
    );

    if (!price) return;
    const offers = price?.offers;
    const discountArray = offers?.discounts;
    let discountAmount: string = "0";
    if (discountArray?.length > 0) {
      const discountType = discountArray[0].discountType;
      switch (discountType) {
        case "PERCENTAGE":
          discountAmount = `${discountArray[0].value}%`;
          break;

        default:
          break;
      }
    }
    setProductPricing({
      currency: offers?.price?.currency,
      base: offers?.price?.base,
      discount: discountAmount,
      finalPrice: offers?.price?.totalPrice,
    });
  };

  const getProductPricing = () => {
    if (!productPricing) return;
    return (
      <>
        <div className={styles["price-wrapper"]}>
          {productPricing?.base ? (
            <Label
              className={`${styles["base-price"]} ${
                productPricing?.discount !== "0" ? styles["line-through"] : ""
              }`}
            >
              {`${productPricing?.currency === "USD" ? "$" : "SAR"}${
                productPricing?.base && productPricing?.base.toLocaleString()
              }`}
            </Label>
          ) : null}
          {productPricing?.discount !== "0" ? (
            <Label className={styles["discount"]}>
              {`${productPricing?.discount} off`}
            </Label>
          ) : null}
          {productPricing?.finalPrice && productPricing?.discount !== "0" ? (
            <Label className={styles["final-price"]}>
              {`${productPricing?.currency === "USD" ? "$" : "SAR"}${
                productPricing?.finalPrice &&
                productPricing?.finalPrice.toLocaleString()
              }`}
            </Label>
          ) : null}
        </div>
      </>
    );
  };

  const getProductInventory = async (product: ProductProps | any) => {
    if (product.length < 1) return {};
    if (product.hasOwnProperty("hasStock")) {
      return product;
    }
    const userData = await getInventoryAuth();

    const authToken =
      userData?.data?.accessToken ||
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU1Mzg0MTUzLCJleHAiOjE2NTUzODU5NTN9.W3PtK3P0VUST_btUg_vR8gCoAwNUezTw1EpCiYS5VBHqu063Q1eQLUONZsbjIfrxO6X9PlWJi-S2Uxmlvpd302XupGTRatfEfJN4L6RSgFQ_gFbU_DI7HZ5JNXnZ0M92ozvZtzR91gRZ874iujUZJgvKzg6zd_Smnh37SuM2RvU";
    const id = product.itemId;
    const itemId = Number(id);
    const inventoryData = await getInventoryByIds(authToken, itemId);
    if (product.itemId === id) {
      product["hasStock"] =
        inventoryData?.data?.inventory.length > 0 &&
        inventoryData?.data?.inventory[0]?.counters?.["on-hand"] > 0;
    } else {
      product?.children?.map((item: ProductProps) => {
        if (item.itemId === id) {
          item["hasStock"] =
            inventoryData?.data?.inventory.length > 0 &&
            inventoryData?.data?.inventory[0]?.counters?.["on-hand"] > 0;
        }
      });
    }
    return product;
  };

  const handleAddToCart = async () => {
    const selectedProduct: {
      sku?: string;
      itemId?: string;
      Size?: number;
      Color?: string;
    } = getProductSku() || productData;

    const payload: ATCPayload = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items: [
        {
          sku: selectedProduct && selectedProduct?.sku,
          itemId: selectedProduct && selectedProduct?.itemId,
          quantity: quantityCounter,
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
    if (response?.hasError) {
      alert("error while adding product");
    } else {
      router?.push("/cart");
    }
  };

  const getProductSku = async () => {
    let skuType = "";
    if (selectedSize.size > -1) skuType = "sizeOnly";
    if (selectedColor.color)
      skuType = skuType === "sizeOnly" ? "sizeAndColor" : "colorOnly";
    const item = productSizeArray.find((item) => {
      let selectedSku = false;
      switch (skuType) {
        case "sizeOnly":
          selectedSku = Number(item.Size) === Number(selectedSize.size);
          break;
        case "colorOnly":
          selectedSku = item.Color === selectedColor.color;
          break;
        case "sizeAndColor":
          selectedSku =
            Number(item.Size) === Number(selectedSize.size) &&
            item.Color === selectedColor.color;
          break;
        default:
          selectedSku = false;
          break;
      }
      return selectedSku;
    });
    if (!item && productData.length < 1) return;
    getSelectedPrice(item || productData);
    const invenData = await getProductInventory(item || productData);
    const hasStock = invenData ? invenData?.hasStock : productData?.hasStock;
    if (item) {
      item["hasStock"] = hasStock;
    }
    setSelectedItem(item || productData);
    return item;
  };

  return (
    <>
      <div className={styles["detail"]}>
        {!selectedItem.hasStock ? (
          <div className={styles["collection-and-outofstock"]}>
            <Label className={styles["collection-tag"]}>
              <>
                {/* {appState?.lang == "en" ? `Collection` : t("pdpTag-arabic")} */}
              </>
            </Label>
            <Label className={styles["outofstock-tag"]}>
              {appState?.lang == "en" ? `Out of Stock` : t("pdpTag-arabic")}
            </Label>
          </div>
        ) : null}
        <Label className={styles["title"]}>
          {appState.lang == "en"
            ? productData && productData["Product Title"]
            : t("pdpTitle-arabic")}
        </Label>
        <div className={styles["review-section"]}>
          <div className={styles["wishlist-icon"]}>
            <WishList itemId={selectedItem.itemId} />
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
      {getProductPricing()}

      <SizeChart
        productData={productData}
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
        setSelectedSize={setSelectedSize}
        selectedSize={selectedSize}
      />

      <ColorSelection
        productData={productData}
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <div className={styles["div-cart-buttons"]}>
        <div>
          {selectedItem.hasStock ? (
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
        isStockAvailable={selectedItem.hasStock}
        productPricing={productPricing}
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
export default memo(RightSideDetail);
