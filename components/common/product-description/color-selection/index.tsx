import React from "react";
import styles from "../style.module.scss";
import Label from "components/common/ui/label";

const ProductColorSelection = () => {
  return (
    <>
      <div className={styles["color-selection-wrapper"]}>
        <Label className={styles["color-heading"]}>Select Size</Label>
      </div>
    </>
  );
};
export default ProductColorSelection;
