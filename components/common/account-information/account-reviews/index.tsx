/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import Label from "components/common/ui/label";
import styles from "./style.module.scss";
import { ReviewIcon } from "components/icons";
import { getReviews } from "lib/utils/reviews";
import {
  desktopScreenSize,
  formateDate,
  reviewStarAvg,
} from "lib/utils/common";
import Pagination from "components/common/ui/pagination";
import StarRating from "components/common/ui/star-ratings";
import useWindowSize from "lib/utils/useWindowSize";
import { getOrders } from "lib/utils/order";
import ProductWithOutReviews from "./product-without-reviews";
import { productWithoutReview } from "lib/mock-data/data";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface arabicDataProps {
  myReviewHeading?: string;
  myPastReviews?: string;
}

const UserReviews = (): JSX.Element => {
  const [size] = useWindowSize();
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [initialProductData, setInitialProductData] = useState<any>([]);
  const [currentData, setCurrentData] = useState([]);
  const [reviewsData, setReviewsData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [orderDetail, setOrderDetail] = useState<any>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const authToken = "";
    const res = await getOrders(authToken);
    res && setOrderDetail(res);
  };

  useEffect(() => {
    setFilterData("");
    fetchingReviews();
  }, []);

  const fetchingReviews = async () => {
    const userId = "243";
    const response = await getReviews(userId);
    response && response?.data && setReviewsData(response?.data?.results);
    response &&
      response?.data &&
      setInitialProductData(response?.data?.results);
    response && response?.data && setCurrentData(response?.data?.results);
  };

  const arabicData: arabicDataProps = t(
    "accountReviewData",
    {},
    { returnObjects: true }
  );

  return (
    <>
      <div className={styles["account-review-wrapper"]}>
        <div className={styles["reviews-heading"]}>
          <ReviewIcon />
          <Label className={styles["label"]}>
            {appState?.lang === "en"
              ? "my review"
              : arabicData?.myReviewHeading}
          </Label>
        </div>

        <ProductWithOutReviews products={productWithoutReview} />

        {reviewsData && reviewsData.length > 0 ? (
          <>
            <div className={styles["reviews-heading"]}>
              <ReviewIcon />
              <Label className={styles["label"]}>
                {appState?.lang === "en"
                  ? "my past review"
                  : arabicData?.myPastReviews}
              </Label>
            </div>
            <div className={styles["past-reviews"]}>
              <Pagination
                showPaginationCount={false}
                pKey={currentData}
                paginationClass={styles["review-pagination"]}
                controlDivClass={styles["review-pagination-control"]}
                defaultPageNumber={1}
                pageSize={3}
                totalSize={initialProductData?.length}
                dataArray={initialProductData}
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
                        {review?.productImageUrl ? (
                          <div className={styles["review-img"]}>
                            <img
                              src={
                                review?.productImageUrl?.replace(/"/g, "") ||
                                "/"
                              }
                              alt="review-img"
                              width={
                                size > desktopScreenSize ? "100%" : "327px"
                              }
                              height={
                                size > desktopScreenSize ? "378px" : "318px"
                              }
                            />
                          </div>
                        ) : null}
                        <Label className={styles["product-title"]}>
                          {review?.productTitle}
                        </Label>
                        <Label className={styles["product-price"]}>
                          {"$12,40"}
                        </Label>
                        <Label className={styles["customer-name"]}>
                          {review?.author?.replace(/"/g, "")}
                        </Label>
                        <div
                          className={styles["review-rating"]}
                          style={{
                            pointerEvents: "none",
                          }}
                        >
                          <StarRating
                            count={5}
                            rating={review?.rating?.toFixed(2)}
                            pointerEventsNone={true}
                            starWidth={12}
                            starHeight={12}
                          />
                        </div>
                        <Label className={styles["review-content"]}>
                          {review?.body?.replace(/"/g, "")}
                        </Label>
                        <Label className={styles["date"]}>
                          {formateDate(review?.dateAdded)}
                        </Label>
                      </div>
                    );
                  })}
                </>
              </Pagination>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserReviews;
