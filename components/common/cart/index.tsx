import React from "react";
import styles from "./cart.module.scss";
import CartItem from "components/common/cart-item";
import { cartItems } from "lib/mock-data/data";

interface CartProps {}
const Cart = ({}: CartProps): JSX.Element => {
  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["flex-wrap"]}>
        <div className={styles["shipping-column"]}>
          <div className={styles["free-shipping-card"]}>
            <div>
              <span>Free Shipping for Members</span>
              <p>
                Become a L’azurde member for fast and free shipping. Join Us or
                Sign In
              </p>
            </div>
            <div>{/* <Image /> */}X</div>
          </div>
          <div className={styles["bag-wrapper"]}>
            <span>Bag</span>
            {cartItems?.map((item, index) => {
              return <CartItem key={index} item={item} />;
            })}
          </div>
        </div>
        <div className={styles["summary-card"]}>
          <span>Summary</span>
          <div className={styles["order-details"]}>
            <div>
              <span>Subtotal</span>
              <span data-amount={true}>$265.00</span>
            </div>
            <div>
              <span>Estimated Shipping &amp; Handling</span>
              <span data-amount={true}>$265.00</span>
            </div>
            <div>
              <span>VAT Tax</span>
              <span data-amount={true}>$125.00</span>
            </div>
          </div>
          <hr className={styles["horizontal-divider"]} />
          <div className={styles["order-details"]}>
            <div>
              <span data-amount={true}>Total to Pay</span>
              <span data-amount={true}>$265.00</span>
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
            <button className={styles["apple-pay-btn"]}>Pay</button>
            <button className={styles["paypal-btn"]}>Paypal</button>
          </div>
        </div>
      </div>
      <div className={styles["flex-wrap"]}>
        <div className={styles["bag-wrapper"]}>
          <span>Your WishList</span>
          {cartItems?.map((item, index) => {
            return <CartItem key={index} item={item} />;
          })}
        </div>
        <div>
          <h1>Need help?</h1>
        </div>
      </div>
    </div>
  );
};

export default Cart;
