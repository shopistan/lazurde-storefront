import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import NotifyMeModal from "./right-side-detail/notify-me-modal";
import ImageSection from "./image-section";
import { ProductType } from "lib/types/product";
import RightSideDetail from "./right-side-detail";
import Reviews from "components/common/reviews/index";

interface ProductDescriptionProps {
  product: ProductType;
}



const ProductDescription = ({
  product,
}: ProductDescriptionProps): JSX.Element => {
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [prodArray, setProdArray] = useState(product);
  const [imageArray, setImageArray] = useState<
    { url: string; altText: string }[]
  >([]);
  const [totalRating, setTotalRating] = useState(0);

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    return { ...prodArray, ...obj };
  };

  const getImageArray = (product: any) => {
    const imageArray: { url: string; altText: string }[] = [];
    Object.keys(product).map((attr: any) => {
      if (attr?.includes("Image URL")) {
        imageArray.push({ url: product[attr], altText: "" });
      }
    });
    setImageArray(imageArray);
  };

  useEffect(() => {
    let modifiedProdArray = destructureAttributes(prodArray);

    if (modifiedProdArray?.children.length > 0) {
      modifiedProdArray?.children.map((variant, index) => {
        modifiedProdArray?.children.splice(index, 1, destructureAttributes(variant))
      });
    }

    setProdArray(modifiedProdArray);
  }, []);

  useEffect(() => {
    if (prodArray?.hasOwnProperty("Image URL")) {
      getImageArray(prodArray);
    }
  }, [prodArray]);

  const onSizeChange = (val: number) => {
    console.log("sizevalue", val);
  };

  const onColorChange = (val: number) => {
    console.log("colroValue", val);
  };

  return (
    <>
      <div className={styles["product-description-wrapper"]}>
        <div className={styles["upper-section"]}>
          <div className={styles["left-side"]}>
            <ImageSection imageArray={imageArray}></ImageSection>
          </div>
          <div className={styles["right-side"]}>
            <RightSideDetail
              productSizeArray={prodArray?.children}
              onSizeChange={onSizeChange}
              onColorChange={onColorChange}
              totalRating={totalRating}
            />
          </div>
        </div>

        <div className={styles["product-feature-detail"]}>
          <ProductDetail
            productDetail={productDescriptionData?.productDetail}
          />
        </div>
        <Reviews setTotalRating={setTotalRating} totalRating={totalRating} />
      </div>
      {notifyModalOpen && (
        <NotifyMeModal
          isOpened={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductDescription;
