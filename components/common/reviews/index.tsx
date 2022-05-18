/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { getReviews } from "lib/utils/reviews";
import Label from "components/common/ui/label";
import StarRatings from "components/common/ui/star-ratings";
import { formateDate } from "lib/utils/common";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<any>({});

  useEffect(() => {
    const _review = async () => {
      const response = await getReviews();
      response && response?.data && setReviewsData(response?.data);
    };
    _review();
  }, []);

  return (
    <div className={styles["reviews-wrapper"]}>
      {reviewsData &&
        reviewsData.results &&
        reviewsData.results.length > 0 &&
        reviewsData?.results.map((reviews: any, index: number) => {
          const { review = {}, customer = {} } = reviews;
          return (
            <div className={styles["review"]} key={index}>
              <Label className={styles["customer-name"]}>
                {customer?.name?.replace(/"/g, "")}
              </Label>
              <div className={styles["review-rating"]}>
                <StarRatings rating={review?.rating} />
              </div>
              <Label className={styles["review-content"]}>
                {review?.body?.replace(/"/g, "")}
              </Label>
              <Label className={styles["date"]}>
                {formateDate(review?.dateAdded)}
              </Label>
              {review?.productImageUrl ? (
                <div className={styles["review-img"]}>
                  <img
                    src={review?.productImageUrl || "/"}
                    alt="review-img"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
