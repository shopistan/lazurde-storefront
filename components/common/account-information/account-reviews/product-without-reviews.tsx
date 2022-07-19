import React, { useState, useContext } from "react";
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
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface ProductWithOutReviewsProps {
  products?: any;
}
interface arabicDataProps {
  myReviewHeading?: string;
  myPastReviews?: string;
  yourNextReviewHeading?: string;
}

const ProductWithOutReviews = ({
  products = [],
}: ProductWithOutReviewsProps): JSX.Element => {
  const [width] = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const [isRatingError, setIsRatingError] = useState("");
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const arabicData: arabicDataProps = t(
    "accountReviewData",
    {},
    { returnObjects: true }
  );

  const arabicDataProduct: arabicDataProps = t(
    "accountReviewData.product",
    {},
    { returnObjects: true }
  );

  return (
    <>
      <div className={styles["product-without-review_wrapper"]}>
        <Label className={styles["main-label"]}>
          {appState?.lang === "en"
            ? "Your Next Review Awaits"
            : arabicData?.yourNextReviewHeading}
        </Label>
        <Slider
          desktopSlidePerView={2}
          mobileSlidePerView={1.45}
          navigation={width > desktopScreenSize ? true : false}
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
                          width={width > desktopScreenSize ? 281 : 238.5}
                          height={width > desktopScreenSize ? 267 : 227}
                          layout={
                            width > desktopScreenSize ? "responsive" : "fixed"
                          }
                        />
                      </div>
                      <Label className={styles["title"]}>
                        {appState?.lang === "en"
                          ? title
                          : Array.isArray(arabicDataProduct) &&
                            arabicDataProduct[index]?.title}
                      </Label>
                      <StarRating
                        count={5}
                        rating={3}
                        pointerEventsNone={true}
                        starWidth={12}
                        starHeight={12}
                      />
                      <Label className={styles["description"]}>
                        {appState?.lang === "en"
                          ? title
                          : Array.isArray(arabicDataProduct) &&
                            arabicDataProduct[index]?.description}
                      </Label>
                      <div>
                        <Button
                          buttonSize="sm"
                          onClick={() => {
                            setModalOpen(true);
                          }}
                        >
                          {appState?.lang === "en"
                            ? "write review"
                            : Array.isArray(arabicDataProduct) &&
                              arabicDataProduct[index]?.writeReviewBtn}
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
