import React, { useContext } from "react";
import Image from "next/image";
import Label from "../ui/label";
import { orderData } from "lib/mock-data/data";
import Button from "../ui/button";
import Link from "next/link";
import styles from "./order-details.module.scss";
import { desktopScreenSize, ordeFormatDate } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import { getOrders } from "lib/utils/order";
import { updateOrderDate } from "lib/utils/common";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

const OrderDetails = ({}) => {
  const payload = {
    authToken: "",
  };
  const response = getOrders(payload);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  return (
    <div className={styles["order-container"]}>
      <div className={styles["order-main"]}>
        <Image src={"/order.png"} width={13.75} height={15.28} />
        <Label className={styles["order-heading"]}>
          {appState.lang == "en" ? "My Orders" : t("My Orders")}
        </Label>
        {orderData.orders.length > 0 ? (
          <Label className={styles["order-text"]}>
            {`${appState.lang == "en" ? "Displaying" : t("Displaying")} ${
              orderData.orders.length
            }  ${appState.lang == "en" ? "Orders" : t("Orders")}`}
          </Label>
        ) : (
          <div className={styles["no-order"]}>
            You currently don’t have any orders. You can find the orders here
            after you complete a purchase.
          </div>
        )}
        {orderData?.orders?.length < 1 && width < desktopScreenSize && (
          <Button className={styles["start-shopping"]}>Start shopping</Button>
        )}
      </div>
      {orderData?.orders && orderData?.orders?.length > 0 ? (
        orderData?.orders?.map((order, index) => {
          console.log("order", order);
          return (
            <div className={styles["order-section"]}>
              {orderData?.orders[index]?.tracking &&
                orderData?.orders[index]?.tracking?.length > 0 &&
                orderData?.orders[index]?.tracking?.map((track, i) => {
                  const { number } = track;
                  return (
                    <div className={styles["order-details"]}>
                      <div className={styles["order-delivery"]}>
                        <div>
                          <Label className={styles["order-sent"]}>
                            {appState?.lang == "en"
                              ? "We’ve Sent It!"
                              : t("We’ve Sent It!")}
                          </Label>
                          <Label className={styles["delivery-estimate"]}>
                            {`${
                              appState?.lang == "en"
                                ? "Estimated Delivery"
                                : t("Estimated Delivery")
                            } ${ordeFormatDate(
                              orderData?.orders[index]?.createdAt
                            )}`}
                          </Label>
                        </div>
                        <div>
                          <Button onClick={() => {}}>{`${
                            appState?.lang == "en"
                              ? "Track Parcel"
                              : t("Track Parcel")
                          } ${i + 1 || number}`}</Button>
                        </div>
                      </div>
                      <div className={styles["order-image"]}>
                        {
                          <Image
                            src={"/small-ring.png"}
                            width={100}
                            height={100}
                          />
                        }
                      </div>
                    </div>
                  );
                })}
              <div className={styles["order-history"]}>
                <div>
                  <div className={styles["order-date"]}>
                    <Image src={"/calendar.png"} width={18} height={18} />
                    <p className={styles["order-date-text"]}>
                      {appState?.lang == "en" ? "Order Date" : t("Order Date")}:{" "}
                      <span>
                        {updateOrderDate(orderData?.orders[index]?.createdAt)}
                      </span>
                    </p>
                  </div>
                  <div className={styles["order-date"]}>
                    <Image src={"/calendar.png"} width={18} height={18} />
                    <p className={styles["order-number-text"]}>
                      {appState?.lang == "en"
                        ? "Order Number"
                        : t("Order Number")}
                      : <span> {orderData?.orders[index]?.orderId}</span>
                    </p>
                  </div>
                  {/* <div className={styles["order-date"]}>
                    <Image src={"/calendar.png"} width={18} height={18} />
                    <Link href={"/"}>
                      <a className={styles["order-link"]}>
                        {appState?.lang == "en"
                          ? " View Digital Receipt & Warranty"
                          : t("View Digital Receipt & Warranty")}
                      </a>
                    </Link>
                  </div> */}
                </div>
                <Button className={styles["view-button"]} onClick={() => {}}>
                  {width > desktopScreenSize
                    ? appState?.lang == "en"
                      ? "View Order"
                      : t("View Order")
                    : appState?.lang == "en"
                    ? "View"
                    : t("View")}
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
export default OrderDetails;
