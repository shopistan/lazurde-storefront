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

interface CartProps {}
const Cart = ({}: CartProps): JSX.Element => {
  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU0MTUzMzYxLCJleHAiOjE2NTQxNTUxNjF9.FLBjzjjR3g1zreH03aIE9B92H5y1HL6RfhwoePFbKeASfqq2RcyGqkKiexRTELDTPMOJEa9XXklsqfaegYS-fKrEXoIjjHv4KpolommWzaSINL5C__zljx7QZtF5sRtyYKPPlwEcuPtdMJTCERIfyDIHsMF4oehEVvN-cd6DwOA";
  const { priceListId } = useContext(AppContext);
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
  });
  const [isLoadingCart, setisLoadingCart] = useState(false);
  const [isWishListLoading, setIsWishListLoading] = useState(false);
  const [updatingCartItem, setUpdatingCartItem] = useState(false);
  const [deletingWishList, setDeletingWishList] = useState(false);

  async function getWishListData() {
    // setDeletingWishList(false);
    setIsWishListLoading(true);
    const wishListData = await getWishList(authToken);
    if (wishListData?.status === 200) {
      const itemIds = wishListData?.data?.items;
      console.log("itemsids", itemIds);
      const getItemsbyItemIds = await fetchProductsByItemId(itemIds || []);
      const payload = {
        priceList: [priceListId],
        itemId: itemIds || [],
      };
      const response = await fetchProductPriceByItemId(payload);
      console.log("res", response);
      if (getItemsbyItemIds?.status === 200) {
        setIsWishListLoading(false);
        setWishListData({
          status: "",
          cartId: cartData?.cartId || null,
          items: getItemsbyItemIds?.data?.products,
        });
      } else setIsWishListLoading(false);
    } else {
      setIsWishListLoading(false);
    }
  }

  async function getCartData() {
    setisLoadingCart(true);
    const cartData = await getCartByCartId(
      "98b0ed93-aaf1-4001-b540-b61796c4663d"
    );
    if (cartData?.status === 200) {
      setCartData(cartData?.data);
      setisLoadingCart(false);
    } else {
      setisLoadingCart(false);
    }
  }

  useEffect(() => {
    getCartData();
    getWishListData();
  }, []);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
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
          quantity: Number(e.target.value),
          itemId: item?.itemId,
        },
      ],
    };
    try {
      const response = await updateItemOfCart(cartData?.cartId, payload);
      if (response?.status === 200) {
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
        getWishListData();
      }
      setDeletingWishList(false);
    } catch (err) {
      console.log("Error!");
      setDeletingWishList(false);
    }
  };

  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["flex-wrap"]}>
        <div className={styles["shipping-column"]}>
          {freeShipping && (
            <div className={styles["free-shipping-card"]}>
              <div>
                <span>Free Shipping for Members</span>
                <span className={styles["para"]}>
                  Become a L’azurde member for fast and free shipping. Join Us
                  or Sign In
                </span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => showFreeShipping(false)}
              >
                <CrossSmall width={12} height={12} />
              </div>
            </div>
          )}
          <div className={styles["bag-wrapper"]}>
            <span>Bag</span>
            {isLoadingCart ? (
              <div>Loading...</div>
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
                            updatingCartItem={updatingCartItem}
                            handleChange={handleChange}
                            removeItem={removeItem}
                          />
                          {index < cartData?.items?.length - 1 && <hr />}
                        </>
                      );
                    })
                  ) : (
                    <div>No Cart Data Found!</div>
                  )
                ) : (
                  <div>No Cart Data Found!</div>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles["summary-card"]}>
          <span>Summary</span>
          <div className={styles["order-details"]}>
            <div>
              <span>Subtotal</span>
              <span data-amount={true}>
                {cartData?.subTotal?.toLocaleString()}
              </span>
            </div>
            <div>
              <span>Estimated Shipping &amp; Handling</span>
              <span data-amount={true}>$0.00</span>
            </div>
            <div>
              <span>VAT Tax</span>
              <span data-amount={true}>$0.00</span>
            </div>
          </div>
          <hr className={styles["horizontal-divider"]} />
          <div className={styles["order-details"]}>
            <div>
              <span data-amount={true}>Total to Pay</span>
              <span
                data-amount={true}
              >{`$${cartData?.totalAmount?.toLocaleString()}`}</span>
            </div>
          </div>
          <hr className={styles["horizontal-divider"]} />
          <button className={styles["checkout-button"]}>Checkout</button>
          <div className={styles["half-divider"]}>
            <hr />
            <span data-divider={true}>Or Continue with</span>
            <hr />
          </div>
          <div className={styles["external-btns"]}>
            <button className={styles["apple-pay-btn"]}>
              <AppleButton />
            </button>
            <button className={styles["paypal-btn"]}>
              <PaypalButton />
            </button>
          </div>
        </div>
        {/* <div className={styles["flex-wrap"]}> */}
        <div className={styles["bag-wrapper"]}>
          <span>Your WishList</span>
          {isWishListLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {Object.keys(wishListData).length !== 0 ? (
                wishListData?.items?.length ? (
                  wishListData?.items?.map((item, index) => {
                    return (
                      <>
                        <CartItem
                          key={index}
                          item={item}
                          wishListItem={true}
                          removeItem={removeWishListItem}
                          updatingCartItem={deletingWishList}
                        />
                        {index < wishListData?.items?.length - 1 && <hr />}
                      </>
                    );
                  })
                ) : (
                  <div>No Cart Data Found!</div>
                )
              ) : (
                <div>No Cart Data Found!</div>
              )}
              {/* <div>No Data Found!</div> */}
            </>
          )}
        </div>
        <div className={styles["need-help-wrapper"]}>
          <hr className={styles["bold-line"]} />
          <div className={styles["need-help-heading"]}>
            <span>Need help ?</span>
            <a>Help Center</a>
          </div>
          <div>
            {[1, 2, , 3, 4]?.map((index) => {
              return <p key={index}>Lorem ipsum dolor sit </p>;
            })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Cart;
