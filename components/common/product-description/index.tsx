import React from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";

const ProductDescription = () => {
  return (
    <div className={styles["product-description-wrapper"]}>
      <ProductDetail productDetail={productDescriptionData?.productDetail} />
    </div>
  );
};

export default ProductDescription;
