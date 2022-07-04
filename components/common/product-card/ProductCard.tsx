import React, { useState, useContext } from "react";
import { Heart } from "components/icons";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "lib/utils/useWindowSize";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import Label from "components/common/ui/label";
import Slider from "components/common/ui/slider/slider";
import Button from "components/common/ui/button";
import { ImageType } from "lib/types/common";
import { AppContext } from "lib/context";
import { addProductToCart } from "lib/utils/cart";
import { ATCPayload } from "lib/types/cart";
import { checkMediaType, desktopScreenSize } from "lib/utils/common";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { fetchProductPriceByItemId } from "lib/utils/product";
import WishList from "components/common/wishlist/index";
interface ProductCardProps {
  index?: number;
  title?: string;
  basePrice?: number | string;
  discount?: string;
  discountAmount?: number | string;
  productCardImages?: ImageType[];
  onlineExclusiveTag?: boolean;
  sku?: string;
  itemId?: string;
  priceListId?: string;
  currency?: string;
  wrapperClassName?: string;
  swipperClassName?: string;
  showATC?: boolean;
}

const ProductCard = ({
  sku = "",
  itemId = "",
  priceListId = "",
  currency = "USD",
  title = "",
  basePrice = 0,
  discount = "",
  discountAmount = 0,
  productCardImages = [],
  onlineExclusiveTag = false,
  index = 0,
  wrapperClassName,
  swipperClassName,
  showATC = true,
}: ProductCardProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const [fill, setFill] = useState(false);
  const { t } = useTranslation("common");
  const router = useRouter();
  // const [showWishListIcon, setShowWishListIcon] = useState(false);
  const [outOfStockError, setOutOfStockError] = useState(false);

  const handleAddToCart = async (event: any) => {
    event.stopPropagation();
    const payload: ATCPayload = {
      cartId: "98b0ed93-aaf1-4001-b540-b61796c4663d",
      items: [
        {
          sku: sku,
          itemId: itemId,
          quantity: 1,
          priceListId: "100000",
          price: {
            currency: currency,
            amount: basePrice,
            discount: {
              discountAmount: discountAmount,
            },
          },
        },
      ],
    };
    const response = await addProductToCart(payload);
    if (response?.hasError) {
      
      if(response?.code === 'ITEM_OUT_OF_STOCK') {
        setOutOfStockError(true)
      }
    } else {
      router?.push("/cart");
    }
  };

  return (
    <div
      className={`show-arrow-on-hover ${styles["product-card__wrapper"]} ${wrapperClassName}`}
      key={index}
    >
      <div
        className={styles["product-card__img-wrapper"]}
        // onMouseOver={() => setShowWishListIcon(true)}
        // onMouseLeave={() => setShowWishListIcon(false)}
      >
        <div
          className={styles["product-card__wishlist-icon"]}
          onClick={() => setFill(!fill)}
        >
          <WishList itemId={itemId} />
        </div>
        <Slider
          productSlider={true}
          desktopSlidePerView={1}
          mobileSlidePerView={1}
          scrollbar={false}
          navigation={true}
          pagination={true}
          className={`product-slider ${swipperClassName} ${
            onlineExclusiveTag
              ? "slider-navigation-up"
              : "slider-navigation-down"
          }`}
        >
          <>
            {productCardImages &&
              productCardImages.length > 0 &&
              productCardImages?.map((data, index) => {
                const imageUrl = data?.url;
                return (
                  <SwiperSlide key={index}>
                    {imageUrl &&
                      (checkMediaType(imageUrl) !== "img" ? (
                        <>
                          <video
                            autoPlay={false}
                            muted={true}
                            loop={true}
                            playsInline={true}
                            height="100%"
                            width="100%"
                            controls={false}
                            onClick={() => {
                              router.push(`/p/${sku}`);
                            }}
                          >
                            <source
                              src={`${imageUrl}#t=0.1`}
                              type="video/mp4"
                            />
                          </video>
                        </>
                      ) : (
                        <Image
                          src={data?.url}
                          alt={data?.altText}
                          width={width > desktopScreenSize ? 314 : 167.5}
                          height={width > desktopScreenSize ? 322 : 190.67}
                          layout="responsive"
                          className={styles["product-img"]}
                          onClick={() => {
                            router.push(`/p/${sku}`);
                          }}
                        ></Image>
                      ))}
                  </SwiperSlide>
                );
              })}
          </>
        </Slider>
        {onlineExclusiveTag && (
          <Label
            className={`${styles["product-card__tag"]} ${
              styles[
                `${
                  appState?.brand === `Miss L'`
                    ? "bg_missl"
                    : appState?.brand === "Kenaz"
                    ? "bg_kenaz"
                    : "bg_lazurde"
                }`
              ]
            }`}
          >
            {appState?.lang === "en"
              ? "online exclusive"
              : t("onlineExclusiveTag")}
          </Label>
        )}
        {showATC && (
          <div className={styles["product-card__addtocart-btn"]}>
            <Button
              buttonStyle="black"
              buttonText={
                appState?.lang === "en" ? "add to cart" : t("addToCartBtnText")
              }
              buttonSize={"sm"}
              onClick={(e) => {
                handleAddToCart(e);
              }}
              type={"button"}
            />
          </div>
        )}
      </div>

      <div
        onClick={() => {
          router.push(`/p/${sku}`);
        }}
      >
        <Label className={styles["product-card__title"]}>{title}</Label>
        <div className={styles["product-card__price-wrapper"]}>
          {basePrice ? (
            <Label
              className={`${styles["product-card__price__base-price"]} ${
                discount ? styles["line-through"] : ""
              }`}
            >
              {`$${basePrice && basePrice.toLocaleString()}`}
            </Label>
          ) : (
            ""
          )}
          {discount ? (
            <Label className={styles["product-card__price-discount"]}>
              {discount}
            </Label>
          ) : (
            ""
          )}
          {discountAmount ? (
            <Label className={styles["product-card__price__discounted-price"]}>
              {`$${discountAmount && discountAmount.toLocaleString()}`}
            </Label>
          ) : (
            ""
          )}
        </div>
      </div>
      {outOfStockError && (
        <div className={styles["error-msg"]}>
          Out of Stock
        </div>
      )}
    </div>
  );
};
export default ProductCard;
