/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { getReviews } from "lib/utils/reviews";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { formateDate } from "lib/utils/common";
import WriteAReview from "./write-review";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<any>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const _review = async () => {
      const response = await getReviews();
      response && response?.data && setReviewsData(response?.data);
    };
    _review();
  }, []);

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles["reviews-wrapper"]}>
        <div>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            write a review
          </button>
        </div>
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
                  <StarRating count={5} rating={review?.rating} />
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
                      src={review?.productImageUrl?.replace(/"/g, "") || "/"}
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
      {modalOpen && <WriteAReview modalOpen={modalOpen} onClose={onClose} />}
    </>
  );
};

export default Reviews;
