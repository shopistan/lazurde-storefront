import React from "react";
import styles from "./style.module.scss";
import Heading from "components/common/ui/heading";
import Label from "components/common/ui/label";

interface ProductDetailProps {
  productDetail?: string;
  metal?: string;
  diamond?: string;
  stone?: string;
  pendantSize?: string;
  charmSize?: string;
  chainLength?: string;
  rignSize?: string;
  earringSize?: string;
  ankletSize?: string;
  braceletSize?: string;
  styleNumber?: string;
  brand?: string;
  collection?: string;
}

const ProductDetail = ({
  productDetail,
  metal = "18K White Gold",
  diamond = "18K White Gold",
  stone = "18K White Gold",
  pendantSize = "18K White Gold",
  charmSize = "18K White Gold",
  chainLength = "",
  rignSize = "",
  earringSize = "",
  ankletSize = "",
  braceletSize = "",
  styleNumber = "KP701276SB",
  brand = `L'azurde`,
  collection = "lorem ipsum",
}: ProductDetailProps): JSX.Element => {
  return (
    <>
      <div className={styles["detail-wrapper"]}>
        <div className={`${styles["column"]} ${styles["left-side"]}`}>
          <Heading
            element="h3"
            className={styles["heading"]}
          >{`Designer’s Notes`}</Heading>
          <p className={styles["detail"]}>{productDetail}</p>
        </div>
        <div className={`${styles["column"]} ${styles["right-side"]}`}>
          <Heading
            element="h3"
            className={styles["heading"]}
          >{`Product Details`}</Heading>
          <div className={styles["detail-features"]}>
            {metal && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>metal</Label>
                <Label className={styles["description"]}>{metal}</Label>
              </div>
            )}
            {diamond && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>diamond</Label>
                <Label className={styles["description"]}>{diamond}</Label>
              </div>
            )}
            {stone && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>stone</Label>
                <Label className={styles["description"]}>{stone}</Label>
              </div>
            )}
            {pendantSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Pendant Size</Label>
                <Label className={styles["description"]}>{pendantSize}</Label>
              </div>
            )}
            {charmSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>charm Size</Label>
                <Label className={styles["description"]}>{charmSize}</Label>
              </div>
            )}
            {chainLength && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Chain Length</Label>
                <Label className={styles["description"]}>{chainLength}</Label>
              </div>
            )}
            {rignSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Pendant Size</Label>
                <Label className={styles["description"]}>{rignSize}</Label>
              </div>
            )}
            {earringSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Pendant Size</Label>
                <Label testId="earing" className={styles["description"]}>
                  {earringSize}
                </Label>
              </div>
            )}
            {braceletSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Pendant Size</Label>
                <Label className={styles["description"]}>{braceletSize}</Label>
              </div>
            )}
            {ankletSize && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Pendant Size</Label>
                <Label className={styles["description"]}>{ankletSize}</Label>
              </div>
            )}
            {collection && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Collection</Label>
                <Label className={styles["description"]}>{collection}</Label>
              </div>
            )}
            {brand && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Brand</Label>
                <Label className={styles["description"]}>{brand}</Label>
              </div>
            )}
            {styleNumber && (
              <div className={styles["feature-item"]}>
                <Label className={styles["title"]}>Style Number</Label>
                <Label className={styles["description"]}>{styleNumber}</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
