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
interface ProductCardProps {
  index?: number;
  title?: string;
  basePrice?: string;
  discount?: string;
  discountedPrice?: string;
  productCardImages?: ImageType[];
  onlineExclusiveTag?: boolean;
}

const ProductCard = ({
  title = "",
  basePrice = "",
  discount = "",
  discountedPrice = "",
  productCardImages = [],
  onlineExclusiveTag = false,
  index = 0,
}: ProductCardProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const [fill, setFill] = useState(false);

  return (
    <div
      className={`show-arrow-on-hover ${styles["product-card__wrapper"]}`}
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
          className={`product-slider ${
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
                    <Image
                      src={data?.url}
                      alt={data?.altText}
                      width={width > 1023 ? 314 : 167.5}
                      height={width > 1023 ? 322 : 190.67}
                      layout="responsive"
                    />
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
            onClick={() => {}}
            type={"button"}
          />
        </div>
      </div>

      <Label className={styles["product-card__title"]}>{title}</Label>
      <div className={styles["product-card__price-wrapper"]}>
        {basePrice && (
          <Label
            className={`${styles["product-card__price__base-price"]} ${
              discount ? styles["line-through"] : ""
            }`}
          >
            {basePrice}
          </Label>
        )}
        {discount && (
          <Label className={styles["product-card__price-discount"]}>
            {discount}
          </Label>
        )}
        {discountedPrice && (
          <Label className={styles["product-card__price__discounted-price"]}>
            {discountedPrice}
          </Label>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
