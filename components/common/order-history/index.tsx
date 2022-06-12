import React, { FC, useState, useContext } from "react";
import Label from "../ui/label";
import Image from "next/image";
import Button from "../ui/button";
import styles from "./order-history.module.scss";
import { updateOrderDate, ordeFormatDate } from "lib/utils/common";
import { getReviews, writeReview } from "lib/utils/reviews";
import WriteAReview from "components/common/reviews/write-review";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface OrderHistoryProps {
  order?: any;
}

const OrderHistory: FC<OrderHistoryProps> = ({ order }) => {
  const { t } = useTranslation("common");
  console.log("order", order);
  const { appState } = useContext(AppContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({ itemId: "" });
  const [isRatingError, setIsRatingError] = useState("");
  const fetchingReviews = async () => {
    const response = await getReviews(productDetails?.itemId);
    console.log(response);
  };

  return (
    <div className={styles["history-container"]}>
      <div className={styles["history-first"]}>
        <Image src={"/order.png"} width={13.75} height={15.28} />
        <Label className={styles["history-first-title"]}>
          {appState.lang == "en" ? "Order Details" : t("Order Details")}
        </Label>
        <Label className={styles["history-first-text"]}>
          {appState.lang == "en"
            ? "Thanks for your order! Check out the details below."
            : t("Thanks for your order! Check out the details below.")}
        </Label>
      </div>
      <div className={styles["history-second"]}>
        <div className={styles["history-second-first"]}>
          <div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <p className={styles["order-details-text"]}>
                {appState.lang == "en" ? "Order No" : t("Order No")}:
                <span className={styles["order-details-span"]}>
                  {order.orderId}
                </span>
              </p>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <p className={styles["order-details-text"]}>
                {appState.lang == "en" ? "Order Date:" : t("Order Date")}:
                <span className={styles["order-details-span"]}>
                  {updateOrderDate(order?.updatedAt)}
                </span>
              </p>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image src={"/calendar.png"} width={18} height={18} />
              </div>
              <Label>
                {appState.lang == "en"
                  ? "View Digital Receipt & Warranty"
                  : t("View Digital Receipt & Warranty")}
              </Label>
            </div>
          </div>
          <div className={styles["history-barcode"]}>
            <Image src={"/barcode.svg"} width={160} height={160} />
          </div>
        </div>
        <Button onClick={() => {}}>
          {appState.lang == "en" ? "Return Order" : t("Return Order")}
        </Button>
      </div>
      <div className={styles["history-third"]}>
        <Label className={styles["history-third-title"]}>
          {appState.lang == "en"
            ? "Ready for Collection"
            : t("Ready for Collection")}
        </Label>
        <Label className={styles["history-third-text"]}>
          <>
            L’azurde #5234 2976 <br /> Al Imam Saud Ibn Abdul Aziz Branch Rd{" "}
            <br /> Al Nakheel Mall, Riyadh 12483, Saudi Arabia
          </>
        </Label>
      </div>
      <div className={styles["history-forth"]}>
        <div>
          <div className={styles["history-forth-first"]}>
            <Label className={styles["history-forth-title"]}>
              {appState.lang == "en"
                ? "Click & Collect Order"
                : t("Click & Collect Order")}
            </Label>
            <p className={styles["history-forth-text"]}>
              {order?.items?.length}{" "}
              {appState.lang == "en" ? "Items" : t("Items")}
            </p>
          </div>
          <div>
            <p className={styles["history-forth-description"]}>
              {appState.lang == "en"
                ? "Estimated Collection: "
                : t("Estimated Collection")}
              : {ordeFormatDate(order?.updatedAt)}
            </p>
          </div>
        </div>
        <div className={styles["history-forth-second"]}>
          {order?.items &&
            order?.items?.map((object: any) => {
              return (
                object?.attributes &&
                object?.attributes?.map((obj: any, i: any) => {
                  return (
                    <div className={styles["history-forth-sections"]} key={i}>
                      <div className={styles["history-forth-image"]}>
                        <Image
                          src={"/small-ring.png" || obj["Image URL"]}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className={styles["product-details"]}>
                        <p className={styles["history-forth-heading"]}>
                          {obj["Product Title"]}
                        </p>
                        <p className={styles["history-forth-heading"]}>
                          ${object?.price}
                        </p>
                        <p className={styles["history-forth-sub"]}>
                          {appState.lang == "en" ? "Quantity" : t("Quantity")}:{" "}
                          {object?.quantity}
                        </p>
                        <p className={styles["history-forth-sub"]}>
                          {appState.lang == "en" ? "Size" : t("Size")}:{" "}
                          {obj["Size"]}
                        </p>
                        <p className={styles["history-forth-sub"]}>
                          {appState.lang == "en" ? "Color" : t("Color")} :{" "}
                          {obj["Color"]}
                        </p>
                        <p className={styles["history-forth-sub"]}>
                          {appState.lang == "en"
                            ? "Style Number"
                            : t("Style Number")}
                          : {object?.sku}
                        </p>
                        <p className={styles["history-forth-sub"]}>
                          {appState.lang == "en"
                            ? "Order Date"
                            : t("Order Date")}
                          : {updateOrderDate(order?.updatedAt)}
                        </p>
                        <p className={styles["history-forth-text"]}>
                          {order?.status}
                        </p>
                        <div
                          className={styles["reviews-section"]}
                          onClick={() => {
                            setProductDetails(object);
                            setModalOpen(true);
                          }}
                        >
                          <Image
                            src={"/writeReview.png"}
                            width={20}
                            height={20}
                          />
                          <p>
                            {appState.lang == "en"
                              ? "Leave Review"
                              : t("Leave Review")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              );
            })}
        </div>
      </div>
      <div className={styles["history-fifth"]}>
        <p className={styles["history-fifth-title"]}>
          {appState.lang == "en" ? "Payment Details" : t("Payment Details")}
        </p>
        {order?.payments &&
          order?.payments?.length > 0 &&
          order?.payments?.map((object: any, index: any) => {
            return (
              <div key={index} className={styles["history-fifth-second"]}>
                <p>{object?.cardHolder}</p>
                <p>{object?.cardNumber}</p>
                <p>{object?.expiryDate}</p>
                <p>{object?.paymentMethod}</p>
              </div>
            );
          })}
      </div>
      {order?.items &&
        order?.items?.length > 0 &&
        order?.items?.map((object: any, index: any) => {
          return (
            <>
              <div className={styles["history-six"]}>
                <p className={styles["history-six-first"]}>
                  {" "}
                  {appState.lang == "en" ? "Order Total" : t("Order Total")}
                </p>
                <div>
                  <div
                    className={`${styles["history-flex"]} ${styles["history-price"]}`}
                  >
                    <p className={styles["history-six-total-title"]}>
                      {appState.lang == "en" ? "Sub-Total" : t("Sub-Total")}:
                    </p>
                    <p className={styles["history-six-total-text"]}>
                      ${object?.price?.toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={`${styles["history-flex"]} ${styles["discount-price"]}`}
                  >
                    <p className={styles["history-six-total-title"]}>
                      {appState.lang == "en" ? "Discount" : t("Discount")}:
                    </p>
                    <p className={styles["history-six-total-text"]}>
                      ${object?.discount?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className={styles["history-flex"]}>
                  <p className={styles["history-six-first"]}>
                    {appState.lang == "en" ? "Total" : t("Total")}:
                  </p>
                  <p className={styles["history-six-first"]}>
                    ${(object?.price - object?.discount)?.toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      {modalOpen && (
        <WriteAReview
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
          productData={productDetails}
          fetchingReviews={fetchingReviews}
          setIsRatingError={setIsRatingError}
          isRatingError={isRatingError}
        />
      )}
    </div>
  );
};
export default OrderHistory;
