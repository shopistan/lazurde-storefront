import React, { useState } from "react";
import { Heart } from "components/icons";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import Label from "components/common/ui/label";
import Slider from "components/common/ui/slider/slider";
import Button from "components/common/ui/button";

interface ProductCardProps {
  discount?: string;
  discountedPrice?: string;
}

const ProductCard = ({
  discount = "-50%",
  discountedPrice = "$625",
}: ProductCardProps): JSX.Element => {
  const [fill, setFill] = useState(false);

  return (
    <div style={{ padding: "20px 80px", width: "100%" }}>
      <div className={`show-arrow-on-hover ${styles["product-card__wrapper"]}`}>
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
            className="product-slider"
          >
            <>
              <SwiperSlide>
                <Image
                  src="/product-card-one.png"
                  width={314}
                  height={320}
                  layout="responsive"
                  alt="alt text"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/product-card-one.png"
                  width={314}
                  height={320}
                  layout="responsive"
                  alt="alt text"
                />
              </SwiperSlide>
            </>
          </Slider>
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

        <Label className={styles["product-card__title"]}>
          Love Ring with Diamond
        </Label>
        <div className={styles["product-card__price-wrapper"]}>
          <Label className={styles["product-card__price__base-price"]}>
            $1,250
          </Label>
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
    </div>
  );
};
export default ProductCard;
