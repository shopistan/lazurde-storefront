import React, { FC } from "react";
import { ImageObject } from "lib/types/common";
import styles from "./Product-card.module.css";
import Image from "next/image";

interface ProductCartPorps {
  image: ImageObject,
  title: string;
  description: string;
  price: Number;
}

const ProductCard: FC<ProductCartPorps> = ({
  image,
  title,
  description,
  price,
}): JSX.Element => {
  return (
    <div className={styles["product-card"]} data-testid="product-card">
      <div className={styles["logo-cart"]}>
        <Image
          src={image.url || '/public/placeholder.jpg'}
          alt={image.altText || "logo"}
          className={styles["logo-cart-img"]}
          layout="fill"
        />
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