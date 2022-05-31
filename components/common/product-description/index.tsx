import React, { useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import NotifyMeModal from "./notify-me-modal";

const ProductDescription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={styles["product-description-wrapper"]}>
      <button onClick={() => setModalOpen(true)}>click me</button>
      <ProductDetail productDetail={productDescriptionData?.productDetail} />

      {modalOpen && (
        <NotifyMeModal
          isOpened={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDescription;
