import React, { FC } from "react";
import styles from "./Product-card.module.css";
import Image from "next/image";

interface ProductCartPorps {
  title: string | null;
  description: string;
  price: Number;
}

const ProductCard: FC<ProductCartPorps> = ({
  title,
  description,
  price,
}): JSX.Element => {
  return (
    <div className={styles["product-card"]} data-testid="product-card">
      <div className={styles["logo-cart"]}>
        <Image
          src="/public/placeholder.jpg"
          alt="logo"
          className={styles["logo-cart-img"]}
          layout="fill"
        />
        <i className="bx bx-shopping-bag"></i>
      </div>
      <div className={styles["main-images"]}>
        <Image
          id="blue"
          className={styles["blue active"]}
          src="/public/favicon.ico"
          alt="blue"
          layout="fill"
        />
      </div>
      <div>
        <span className={styles["title-h"]} data-testid='test-title'>{title || "Title Here"}</span>
        <p className="shoe-details-p">{description || "Description Here"}</p>
      </div>
      <div className="color-price">
        <div className="price">
          <span className="price_num">{`Price: $${price || 0.0}`}</span>
        </div>
      </div>
      <div className="button">
        <button className={styles["button-1"]}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;