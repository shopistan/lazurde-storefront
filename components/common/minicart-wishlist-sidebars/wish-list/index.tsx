import React, { useState, useEffect, useContext } from "react";
import styles from "../style.module.scss";
import useTranslation from "next-translate/useTranslation";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
import { Bag, Heart, IconTick, SignOut } from "components/icons";
import { getCartByCartId, updateItemOfCart } from "lib/utils/cart";
import {
  fetchProductPriceByItemId,
  fetchProductsByItemId,
} from "lib/utils/product";
import { ProductType } from "lib/types/product";
import CartItem from "components/common/cart-item";
import { AppContext } from "lib/context";
import Button from "components/common/ui/button";
import { useRouter } from "next/router";
import { getInventoryAuth } from "lib/utils/inventory";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import { deleteWishList, getWishList } from "lib/utils/wishlist";
import { loginUser, logoutUser } from "lib/identity";

interface wishlistArabicData {
  wishList?: string;
  emptyNote?: string;
  signOut?: string;
  signUp?: string;
  signIn?: string;
}

const WhishListSidebar = (): JSX.Element => {
  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";
  const { priceListId, appState, allWishListProducts, setAllWishListProducts } =
    useContext(AppContext);
  const { t } = useTranslation("common");
  const [renderComponent, setRenderComponent] = useState(false);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [isLoadingCart, setisLoadingCart] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [inventoryToken, setInventoryToken] = useState("");
  const [deletingWishList, setDeletingWishList] = useState(false);
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

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" &&
      JSON.parse(window.localStorage.getItem("auth_tokens"));
    if (authToken?.access_token) {
      setIsLoginUser(true);
    } else {
      setIsLoginUser(false);
    }
  }, []);

  useEffect(() => {
    getCartData();
    // getWishListData();
    setIsWishListLoading(true);
    setRenderComponent(true);
  }, []);

  const wishlistArabicData: wishlistArabicData = t(
    "wishlistArabicData",
    {},
    { returnObjects: true }
  );

  async function getCartData() {
    const cartData = await getCartByCartId(
      "98b0ed93-aaf1-4001-b540-b61796c4663d"
    );
    if (cartData?.status === 200) {
      const cartItems = cartData?.data;
      cartItems?.items?.map((product: ProductType, index: number) => {
        const modifiedProduct = destructureAttributes(product);
        cartItems.items[index] = modifiedProduct;
      });
      cartItems?.items?.sort((a: { Brand: string }, b: { Brand: string }) => {
        if (b?.Brand === "Kenaz") return -1;
        if (a?.Brand === "Kenaz") return 1;
        return a?.Brand?.localeCompare(b?.Brand);
      });

      setCartData(cartItems);
      setisLoadingCart(false);
    } else {
      setisLoadingCart(false);
    }
  }

  async function getWishListData(wishList: [] = []) {
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
      } else {
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

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  const removeWishListItem = async (item: any) => {
    setDeletingWishList(true);
    try {
      const response = await deleteWishList(item?.itemId, authToken);
      if (response?.status === 200) {
        const wishListData = response?.data?.items;

        setAllWishListProducts(wishListData);
        typeof window !== "undefined" &&
          window.sessionStorage.setItem(
            "wishListArray",
            JSON.stringify(wishListData)
          );
      }
    } catch (err) {
      console.log("Error!");
      setDeletingWishList(false);
    }
  };

  useEffect(() => {
    getWishListData();
  }, [allWishListProducts]);

  useEffect(() => {
    if (!renderComponent) {
      authInventory();
    }
  });

  const authInventory = async () => {
    const auth = await getInventoryAuth();
    const inventoryAuth = auth?.data?.accessToken;
    setInventoryToken(inventoryAuth);
  };

  const handleSignOut = () => {
    logoutUser();
  };
  const handleSignUp = () => {
    loginUser();
  };
  const handleSignIn = () => {
    loginUser();
  };

  return (
    <>
      {renderComponent && (
        <>
          {isWishListLoading ? (
            <div className={styles.loader}>
              {appState?.lang === "en" ? "Loading..." : t("loading")}
            </div>
          ) : (
            <div
              className={
                Object.keys(wishListData).length !== 0 &&
                wishListData?.items?.length > 0
                  ? styles["filled-cart-wrapper"]
                  : styles["empty-cart"]
              }
            >
              <div className={styles.content_wrapper}>
                <div className={styles["shopabag-count"]}>
                  <Heart width="40px" height="40px" fill="#000" />
                  <Heading
                    className={`${styles["shopbag-heading"]} ${
                      Object.keys(wishListData).length !== 0 &&
                      wishListData?.items?.length > 0
                        ? styles["mb-fourty"]
                        : ""
                    }`}
                    element="h1"
                  >
                    {appState?.lang === "en"
                      ? "Wish List"
                      : wishlistArabicData?.wishList}
                  </Heading>
                  {Object.keys(wishListData).length !== 0 &&
                  wishListData?.items?.length > 0 ? null : (
                    <Label className={styles["shopbag-label"]}>
                      {appState?.lang === "en"
                        ? "View saved favorites, build-your-own charm jewelry designs and sent hints."
                        : wishlistArabicData?.emptyNote}
                    </Label>
                  )}
                </div>
                <div className={styles.minicart_items}>
                  {Object.keys(wishListData).length !== 0
                    ? wishListData?.items?.length > 0
                      ? wishListData?.items?.map((item, index) => {
                          return (
                            <>
                              <CartItem
                                wishListSideBarItem={true}
                                className="minicart-wishlist-item"
                                key={index}
                                item={item}
                                wishListItem={true}
                                productImgWidth="100px"
                                productImgHeight="100px"
                                removeItem={removeWishListItem}
                                updatingCartItem={deletingWishList}
                                getCartData={getCartData}
                              />
                              {index < wishListData?.items?.length - 1 ? (
                                <hr className={styles.divider} />
                              ) : null}
                            </>
                          );
                        })
                      : null
                    : null}
                </div>
              </div>
              <div className={styles.auth_btns}>
                {isLoginUser ? (
                  <div
                    className={styles.signout_btn}
                    onClick={() => handleSignOut()}
                  >
                    <SignOut fill="#000000" width="20px" height="20px" />
                    <span>
                      {appState?.lang === "en"
                        ? "sign out"
                        : wishlistArabicData?.signOut}
                    </span>
                  </div>
                ) : (
                  <>
                    <Button
                      buttonSize="xl"
                      buttonText={
                        appState?.lang === "en"
                          ? "Sign Up"
                          : wishlistArabicData?.signUp
                      }
                      onClick={() => handleSignUp()}
                    />
                    <Button
                      buttonText={
                        appState?.lang === "en"
                          ? "Sign In"
                          : wishlistArabicData?.signIn
                      }
                      buttonStyle="underline"
                      className={styles.signin_btn}
                      onClick={() => handleSignIn()}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default WhishListSidebar;
