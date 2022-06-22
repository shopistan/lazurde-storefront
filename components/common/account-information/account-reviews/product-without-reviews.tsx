import React, { useState } from "react";
import styles from "./style.module.scss";
import Label from "components/common/ui/label";
import Slider from "components/common/ui/slider/slider";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import Button from "components/common/ui/button";
import StarRating from "components/common/ui/star-ratings";
import WriteAReview from "components/common/reviews/write-review";

interface ProductWithOutReviewsProps {
  products?: any;
}

const ProductWithOutReviews = ({
  products = [],
}: ProductWithOutReviewsProps): JSX.Element => {
  const [width] = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const [isRatingError, setIsRatingError] = useState("");

  return (
    <>
      <div className={styles["product-without-review_wrapper"]}>
        <Label className={styles["main-label"]}>Your Next Review Awaits</Label>
        <Slider
          desktopSlidePerView={2}
          mobileSlidePerView={1.45}
          navigation={width > desktopScreenSize ? true : false}
          scrollbar={true}
          className={`account-review-slider`}
          hasScrollbar={false}
        >
          <>
            {Array.isArray(products) &&
              products.length > 0 &&
              products.map((content, index) => {
                const { image, title, description } = content;
                return (
                  <SwiperSlide key={index}>
                    <div className={styles["sldie-content"]}>
                      <div className={styles["img"]}>
                        <Image
                          src={image || ""}
                          alt="product-img"
                          width={width > desktopScreenSize ? 281 : 238}
                          height={width > desktopScreenSize ? 267 : 227}
                          layout="responsive"
                        />
                      </div>
                      <Label className={styles["title"]}>{title}</Label>
                      <StarRating
                        count={5}
                        rating={3}
                        pointerEventsNone={true}
                        starWidth={12}
                        starHeight={12}
                      />
                      <Label className={styles["description"]}>
                        {description}
                      </Label>
                      <div>
                        <Button
                          buttonSize="sm"
                          onClick={() => {
                            setModalOpen(true);
                          }}
                        >
                          write review
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </>
        </Slider>
      </div>
      {modalOpen && (
        <WriteAReview
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
          //   productData={productDetails}
          //   fetchingReviews={fetchingReviews}
          setIsRatingError={setIsRatingError}
          isRatingError={isRatingError}
        />
      )}
    </>
  );
};

export default ProductWithOutReviews;
