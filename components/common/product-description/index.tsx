import React, { useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import NotifyMeModal from "./notify-me-modal";
import SizeChart from "./product-size";

const ProductDescription = () => {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const onSizeChange = (val: number) => {
    console.log("sizevalue", val);
  };

  return (
    <div className={styles["product-description-wrapper"]}>
      <button onClick={() => setNotifyModalOpen(true)}>click me</button>

      <ProductDetail productDetail={productDescriptionData?.productDetail} />

      {notifyModalOpen && (
        <NotifyMeModal
          isOpened={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
        />
      )}

      <SizeChart
        productSizeArray={productDescriptionData?.productSizeArray}
        onSizeChange={onSizeChange}
      />
    </div>
  );
};

export default ProductDescription;
