import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { CrossSmall } from "components/icons";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import ReviewForm from "components/common/reviews/write-review/review-form/review-form";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface WriteAReviewProps {
  isOpened?: Boolean;
  onClose?: Function;
  productData?: any;
  fetchingReviews?: Function;
  setIsRatingError?: Function;
  isRatingError?: string;
  reviewImagesRef?: any;
}

const WriteAReview = ({
  isOpened = false,
  onClose,
  productData = {},
  fetchingReviews,
  reviewImagesRef,
}: WriteAReviewProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [ratingIndex, setRatingIndex] = useState(-1);
  const [isRatingError, setIsRatingError] = useState("");
  return (
    <div
      className={styles["review-modal_wrapper"]}
      data-open={isOpened}
      onClick={() => {
        onClose();
        setIsRatingError("");
      }}
      data-testid="review-modal"
    >
      <div
        className={styles["review-modal_body"]}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles["review-modal_content"]}>
          <div className={styles["review-modal_header"]}>
            <div className={styles["close-btn"]}>
              <CrossSmall
                onClick={() => {
                  onClose && onClose();
                  setIsRatingError("");
                }}
              />
            </div>
            <Heading element="h3" className={styles["heading"]}>
              {appState.lang == "en" ? "Write a Review" : t("write a review")}
            </Heading>
          </div>
          <div id="rating-stars" className={styles["review-sec"]}>
            <Label className={styles["rating-label"]}>
              {appState?.lang === "en" ? "Overall rating" : t("Overall rating")}
            </Label>

            <div className={styles[""]}>
              <StarRating
                rating={ratingIndex + 1}
                count={5}
                starWidth={24}
                starHeight={24}
                onClick={(rate: number) => {
                  setRatingIndex(rate);
                  setIsRatingError("");
                }}
              />
              <Label className={styles["rating-error"]}>{isRatingError}</Label>
            </div>
            <ReviewForm
              rating={ratingIndex + 1}
              productData={productData}
              onClose={onClose}
              fetchingReviews={fetchingReviews}
              setIsRatingError={setIsRatingError}
              reviewImagesRef={reviewImagesRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WriteAReview;
