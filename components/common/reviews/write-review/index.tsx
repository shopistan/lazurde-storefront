import React, { useState } from "react";
import styles from "./style.module.scss";
import { CrossSmall } from "components/icons";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import ReviewForm from "./review-form";

interface WriteAReviewProps {
  modalOpen?: Boolean;
  onClose?: Function;
}

const WriteAReview = ({
  modalOpen = false,
  onClose,
}: WriteAReviewProps): JSX.Element => {
  const [ratingIndex, setRatingIndex] = useState(-1);
  return (
    <div className={styles["review-modal_wrapper"]} data-open={modalOpen}>
      <div className={styles["review-modal_body"]}>
        <div className={styles["review-modal_content"]}>
          <div
            className={styles["close-btn"]}
            onClick={() => {
              onClose && onClose();
            }}
          >
            <CrossSmall />
          </div>
          <Heading element="h3" className={styles["heading"]}>
            write a review
          </Heading>
          <div className={styles["review-sec"]}>
            <Label className={styles["rating-label"]}>Overall rating</Label>

            <StarRating
              rating={ratingIndex + 1}
              count={5}
              starWidth={24}
              starHeight={24}
              onClick={(rate: number) => {
                setRatingIndex(rate);
              }}
            />
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WriteAReview;
