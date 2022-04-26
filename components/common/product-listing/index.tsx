import React, { useContext } from "react";
import ProductCard from "components/common/product-card/ProductCard";
import { productCardData } from "lib/mock-data/data";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

type Props = {};

const ProductListing = (props: Props) => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  return (
    <>
      {/* <div>ProductListing</div> */}
      <div className={styles["product-listing__wrapper"]}>
        <div className={styles["product-listing__cards"]}>
          {productCardData &&
            productCardData.length > 0 &&
            productCardData?.map((data, index) => {
              const {
                title,
                basePrice,
                discount,
                discountedPrice,
                images = [],
                onlineExclusiveTag,
              } = data;
              return (
                <>
                  <ProductCard
                    title={
                      appState?.lang === "en"
                        ? title
                        : Array.isArray(_arabicProductCardData) &&
                          _arabicProductCardData.length > 0 &&
                          _arabicProductCardData[index]?.title
                    }
                    basePrice={basePrice}
                    discount={discount}
                    discountedPrice={discountedPrice}
                    productCardImages={images}
                    onlineExclusiveTag={onlineExclusiveTag}
                    index={index}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
