import WriteAReview from "components/common/reviews/write-review";
import Button from "components/common/ui/button";
import Label from "components/common/ui/label";
import StarRating from "components/common/ui/star-ratings";
import { Heart } from "components/icons";
import React, { useState } from "react";
// import ProductColorSelection from "../color-selection";
import SizeChart from "../size-selection";
import ButtonATC from "components/common/ui/button-add-to-cart";
import styles from "./right-side-detail.module.scss";

interface RightSideDetailProps {
  onSizeChange?: Function;
  productSizeArray?: { sizeValue?: string }[];
  totalRating?: number;
}

const RightSideDetail = ({
  onSizeChange,
  productSizeArray = [],
  totalRating = 0,
}: RightSideDetailProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles["detail"]}>
        <Label className={styles["collection-tag"]}>Collection</Label>
        <Label className={styles["title"]}>Tiffany T Diamond Gold Ring</Label>
        <div className={styles["review-section"]}>
          <div className={styles["wishlist-icon"]}>
            <Heart fill="#000" stroke="#000" />
          </div>
          <div className={styles["rating-stars"]}>
            <StarRating count={5} rating={totalRating} />
          </div>
          <div className={styles["write-review-btn"]}>
            <Button
              onClick={() => setModalOpen(true)}
              className={styles["btn"]}
            >
              write a review
            </Button>
          </div>
        </div>
      </div>
      <SizeChart
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
      {/* <ProductColorSelection /> */}
      {modalOpen && (
        <WriteAReview
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
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
