import Button from "components/common/ui/button";
import ButtonATC from "components/common/ui/button-add-to-cart";
import React from "react";
import SizeChart from "../product-size";
import styles from "./right-side-detail.module.scss";

interface RightSideDetailProps {
  onSizeChange?: Function;
  productSizeArray?: { sizeValue?: string }[];
}

const RightSideDetail = ({
  onSizeChange,
  productSizeArray = [],
}: RightSideDetailProps): JSX.Element => {
  return (
    <>
      <SizeChart
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
      <div className={styles['div-cart-buttons']}>
        <ButtonATC
          buttonSize={"xxxl"}
          buttonText={"Add To Cart"}
          showCounter={true}
        ></ButtonATC>
        <Button
        className={styles['book-apt-btn']}
          buttonSize={"xxxl"}
          buttonText={"Book An Appointment"}
          buttonStyle="black"
        ></Button>
      </div>
    </>
  );
};
export default RightSideDetail;
