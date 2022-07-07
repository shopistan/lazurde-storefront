import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styles from "./right-side-detail.module.scss";
import WriteAReview from "components/common/reviews/write-review";
import Button from "components/common/ui/button";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import SizeChart from "./size-selection";
import ColorSelection from "./color-selection";
import ButtonATC from "components/common/ui/button-add-to-cart";
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
// import "react-loading-skeleton/dist/skeleton.css";

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
  priceListId?: string;
  setIsloading?: Function;
}

const RightSideDetail = ({
  productSizeArray = [],
  totalRating = 0,
  productData = [],
  fetchingReviews = () => {},
  setIsRatingError = () => {},
  isRatingError = "",
  priceListId = "100000",
  setIsloading = () => {},
}: RightSideDetailProps): JSX.Element => {
  const productDataCopy = useRef(productData).current;
  const allProductPrices = useRef([]);
  const userAuth = useRef("");
  const router = useRouter();
  const { appState } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [quantityCounter, setQuantityCounter] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: -1, index: 0 });
  const [selectedColor, setSelectedColor] = useState({ color: "", index: 0 });
  const [selectedItem, setSelectedItem] = useState(productDataCopy[0]);
  const [productPricing, setProductPricing] = useState<{
    currency: string;
    base: number | string;
    discount: string | number;
    finalPrice: number | string;
  }>();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (productDataCopy?.length < 1) return;

    getProductSku();
  }, [selectedColor]);

  const getPrice = async () => {
    if (!productDataCopy && !productDataCopy[0]?.itemId) return;
    const itemIdArray: number[] = [];
    productDataCopy?.length > 0 &&
      productDataCopy?.map((item: { itemId: number }) => {
        itemIdArray?.push(item.itemId);
      });

    if (itemIdArray[0] === undefined) return;

    const payload = {
      priceList: [priceListId],
      itemId: itemIdArray,
    };
    const response = await fetchProductPriceByItemId(payload);
    if (response && response?.status === 200) {
      allProductPrices.current = response?.data;
    }
    setIsloading(false);
  };

  const getProductSku = async () => {
    if (productDataCopy?.length < 1) return;
    let skuType = "";
    if (selectedSize?.size > -1) skuType = "sizeOnly";

    if (selectedColor?.color)
      skuType = skuType === "sizeOnly" ? "sizeAndColor" : "colorOnly";

    const item = productDataCopy?.find((item: ProductProps) => {
      let selectedSku = false;
      switch (skuType) {
        case "sizeOnly":
          selectedSku = Number(item?.Size) === Number(selectedSize?.size);
          break;
        case "colorOnly":
          selectedSku = item?.Color === selectedColor?.color;
          break;
        case "sizeAndColor":
          selectedSku =
            Number(item?.Size) === Number(selectedSize?.size) &&
            item.Color === selectedColor?.color;
          break;
        default:
          selectedSku = true;
          break;
      }
      return selectedSku;
    });
    
    if (!item) return;
    getSelectedPrice(item || productDataCopy[0]);
    await getProductInventory(item || productDataCopy[0]);
    if (!item.hasOwnProperty("hasStock")) return;
    console.log("something", item);
    setSelectedItem(item || productDataCopy[0]);
    for (let index = 0; index < productDataCopy?.length; index++) {
      if (index === 0) continue;
      if (productDataCopy[index]?.hasOwnProperty("hasStock")) continue;
      const remainigItem = productDataCopy[index];
      await getProductInventory(remainigItem);
    }
    return item;
  };
  console.log("something 2", selectedItem);


  const getSelectedPrice = async (
    selectedProduct: { itemId: number } | any
  ) => {
    if (allProductPrices?.current?.length < 1) {
      allProductPrices.current = [{}];
      await getPrice();
    }

    if (selectedProduct?.length < 1) return;

    const price = allProductPrices?.current?.find(
      (item) => item?.itemId === selectedProduct?.itemId
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

  const getProductInventory = async (product: ProductProps | any) => {
    if (product?.hasOwnProperty("hasStock")) {
      return;
    }
    if (!userAuth.current) {
      userAuth.current = "true";
      const response = await getInventoryAuth();
      userAuth.current = response?.data?.accessToken;
    }
    if (userAuth.current === "true") return;
    // product["hasStock"] = false;
    const id = product?.itemId;
    const itemId = Number(id);
    const inventoryData = await getInventoryByIds(userAuth.current, itemId);
    if (product?.itemId === id) {
      product["hasStock"] =
        inventoryData?.data?.inventory.length > 0 &&
        inventoryData?.data?.inventory[0]?.counters?.["on-hand"] > 0;
    }

    return product;
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

  const handleAddToCart = async () => {
    const selectedProduct: {
      sku?: string;
      itemId?: string;
      Size?: number;
      Color?: string;
    } = (await getProductSku()) || productDataCopy[0];

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
      // alert("error while adding product");
    } else {
      router?.push("/cart");
    }
  };

  const onSizeChange = (val: number) => {
    // getProductSku();
  };

  const onColorChange = (val: number) => {
    // getProductSku();
  };

  return (
    <>
      <div className={styles["detail"]}>
        {selectedItem?.hasStock === false ? (
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
            ? productDataCopy &&
              productDataCopy?.length > 0 &&
              productDataCopy[0]["Product Title"]
            : t("pdpTitle-arabic")}
        </Label>
        <div className={styles["review-section"]}>
          <div className={styles["wishlist-icon"]}>
            <WishList itemId={selectedItem?.itemId} />
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
        productData={productDataCopy}
        productSizeArray={productDataCopy}
        onSizeChange={onSizeChange}
        setSelectedSize={setSelectedSize}
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
      />

      <ColorSelection
        productData={productDataCopy}
        productSizeArray={productDataCopy}
        onColorChange={onColorChange}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <div className={styles["div-cart-buttons"]}>
        <div>
          {selectedItem?.hasStock ? (
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
        isStockAvailable={selectedItem?.hasStock}
        productPricing={productPricing}
      />
      {modalOpen && (
        <WriteAReview
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
          productData={productDataCopy}
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
