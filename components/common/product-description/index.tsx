import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import NotifyMeModal from "./notify-me-modal";
import SizeChart from "./product-size";
import ImageSection from "./image-section";
import { ProductType } from "lib/types/product";
import RightSideDetail from "./right-side-detail";

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

  const destructureAttributes = (product: ProductType) => {
    const obj: { [key: string]: string } = {};
    product?.attributes?.map((attr: any) => {
      obj[attr?.name] = attr?.value;
    });
    setProdArray({ ...prodArray, ...obj });
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
    destructureAttributes(prodArray);
  }, []);

  useEffect(() => {
    if (prodArray?.hasOwnProperty("Image URL")) {
      getImageArray(prodArray);
    }
  }, [prodArray]);

  const onSizeChange = (val: number) => {
    console.log("sizevalue", val);
  };

  return (
    <div className={styles["product-description-wrapper"]}>
      <div className={styles["upper-section"]}>
        <div className={styles["left-side"]}>
          <ImageSection imageArray={imageArray}></ImageSection>
        </div>
        <div className={styles["right-side"]}>
          <RightSideDetail
            productSizeArray={productDescriptionData?.productSizeArray}
            onSizeChange={onSizeChange}
          />
        </div>
      </div>

      <ProductDetail productDetail={productDescriptionData?.productDetail} />
      {notifyModalOpen && (
        <NotifyMeModal
          isOpened={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDescription;
