/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { getReviews } from "lib/utils/reviews";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { formateDate, reviewStarAvg } from "lib/utils/common";
import WriteAReview from "./write-review";
import ReviewTabs from "./review-tabs";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterData, setFilterData] = useState(reviewsData);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const _review = async () => {
      const productId = 5151231;
      const response = await getReviews(productId);
      response && response?.data && setReviewsData(response?.data?.results);
    };
    _review();
  }, []);

  const onClose = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    setFilterData(reviewsData);
  }, [reviewsData]);

  const filterReview = (val: any) => {
    const filtername = val?.label;
    if (filtername === "feature") {
      const _filterData =
        reviewsData &&
        reviewsData.length > 0 &&
        reviewsData.filter((data: any) => data?.review?.isFeatured === true);
      setFilterData(_filterData);
    }
    if (filtername === "recent") {
      setFilterData(reviewsData);
    }

    if (filtername === "highest") {
      const highestReviewData =
        reviewsData &&
        reviewsData.length > 0 &&
        reviewsData.sort(
          (a: any, b: any) => b?.review?.rating - a?.review?.rating
        );
      highestReviewData && setFilterData([...highestReviewData]);
    }

    if (filtername === "lowest") {
      const lowestReviewData =
        reviewsData &&
        reviewsData.length > 0 &&
        reviewsData.sort(
          (a: any, b: any) => a?.review?.rating - b?.review?.rating
        );
      lowestReviewData && setFilterData([...lowestReviewData]);
    }
  };

  useEffect(() => {
    let ratings: any = [];
    reviewsData &&
      reviewsData.length > 0 &&
      reviewsData.forEach((element: any) => {
        return ratings.push(element?.review?.rating);
      });
    const ratingAvg = ratings && ratings.length > 0 && reviewStarAvg(ratings);
    ratingAvg && setTotalRating(ratingAvg);
  }, [reviewsData]);

  return (
    <>
      <div id="google_translate_element" className={styles["reviews-wrapper"]}>
        <div className={styles["review-summary"]}>
          {reviewsData && reviewsData.length > 0 && (
            <Label className={styles["total-review-label"]}>
              {`${reviewsData?.length} customer reviews`}
            </Label>
          )}
          <div className={styles["review-summary-stars"]}>
            <StarRating
              count={5}
              rating={totalRating}
              starWidth={16.67}
              starHeight={16.67}
            />
            <Label className={styles["total-rating"]}>{`${totalRating} rating`}</Label>
          </div>
        </div>
        <div className={styles["write-review-btn"]}>
          <button
            onClick={() => {
              setModalOpen(true);
              document.body.style.overflow = "hidden";
            }}
          >
            write a review
          </button>
        </div>
        <ReviewTabs
          onClick={(e: any) => {
            filterReview(e);
          }}
        />

        <>
          {filterData &&
            filterData.length > 0 &&
            filterData?.map((reviews: any, index: number) => {
              const { review = {}, customer = {} } = reviews;
              return (
                <div className={styles["review"]} key={index}>
                  <Label className={styles["customer-name"]}>
                    {review?.author?.replace(/"/g, "")}
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
        </>
      </div>
      {modalOpen && <WriteAReview modalOpen={modalOpen} onClose={onClose} />}
    </>
  );
};

export default Reviews;
