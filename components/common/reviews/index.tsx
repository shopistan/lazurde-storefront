/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { getReviews } from "lib/utils/reviews";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { formateDate, reviewStarAvg } from "lib/utils/common";
import WriteAReview from "./write-review";
import ReviewTabs from "./review-tabs";
import Pagination from "components/common/ui/pagination";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface ReviewsProps {
  setTotalRating?: Function;
  totalRating?: number;
  productData?: any;
}

const Reviews = ({
  setTotalRating,
  totalRating,
  productData = {},
}: ReviewsProps): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [reviewsData, setReviewsData] = useState<any>([]);
  const [initialProductData, setInitialProductData] = useState<any>([]);
  const [currentData, setCurrentData] = useState([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setFilterData("");
    fetchingReviews();
  }, []);

  const fetchingReviews = async () => {
    const productId = productData && productData["itemId"];
    const response = await getReviews(productId);
    response && response?.data && setReviewsData(response?.data?.results);
    response &&
      response?.data &&
      setInitialProductData(response?.data?.results);
    response && response?.data && setCurrentData(response?.data?.results);
  };

  const onClose = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

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
      const sortingArray = [...reviewsData];
      const highestReviewData =
        sortingArray &&
        sortingArray.length > 0 &&
        sortingArray.sort(
          (a: any, b: any) => b?.review?.rating - a?.review?.rating
        );
      highestReviewData && setFilterData([...highestReviewData]);
    }

    if (filtername === "lowest") {
      const sortingArray = [...reviewsData];
      const lowestReviewData =
        sortingArray &&
        sortingArray.length > 0 &&
        sortingArray.sort(
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
    ratingAvg && setTotalRating && setTotalRating(ratingAvg);
  }, [reviewsData]);

  return (
    <>
      {reviewsData && reviewsData.length > 0 ? (
        <div className={styles["reviews-wrapper"]}>
          <div className={styles["review-summary"]}>
            {reviewsData && reviewsData.length > 0 && (
              <Label className={styles["total-review-label"]}>
                {`${reviewsData?.length} ${
                  appState.lang == "en"
                    ? "customer reviews"
                    : t("customer reviews")
                }`}
              </Label>
            )}
            <div className={styles["review-summary-stars"]}>
              <StarRating
                count={5}
                rating={totalRating}
                starWidth={16.67}
                starHeight={16.67}
              />
              <Label
                className={styles["total-rating"]}
              >{`${totalRating?.toFixed(2)} ${
                appState.lang == "en" ? "rating" : t("rating")
              }`}</Label>
            </div>
          </div>
          <div className={styles["write-review-btn"]}>
            <button
              onClick={() => {
                setModalOpen(true);
                document.body.style.overflow = "hidden";
              }}
            >
              {appState.lang == "en" ? "write a review" : t("write a review")}
            </button>
          </div>
          <ReviewTabs
            onClick={(e: any) => {
              filterReview(e);
            }}
          />

          <>
            <Pagination
              showPaginationCount={false}
              pKey={currentData}
              paginationClass={styles["div-pagination"]}
              defaultPageNumber={1}
              pageSize={3}
              totalSize={
                Array.isArray(filterData)
                  ? filterData?.length
                  : initialProductData?.length
              }
              dataArray={
                Array.isArray(filterData) ? filterData : initialProductData
              }
              onInitialize={(slicedArray: []) => {
                setCurrentData(slicedArray);
              }}
              onPageUp={(slicedArray: []) => {
                setCurrentData(slicedArray);
              }}
              onPageDown={(slicedArray: []) => {
                setCurrentData(slicedArray);
              }}
            >
              <>
                {currentData?.map((reviews: any, index: number) => {
                  const { review = {}, customer = {} } = reviews;
                  return (
                    <div className={styles["review"]} key={index}>
                      <Label className={styles["customer-name"]}>
                        {review?.author?.replace(/"/g, "")}
                      </Label>
                      <div className={styles["review-rating"]}>
                        <StarRating
                          count={5}
                          rating={review?.rating?.toFixed(2)}
                        />
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
                            src={
                              review?.productImageUrl?.replace(/"/g, "") || "/"
                            }
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
            </Pagination>
          </>
        </div>
      ) : null}
      {modalOpen && (
        <WriteAReview
          productData={productData}
          isOpened={modalOpen}
          onClose={onClose}
          fetchingReviews={fetchingReviews}
        />
      )}
    </>
  );
};

export default Reviews;
