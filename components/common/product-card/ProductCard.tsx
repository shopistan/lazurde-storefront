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
}: ProductCardProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const [fill, setFill] = useState(false);

  const handleAddToCart = async () => {
    const payload: ATCPayload = {
      cartId: null,
      items: [
        {
          sku: sku,
          itemId: itemId,
          quantity: 1,
          priceListId: priceListId,
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
    const res = await addProductToCart(payload);
  };

  return (
    <div
      className={`show-arrow-on-hover ${styles["product-card__wrapper"]} ${wrapperClassName}`}
      key={index}
    >
      <div className={styles["product-card__img-wrapper"]}>
        <div
          className={styles["product-card__wishlist-icon"]}
          onClick={() => setFill(!fill)}
        >
          <Heart fill={fill ? "red" : "#000"} />
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
                return (
                  <SwiperSlide key={index}>
                    {data?.url && (
                      <Image
                        src={data?.url}
                        alt={data?.altText}
                        width={width > 1023 ? 314 : 167.5}
                        height={width > 1023 ? 322 : 190.67}
                        layout="responsive"
                      />
                    )}
                  </SwiperSlide>
                );
              })}
          </>
        </Slider>
        {onlineExclusiveTag && (
          <Label className={styles["product-card__tag"]}>
            {appState?.lang === "en"
              ? "online exclusive"
              : "حصريا على الانترنت"}
          </Label>
        )}
        <div className={styles["product-card__addtocart-btn"]}>
          <Button
            buttonStyle="black"
            buttonText={"add to cart"}
            buttonSize={"sm"}
            onClick={() => {
              handleAddToCart();
            }}
            type={"button"}
          />
        </div>
      </div>

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
  );
};
export default ProductCard;
