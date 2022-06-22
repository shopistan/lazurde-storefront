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
import Accordion from "components/common/ui/accordion/Accordion";
import { needHelpData } from "lib/mock-data/data";

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
        <Image alt="icon" src={"/orders.png"} width={13.75} height={15.28} />
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
                <Image
                  alt="icon"
                  src={"/ordernum.png"}
                  width={16}
                  height={16}
                />
              </div>
              <p className={styles["order-details-text"]}>
                {appState.lang == "en" ? "Order No" : t("Order No")}:
                <span className={styles["order-details-span"]}>
                  {` ${order.orderId}`}
                </span>
              </p>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image
                  alt="icon"
                  src={"/calendar.png"}
                  width={15}
                  height={15}
                />
              </div>
              <p className={styles["order-details-text"]}>
                {appState.lang == "en" ? "Order Date" : t("Order Date")}:
                <span className={styles["order-details-span"]}>
                  {` ${updateOrderDate(order?.updatedAt)}`}
                </span>
              </p>
            </div>
            <div className={styles["history-second-first-block"]}>
              <div className={styles["history-second-first-image"]}>
                <Image
                  alt="icon"
                  src={"/warrantybook.png"}
                  width={15}
                  height={15}
                />
              </div>
              <Label className={styles["order-details-link"]}>
                {appState.lang == "en"
                  ? "View Digital Receipt & Warranty"
                  : t("View Digital Receipt & Warranty")}
              </Label>
            </div>
          </div>
          <div className={styles["history-barcode"]}>
            <Image alt="icon" src={"/barcode.svg"} width={160} height={160} />
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
                          alt="icon"
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
                        <div className={styles["history-forth-style"]}>
                          <p className={styles["history-forth-sub-style"]}>
                            {appState.lang == "en" ? "Quantity" : t("Quantity")}
                            : {object?.quantity}
                          </p>
                          <p className={styles["history-forth-sub-style"]}>
                            {appState.lang == "en" ? "Size" : t("Size")}:{" "}
                            {obj["Size"]}
                          </p>
                          <p className={styles["history-forth-sub-style"]}>
                            {appState.lang == "en" ? "Color" : t("Color")}:{" "}
                            {obj["Color"]}
                          </p>
                        </div>
                        <div className={styles["history-forth-detail"]}>
                          <p className={styles["history-forth-sub-detail"]}>
                            {appState.lang == "en"
                              ? "Style Number"
                              : t("Style Number")}
                            : {object?.sku}
                          </p>
                          <p className={styles["history-forth-sub-detail"]}>
                            {appState.lang == "en"
                              ? "Order Date"
                              : t("Order Date")}
                            : {updateOrderDate(order?.updatedAt)}
                          </p>
                          <p className={styles["history-forth-sub-detail"]}>
                            {appState.lang == "en"
                              ? "Order Created"
                              : t("Order Created")}
                          </p>
                        </div>
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
                            alt="icon"
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
      <div className={styles["history-seven"]}>
        <div className={styles["history-seven-heading"]}>
          <Label>Need Help?</Label>
        </div>
        {needHelpData.map((data, index) => {
          return (
            <Accordion
              key={index}
              className={"history-seven-text"}
              heading={data.ques}
              arrowDown={true}
            >
              {data.ans}
            </Accordion>
          );
        })}
      </div>

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
