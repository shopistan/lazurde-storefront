import React, { useEffect, useState, useContext } from "react";
import styles from "./cart.module.scss";
import CartItem from "components/common/cart-item";
import { cartItems } from "lib/mock-data/data";
import {
  getCartByCartId,
  removeItemFromCart,
  updateItemOfCart,
} from "lib/utils/cart";
import { deleteWishList, getWishList } from "lib/utils/wishlist";
import Image from "next/image";
import { AppleButton, CrossSmall, PaypalButton } from "components/icons";
import {
  fetchProductPriceByItemId,
  fetchProductsByItemId,
} from "lib/utils/product";
import { AppContext } from "lib/context";
import paypalLogo from "../../../public/paypal-logo.png";
import useTranslation from "next-translate/useTranslation";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import Link from "next/link";
import Label from "components/common/ui/label";
import { getInventoryAuth } from "lib/utils/inventory";
import { ProductType } from "lib/types/product";

interface CartProps { }
const Cart = ({ }: CartProps): JSX.Element => {
  const [width] = useWindowSize();
  const { t } = useTranslation("common");
  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";
  const { priceListId, appState, allWishListProducts, setAllWishListProducts } =
    useContext(AppContext);
  const [freeShipping, showFreeShipping] = useState(true);
  const [cartData, setCartData] = useState({
    status: "",
    items: [],
    cartId: "",
    subTotal: 0.0,
    totalAmount: 0.0,
  });
  const [wishListData, setWishListData] = useState({
    status: "",
    items: [],
    cartId: "",
    priceList: [],
  });
  const [isLoadingCart, setisLoadingCart] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [updatingCartItem, setUpdatingCartItem] = useState(false);
  const [deletingWishList, setDeletingWishList] = useState(false);
  const [userAuth, setUserAuth] = useState("");

  useEffect(() => {
    const getAuth = async () => {
      const userData = await getInventoryAuth();
      setUserAuth(userData?.data?.accessToken);
    };
    getAuth();
  }, []);

  async function getWishListData(wishList: [] = []) {
    // setDeletingWishList(false);
    // setIsWishListLoading(true);
    // const wishListData = await getWishList(authToken);

    const wishListData =
      wishList && wishList?.length > 0 ? wishList : allWishListProducts;
    if (wishListData && wishListData.length > 0) {
      const getItemsbyItemIds = await fetchProductsByItemId(wishListData || []);
      const payload = {
        priceList: [priceListId],
        itemId: wishListData || [],
      };
      const response = await fetchProductPriceByItemId(payload);
      const wishListArray: ProductType[] = [];
      getItemsbyItemIds?.data?.products.filter(
        (product: { itemId: number }) => {
          let wishListObj: any = {};
          const matchedProduct = response?.data.find(
            (item: { itemId: number }) => product.itemId === item.itemId
          );
          if (matchedProduct) {
            wishListObj = {
              ...product,
              priceList: matchedProduct,
              totalPrice: {
                sale: matchedProduct?.offers?.price?.totalPrice,
                amount: matchedProduct?.offers?.price?.finalPrice,
                currency: matchedProduct?.offers?.price?.currency,
              },
            };
          } else {
            wishListObj = { ...product };
          }
          wishListArray.push(wishListObj);
        }
      );

      if (getItemsbyItemIds?.status === 200) {
        wishListArray?.map((product: ProductType, index) => {
          const modifiedProduct = destructureAttributes(product);
          wishListArray[index] = modifiedProduct;
        });
        setIsWishListLoading(false);
      setDeletingWishList(false);
        setWishListData({
          status: "",
          cartId: cartData?.cartId || null,
          items: wishListArray,
          priceList: response?.data,
        });
      } else 
      {
        setIsWishListLoading(false);
      setDeletingWishList(false);

      }
    } else {
      setIsWishListLoading(false);
      setDeletingWishList(false);
      setWishListData({
        status: "",
        items: [],
        cartId: "",
        priceList: [],
      });
    }
  }

  async function getCartData() {
    const cartData = await getCartByCartId(
      "98b0ed93-aaf1-4001-b540-b61796c4663d"
    );
    if (cartData?.status === 200) {
      const cartItems = cartData?.data
      cartItems?.items?.map((product: ProductType, index: number) => {
        const modifiedProduct = destructureAttributes(product);
        cartItems.items[index] = modifiedProduct;
      });
      cartItems?.items?.sort((a: {Brand: string}, b: {Brand: string}) => {
        if (b.Brand === 'Kenaz') return -1
        if (a.Brand === 'Kenaz') return 1
        return a.Brand.localeCompare(b.Brand)
      })

      setCartData(cartItems);
      setisLoadingCart(false);
    } else {
      setisLoadingCart(false);
    }
  }

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  useEffect(() => {
    getCartData();
    setisLoadingCart(true)
    setIsWishListLoading(true)
  }, []);

  useEffect(() => {
    getWishListData();
  }, [allWishListProducts]);

  const handleChange = async (
    // e: React.ChangeEvent<HTMLInputElement>,
    value: number,
    item: {
      lineItemId: number;
      itemId: string;
      cartId: string;
    }
  ) => {
    setUpdatingCartItem(true);
    let payload = {
      cartId: cartData?.cartId || null,
      items: [
        {
          lineItemId: item?.lineItemId,
          quantity: value ? Number(value) : 1,
          itemId: item?.itemId,
        },
      ],
    };
    try {
      const response = await updateItemOfCart(cartData?.cartId, payload);
      if (response?.status === 200) {
        response?.data?.items?.map((product: ProductType, index: number) => {
          const modifiedProduct = destructureAttributes(product);
          response.data.items[index] = modifiedProduct;
        });
        response?.data?.items?.sort((a: {Brand: string}, b: {Brand: string}) => {
          if (b.Brand === 'Kenaz') return -1
          if (a.Brand === 'Kenaz') return 1
          return a.Brand.localeCompare(b.Brand)
        })
        setCartData(response?.data);
        setUpdatingCartItem(false);
      } else {
        setUpdatingCartItem(false);
      }
    } catch (err) {
      setUpdatingCartItem(false);
      console.log("Error", err);
    }
  };

  const removeItem = async (item: { lineItemId: number; cartId: string }) => {
    setUpdatingCartItem(true);
    try {
      const response = await removeItemFromCart(
        cartData?.cartId,
        item?.lineItemId
      );
      if (response?.status === 200) {
        response?.data?.items?.map((product: ProductType, index: number) => {
          const modifiedProduct = destructureAttributes(product);
          response.data.items[index] = modifiedProduct;
        });

        response?.data?.items?.sort((a: {Brand: string}, b: {Brand: string}) => {
          if (b.Brand === 'Kenaz') return -1
          if (a.Brand === 'Kenaz') return 1
          return a.Brand.localeCompare(b.Brand)
        })
        setCartData(response?.data);
        setUpdatingCartItem(false);
      } else {
        setUpdatingCartItem(false);
      }
    } catch (err) {
      setUpdatingCartItem(false);
      console.log("Error", err);
    }
  };

  const removeWishListItem = async (item: any) => {
    setDeletingWishList(true);
    try {
      const response = await deleteWishList(item?.itemId, authToken);
      if (response?.status === 200) {
        const wishListData = await updateWishListData();

        setAllWishListProducts(wishListData);
        typeof window !== "undefined" &&
          window.sessionStorage.setItem(
            "wishListArray",
            JSON.stringify(wishListData)
          );
      }
      // setDeletingWishList(false);
    } catch (err) {
      console.log("Error!");
      setDeletingWishList(false);
    }
  };

  const updateWishListData = async () => {
    const wishlistArray = await getWishList(authToken);
    setAllWishListProducts(wishlistArray?.data?.items);
    typeof window !== "undefined" &&
      window.sessionStorage.setItem(
        "wishListArray",
        JSON.stringify(wishlistArray?.data?.items)
      );
    return wishlistArray?.data?.items;
  };

  const renderHelpCenterSection = () => {
    return (
      <div className={styles["need-help-wrapper"]}>
        <hr className={styles["bold-line"]} />
        <div className={styles["need-help-heading"]}>
          <span>
            {" "}
            {appState?.lang === "en" ? "Need Help ?" : t("needHelp")}
          </span>
          <Link href={"/help-centre"}>
            <a> {appState?.lang === "en" ? "Help Center" : t("helpCenter")}</a>
          </Link>
        </div>
        <div className={styles["need-help-points"]}>
          {[1, 2, , 3, 4]?.map((index) => {
            return (
              <p key={index}>
                {" "}
                {appState?.lang === "en"
                  ? "Lorem ipsum dolor sit"
                  : t("dummyText")}
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWishListSection = () => {

    return (
      <div
        className={styles["bag-wrapper"]}
        style={{
          marginTop: width > desktopScreenSize ? "8px" : "",
        }}
      >
        <span className={styles["main-heading"]}>
          {appState?.lang === "en" ? "Your Wishlist" : t("yourWishList")}
        </span>
        {isWishListLoading ? (
          <div>{appState?.lang === "en" ? "Loading..." : t("loading")}</div>
        ) : (
          <>
            {Object.keys(wishListData).length !== 0 ? (
              wishListData?.items?.length > 0 ? (
                wishListData?.items?.map((item, index) => {
                  return (
                    <>
                      <CartItem
                        key={index}
                        item={item}
                        wishListItem={true}
                        removeItem={removeWishListItem}
                        updatingCartItem={deletingWishList}
                        getCartData={getCartData}
                      />
                      {index < wishListData?.items?.length - 1 && <hr />}
                    </>
                  );
                })
              ) : (
                <div>
                  {" "}
                  {appState?.lang === "en"
                    ? "No Cart Data Found!"
                    : t("noCartDataFound")}
                </div>
              )
            ) : (
              <div>
                {" "}
                {appState?.lang === "en"
                  ? "No Cart Data Found!"
                  : t("noCartDataFound")}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["flex-wrap"]}>
        <div className={styles["inner-wrapper"]}>
          <div className={styles["shipping-column"]}>
            {freeShipping && (
              <div className={styles["free-shipping-card"]}>
                <div className={styles["free-shipping-content"]}>
                  <span>
                    {appState?.lang === "en"
                      ? "Free Shipping for Members"
                      : t("freeShipping")}
                  </span>
                  {/* {appState?.lang === "en" ? ( */}
                  <span className={styles["para"]}>
                    {appState?.lang === "en"
                      ? `Become a L'azurde member for fast and free shipping`
                      : t("becomeMember")}
                    .{" "}
                    <Link href={"/"}>
                      <a>
                        {appState?.lang === "en"
                          ? "Join Us"
                          : t("signUpBtnText")}
                      </a>
                    </Link>{" "}
                    or{" "}
                    <Link href={"/"}>
                      <a>
                        {appState?.lang === "en"
                          ? "Sign In"
                          : t("signInBtnText")}
                      </a>
                    </Link>
                  </span>
                  {/* ) : (
                    <span>{t("becomeMember")}</span>
                  )} */}
                </div>
                <div style={{ cursor: "pointer" }}>
                  <CrossSmall
                    width={12}
                    height={12}
                    onClick={() => showFreeShipping(false)}
                  />
                </div>
              </div>
            )}
            <div className={styles["bag-wrapper"]}>
              <span className={styles["main-heading"]}>
                {appState?.lang === "en" ? "Bag" : t("bag")}
              </span>
              {isLoadingCart ? (
                <div>
                  {appState?.lang === "en" ? "Loading..." : t("loading")}
                </div>
              ) : (
                <>
                  {Object.keys(cartData).length !== 0 ? (
                    cartData?.items?.length ? (
                      cartData?.items?.map((item, index) => {
                        return (
                          <>
                            <CartItem
                              key={index}
                              item={item}
                              userAuth={userAuth}
                              updatingCartItem={updatingCartItem}
                              handleChange={handleChange}
                              removeItem={removeItem}
                            />
                            {index < cartData?.items?.length - 1 && <hr />}
                          </>
                        );
                      })
                    ) : (
                      <div>
                        {appState?.lang === "en"
                          ? "No Cart Data Found!"
                          : t("noCartDataFound")}
                      </div>
                    )
                  ) : (
                    <div>
                      {" "}
                      {appState?.lang === "en"
                        ? "No Cart Data Found!"
                        : t("noCartDataFound")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {width > desktopScreenSize ? renderWishListSection() : null}
        </div>
        <div className={styles["inner-wrapper"]}>
          <div className={styles["summary-card"]}>
            <span> {appState?.lang === "en" ? "Summary" : t("summary")}</span>
            <div className={styles["order-details"]}>
              <div>
                <span>
                  {appState?.lang === "en" ? "Subtotal" : t("subTotal")}
                </span>
                <span data-amount={true}>
                  {cartData?.subTotal?.toLocaleString()}
                </span>
              </div>
              <div>
                <span>
                  {" "}
                  {appState?.lang === "en"
                    ? "Estimated Shipping &amp; Handling"
                    : t("estimatedShipping")}
                </span>
                <span data-amount={true}>$0.00</span>
              </div>
              <div>
                <span>{appState?.lang === "en" ? "VAT Tax" : t("vatTax")}</span>
                <span data-amount={true}>$0.00</span>
              </div>
            </div>
            <hr className={styles["horizontal-divider"]} />
            <div className={styles["order-details"]}>
              <div>
                <span data-amount={true}>
                  {appState?.lang === "en" ? "Total to pay" : t("totalToPay")}
                </span>
                <span
                  data-amount={true}
                >{`$${cartData?.totalAmount?.toLocaleString()}`}</span>
              </div>
            </div>
            <hr className={styles["horizontal-divider"]} />
            <button className={styles["checkout-button"]}>
              {appState?.lang === "en" ? "Checkout" : t("checkout")}
            </button>
            <div className={styles["half-divider"]}>
              <hr />
              <span data-divider={true}>
                {appState?.lang === "en"
                  ? "Or Continue With"
                  : t("orContinueWith")}
              </span>
              <hr />
            </div>
            <div className={styles["external-btns"]}>
              <button className={styles["apple-pay-btn"]}>
                <AppleButton />
              </button>
              <button className={styles["paypal-btn"]}>
                <Image
                  src={paypalLogo}
                  alt=""
                  width={174}
                  height={40}
                  quality={100}
                />
              </button>
            </div>
          </div>
          {width > desktopScreenSize ? renderHelpCenterSection() : null}
        </div>
        {/* <div className={styles["flex-wrap"]}> */}
        {width < desktopScreenSize ? renderWishListSection() : null}
        {width < desktopScreenSize ? renderHelpCenterSection() : null}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Cart;
