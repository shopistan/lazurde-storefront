import React, { useState, useEffect, useContext } from "react";
import styles from "../style.module.scss";
import Login from "components/icons/login";
import useTranslation from "next-translate/useTranslation";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
// import SignIn from "components/common/ui/signin";
import { Bag, IconTick, SignOut } from "components/icons";
import { ProductType } from "lib/types/product";
import CartItem from "components/common/cart-item";
import { AppContext } from "lib/context";
import Button from "components/common/ui/button";
import { useRouter } from "next/router";
import { getInventoryAuth } from "lib/api/inventory";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import { logoutUser, loginUser } from "lib/identity";
import useCart from "lib/utils/cart";

interface miniCartArabicDataProps {
  addToBag?: string;
  ShoppingBag?: string;
  YourShoppingBagIsEmpty?: string;
  checkoutBtnText?: string;
  totalText?: string;
  viewBag?: string;
  signOut?: string;
  signUp?: string;
  signIn?: string;
}

const MiniCart = (): JSX.Element => {
  const { getCartByCartId, removeItemFromCart, updateItemOfCart } = useCart();
  const [width] = useWindowSize();
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    cartId,
    appState,
    openMiniCart,
  } = useContext(AppContext);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [isLoadingCart, setisLoadingCart] = useState(false);
  const [updatingCartItem, setUpdatingCartItem] = useState(false);
  const [inventoryToken, setInventoryToken] = useState("");
  const [cartData, setCartData] = useState({
    status: "",
    items: [],
    cartId: "",
    subTotal: 0.0,
    totalAmount: 0.0,
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
    setisLoadingCart(true);
    return () => {
      setisLoadingCart(false);
    };
  }, []);

  useEffect(() => {
    if (openMiniCart) {
      getCartData();
      setisLoadingCart(true);
      return () => {
        setisLoadingCart(false);
      };
    }
  }, [openMiniCart]);

  const miniCartArabicData: miniCartArabicDataProps = t(
    "miniCartArabicData",
    {},
    { returnObjects: true }
  );

  async function getCartData() {
    const cartData = await getCartByCartId(cartId);
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

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...product, ...obj };
  };

  const handleChange = async (
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
        response?.data?.items?.sort(
          (a: { Brand: string }, b: { Brand: string }) => {
            if (b.Brand === "Kenaz") return -1;
            if (a.Brand === "Kenaz") return 1;
            return a.Brand.localeCompare(b.Brand);
          }
        );
        setCartData(response?.data);
        setUpdatingCartItem(false);
      } else {
        setUpdatingCartItem(false);
      }
    } catch (err) {
      setUpdatingCartItem(false);
      // console.log("Error", err);
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

        response?.data?.items?.sort(
          (a: { Brand: string }, b: { Brand: string }) => {
            if (b.Brand === "Kenaz") return -1;
            if (a.Brand === "Kenaz") return 1;
            return a.Brand.localeCompare(b.Brand);
          }
        );
        setCartData(response?.data);
        setUpdatingCartItem(false);
      } else {
        setUpdatingCartItem(false);
      }
    } catch (err) {
      setUpdatingCartItem(false);
      // console.log("Error", err);
    }
  };

  const [renderComponent, setRenderComponent] = useState(false);
  useEffect(() => {
    if (!renderComponent) {
      authInventory();
      return;
    }
  });
  useEffect(() => {
    setRenderComponent(true);
    return () => {
      setRenderComponent(false);
    };
  }, []);

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
          {isLoadingCart ? (
            <div className={styles.loader}>
              {appState?.lang === "en" ? "Loading..." : t("loading")}
            </div>
          ) : (
            <div
              className={
                Object.keys(cartData).length !== 0 &&
                cartData?.items?.length > 0
                  ? styles["filled-cart-wrapper"]
                  : styles["empty-cart"]
              }
            >
              <div className={`${styles.content_wrapper}`}>
                <>
                  <div className={styles["shopabag-count"]}>
                    {width > desktopScreenSize &&
                    Object.keys(cartData).length !== 0 &&
                    cartData?.items?.length > 0 &&
                    openMiniCart ? (
                      <div className={styles["filled-cart"]}>
                        <IconTick
                          width="20"
                          height="20"
                          strokeWidth="1"
                          stroke="#000"
                        />
                        <Label role="addedtobag" className={styles.label}>
                          {appState?.lang === "en"
                            ? "Added to Bag"
                            : miniCartArabicData?.addToBag}
                        </Label>
                      </div>
                    ) : null}
                    <Bag width="40px" height="40px" fill="#000" />
                    <Heading
                      className={`${styles["shopbag-heading"]} ${
                        Object.keys(cartData).length !== 0 &&
                        cartData?.items?.length > 0
                          ? styles["mb-fourty"]
                          : ""
                      }`}
                      element="h1"
                      testId="shoppingbag"
                    >
                      {appState?.lang === "en"
                        ? "Shopping Bag"
                        : miniCartArabicData?.ShoppingBag}
                    </Heading>
                    {Object.keys(cartData).length !== 0 &&
                    cartData?.items?.length > 0 ? null : (
                      <Label
                        role="emptycart"
                        className={styles["shopbag-label"]}
                      >
                        {appState?.lang === "en"
                          ? "Your shopping bag is empty"
                          : miniCartArabicData?.YourShoppingBagIsEmpty}
                      </Label>
                    )}
                  </div>
                  <div className={styles.minicart_items}>
                    {Object.keys(cartData).length !== 0
                      ? cartData?.items?.length > 0
                        ? cartData?.items?.map((item, index) => {
                            return (
                              <>
                                <CartItem
                                  miniCartItem={true}
                                  className="minicart-wishlist-item"
                                  productImgWidth="100px"
                                  productImgHeight="100px"
                                  key={index}
                                  item={item}
                                  // userAuth={userAuth}
                                  inventoryToken={inventoryToken}
                                  updatingCartItem={updatingCartItem}
                                  handleChange={handleChange}
                                  removeItem={removeItem}
                                  renderComponent={renderComponent}
                                />
                                {index < cartData?.items?.length - 1 ? (
                                  <hr className={styles.divider} />
                                ) : null}
                              </>
                            );
                          })
                        : null
                      : null}
                  </div>

                  <div>
                    {Object.keys(cartData).length !== 0 &&
                    cartData?.items?.length > 0 ? (
                      <div
                        className={styles.checkout_btn_wrapper}
                        onClick={() => {
                          // console.log("handle checkout");
                        }}
                      >
                        <div className={styles.checkout_btn}>
                          <Label className={styles.total_amount}>{`${
                            appState?.lang === "en"
                              ? "Total"
                              : miniCartArabicData?.totalText
                          }: $ ${cartData?.totalAmount?.toLocaleString()}`}</Label>
                          <div className={styles.divider}>|</div>
                          <button>
                            {appState?.lang === "en"
                              ? "checkout"
                              : miniCartArabicData?.checkoutBtnText}
                          </button>
                        </div>
                        <div className={styles.viewbag_btn}>
                          <Button
                            buttonSize="lr"
                            buttonText={
                              appState?.lang === "en"
                                ? "View Bag"
                                : miniCartArabicData?.viewBag
                            }
                            buttonStyle="white"
                            onClick={() => {
                              router?.push("/cart");
                            }}
                          />
                        </div>
                      </div>
                    ) : null}
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
                              : miniCartArabicData?.signOut}
                          </span>
                        </div>
                      ) : (
                        <>
                          <Button
                            buttonSize="xl"
                            buttonText={
                              appState?.lang === "en"
                                ? "Sign Up"
                                : miniCartArabicData?.signUp
                            }
                            onClick={() => handleSignUp()}
                          />
                          <Button
                            buttonText={
                              appState?.lang === "en"
                                ? "Sign In"
                                : miniCartArabicData?.signIn
                            }
                            buttonStyle="underline"
                            className={styles.signin_btn}
                            onClick={() => handleSignIn()}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default MiniCart;
