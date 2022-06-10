import React, { useContext, useState, useRef } from "react";
import styles from "./style.module.scss";
import { CrossSmall } from "components/icons";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import ReviewForm from "./review-form";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface WriteAReviewProps {
  isOpened?: Boolean;
  onClose?: Function;
  productData?: any;
  fetchingReviews?: Function;
  setIsRatingError?: Function;
  isRatingError?: string;
}

const WriteAReview = ({
  isOpened = false,
  onClose,
  productData = {},
  fetchingReviews,
  setIsRatingError,
  isRatingError,
}: WriteAReviewProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [ratingIndex, setRatingIndex] = useState(-1);

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
            <div
              className={styles["close-btn"]}
              onClick={() => {
                onClose && onClose();
                setIsRatingError("");
              }}
            >
              <CrossSmall />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WriteAReview;
