import React, { useContext, FC, useState, useEffect } from "react";
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
import OrderHistory from "../order-history";
import { ProductType } from "lib/types/product";

interface OrderDetailsProps {}

const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  const payload = {
    authToken: "",
  };
  // const response = getOrders(payload);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize();
  const [orderObject, setOrderObject] = useState({});
  const [orderDetails, setOrderDetails] = useState("");

  console.log("testing", orderObject);

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  const handleOrderDetail = (order: any) => {
    order && setOrderObject(order);
    console.log("orders", order);
    setOrderDetails("Order Details");
  };

  const orderImages = [
    {
      url: "/blue-ring.png",
      altText: "alt text",
    },
    {
      url: "/blue-ring.png",
      altText: "alt text",
    },
    {
      url: "/blue-ring.png",
      altText: "alt text",
    },
    {
      url: "/blue-ring.png",
      altText: "alt text",
    },
  ];
  const [renderCom, setRenderCom] = useState(false);
  useEffect(() => {
    setRenderCom(true);
  }, []);

  return renderCom && orderDetails != "Order Details" ? (
    <div className={styles["order-container"]}>
      <div className={styles["order-main"]}>
        <Image alt="icon" src={"/orders.png"} width={20} height={20} />
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
        <>
          {orderData?.orders?.map((order, index, ordersArr) => {
            console.log("order", order);
            return (
              <div key={index} className={styles["order-section"]}>
                {orderData?.orders[index]?.tracking &&
                  orderData?.orders[index]?.tracking?.length > 0 &&
                  orderData?.orders[index]?.tracking?.map((track, i) => {
                    const { number } = track;
                    return (
                      <div key={i} className={styles["order-details"]}>
                        <div className={styles["order-delivery"]}>
                          <div>
                            <Label className={styles["order-sent"]}>
                              {appState?.lang == "en"
                                ? ordersArr[index].status === "ORDER_DELIVERED"
                                  ? "We’ve Delivered It!"
                                  : ordersArr[index].status ===
                                    "ORDER_CONFIRMED"
                                  ? "In-Store Order"
                                  : ordersArr[index].status ===
                                    "ORDER_FULFILLED"
                                  ? "Click & Collect Order"
                                  : "We’ve Sent It!"
                                : t("We’ve Sent It!")}
                            </Label>
                            <Label className={styles["delivery-estimate"]}>
                              {`${
                                appState?.lang == "en"
                                  ? ordersArr[index].status ===
                                    "ORDER_CONFIRMED"
                                    ? "Collected "
                                    : ordersArr[index].status ===
                                      "ORDER_FULFILLED"
                                    ? "Estimated Collection "
                                    : "Estimated Delivery"
                                  : t("Estimated Delivery")
                              } ${ordeFormatDate(
                                orderData?.orders[index]?.createdAt
                              )}`}
                            </Label>
                          </div>
                          {ordersArr[index].status !== "ORDER_CONFIRMED" &&
                            ordersArr[index].status !== "ORDER_FULFILLED" && (
                              <div>
                                <Button
                                  buttonSize="sm"
                                  buttonStyle="white"
                                  onClick={() => {}}
                                >
                                  {`${
                                    appState?.lang == "en"
                                      ? "Track Parcel"
                                      : t("Track Parcel")
                                  } ${i + 1 || number}`}
                                </Button>
                              </div>
                            )}
                        </div>
                        <div className={styles["order-image"]}>
                          {orderImages.map((image, index) => {
                            return (
                              <div key={index}>
                                <Image
                                  src={image.url || "/"}
                                  alt={image.altText || ""}
                                  layout="fixed"
                                  width={100}
                                  height={100}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                <div className={styles["order-history"]}>
                  <div>
                    <div className={styles["order-date"]}>
                      <Image
                        alt="icon"
                        src={"/calendar.png"}
                        width={20.5}
                        height={18}
                        layout="fixed"
                      />
                      <p className={styles["order-date-text"]}>
                        {appState?.lang == "en"
                          ? "Order Date"
                          : t("Order Date")}
                        :{" "}
                        <span>
                          {updateOrderDate(orderData?.orders[index]?.createdAt)}
                        </span>
                      </p>
                    </div>
                    <div className={styles["order-date"]}>
                      <Image
                        alt="icon"
                        src={"/ordernum.png"}
                        width={20.5}
                        height={18}
                        layout="fixed"
                      />
                      <p className={styles["order-number-text"]}>
                        {appState?.lang == "en"
                          ? "Order Number"
                          : t("Order Number")}
                        : <span> {orderData?.orders[index]?.orderId}</span>
                      </p>
                    </div>
                    <div className={styles["order-date"]}>
                      <Image
                        alt="icon"
                        src={"/warrantybook.png"}
                        width={18}
                        height={18}
                        layout="fixed"
                      />
                      <Link href={"/"}>
                        <a className={styles["order-link"]}>
                          {appState?.lang == "en"
                            ? " View Digital Receipt & Warranty"
                            : t("View Digital Receipt & Warranty")}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <Button
                    className={styles["view-button"]}
                    onClick={() => {
                      handleOrderDetail(order);
                      console.log("clicks", order);
                    }}
                  >
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
          })}
          <div className={styles["order-count"]}>
            <Label>
              {appState?.lang === "en"
                ? `Displaying ${orderData?.orders?.length} Orders`
                : ` العرض ${orderData?.orders?.length} الطلب`}
            </Label>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    orderDetails === "Order Details" && <OrderHistory order={orderObject} />
  );
};
export default OrderDetails;
