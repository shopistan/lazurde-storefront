import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Login from "components/icons/login";
import useTranslation from "next-translate/useTranslation";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";
// import SignIn from "components/common/ui/signin";
import { Bag, IconTick, SignOut } from "components/icons";
import {
  getCartByCartId,
  removeItemFromCart,
  updateItemOfCart,
} from "lib/utils/cart";
import { ProductType } from "lib/types/product";
import CartItem from "components/common/cart-item";
import { AppContext } from "lib/context";
import Button from "components/common/ui/button";
import { useRouter } from "next/router";
import { getInventoryAuth } from "lib/utils/inventory";

const MiniCart = (): JSX.Element => {
  const [loggedInUser, setLoggedInUser] = useState(true);
  const router = useRouter();
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
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
    getCartData();
    setisLoadingCart(true);
  }, []);

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
      console.log("Error", err);
    }
  };

  const [renderComponent, setRenderComponent] = useState(false);
  useEffect(() => {
    if (!renderComponent) {
      authInventory();
    }
  });
  useEffect(() => {
    setRenderComponent(true);
  }, []);

  const authInventory = async () => {
    const auth = await getInventoryAuth();
    const inventoryAuth = auth?.data?.accessToken;
    setInventoryToken(inventoryAuth);
  };

  const handleSignOut = () => {
    console.log("signout");
  };
  const handleSignUp = () => {
    console.log("signup");
  };
  const handleSignIn = () => {
    console.log("signin");
  };

  return (
    <>
      {renderComponent && (
        <>
          <div className={styles.content_wrapper}>
            <div className={styles["shopabag-count"]}>
              {Object.keys(cartData).length !== 0 &&
              cartData?.items?.length > 0 ? (
                <div className={styles["filled-cart"]}>
                  <IconTick
                    width="20"
                    height="20"
                    strokeWidth="1"
                    stroke="#000"
                  />
                  <Label className={styles.label}>Added to Bag</Label>
                </div>
              ) : null}
              <Bag width="40px" height="40px" fill="#000" />
              <Heading className={styles["shopbag-heading"]} element="h1">
                Shopping Bag
              </Heading>
              {Object.keys(cartData).length !== 0 &&
              cartData?.items?.length > 0 ? null : (
                <Label className={styles["shopbag-label"]}>
                  Your shopping bag is empty
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
                            className="mini-cart-item"
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
            {Object.keys(cartData).length !== 0 &&
            cartData?.items?.length > 0 ? (
              <div
                className={styles.checkout_btn_wrapper}
                onClick={() => {
                  console.log("handle checkout");
                }}
              >
                <div className={styles.checkout_btn}>
                  <Label
                    className={styles.total_amount}
                  >{`Total: $${cartData?.totalAmount?.toLocaleString()}`}</Label>
                  <div className={styles.divider}>|</div>
                  <button>checkout</button>
                </div>
                <div className={styles.viewbag_btn}>
                  <Button
                    buttonSize="lr"
                    buttonText={"View Bag"}
                    buttonStyle="white"
                    onClick={() => {
                      router?.push("/cart");
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className={styles.auth_btns}>
            {loggedInUser ? (
              <div
                className={styles.signout_btn}
                onClick={() => handleSignOut()}
              >
                <SignOut fill="#000000" width="20px" height="20px" />
                <span>sign out</span>
              </div>
            ) : (
              <>
                <Button
                  buttonSize="xl"
                  buttonText="Sign Up"
                  onClick={() => handleSignUp()}
                />
                <Button
                  buttonText={"Sign In"}
                  className={styles.signin_btn}
                  onClick={() => handleSignIn()}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default MiniCart;
