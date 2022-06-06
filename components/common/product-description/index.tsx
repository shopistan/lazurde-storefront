import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import ImageSection from "./image-section";
import { ProductType } from "lib/types/product";
import RightSideDetail from "./right-side-detail";
import Reviews from "components/common/reviews/index";
import { AppContext } from "lib/context";
import { fetchProductPriceByItemId } from "lib/utils/product";
import Link from "next/link";

interface ProductDescriptionProps {
  product: ProductType;
}

const ProductDescription = ({
  product,
}: ProductDescriptionProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { priceListId } = useContext(AppContext);
  const [prodArray, setProdArray] = useState(product);
  const [imageArray, setImageArray] = useState<
    { url: string; altText: string }[]
  >([]);
  const [link, setLink] = useState("");
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const payload = {
      priceList: [priceListId],
      itemId: [product?.itemId?.toString()],
    };
    const getPrice = async () => {
      const response = await fetchProductPriceByItemId(payload);
    };
    getPrice();
  }, []);

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
    if (modifiedProdArray && modifiedProdArray?.children.length > 0) {
      modifiedProdArray?.children?.map((variant, index) => {
        modifiedProdArray?.children?.splice(
          index,
          1,
          destructureAttributes(variant)
        );
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

  useEffect(() => {
    const redriectBreadCrumbs =
      appState?.brand === `Miss L'`
        ? "/missl"
        : appState?.brand === `Kenaz`
        ? "/kenaz"
        : "/";
    redriectBreadCrumbs && setLink(redriectBreadCrumbs);
  }, [appState?.brand]);

  return (
    <>
      <div className={styles["product-description-wrapper"]}>
        <div className={styles["product-desc-breadcrumb"]}>
          <Link href={link}>
            <a className={styles["link"]}>Home</a>
          </Link>
          <div className={styles["divider"]}>/</div>
          <Link
            href={`${link}/c/${
              product && product["categories"][0]?.name?.toLocaleLowerCase()
            }`}
          >
            <a className={styles["link"]}>
              {product && product["categories"][0]?.name}
            </a>
          </Link>
        </div>
        <div className={styles["upper-section"]}>
          <div className={styles["left-side"]}>
            <ImageSection imageArray={imageArray}></ImageSection>
          </div>
          <div className={styles["right-side"]}>
            <RightSideDetail
              productData={prodArray}
              productSizeArray={prodArray?.children}
              onSizeChange={onSizeChange}
              onColorChange={onColorChange}
              totalRating={totalRating}
              currency={
                productDescriptionData?.priceData[0]?.offers?.price?.currency
              }
              basePrice={
                productDescriptionData?.priceData[0]?.offers?.price?.base
              }
              discount={
                productDescriptionData?.priceData[0]?.offers?.price?.sale
              }
              finalPrice={
                productDescriptionData?.priceData[0]?.offers?.price?.finalPrice
              }
            />
          </div>
        </div>

        <div className={styles["product-feature-detail"]}>
          <ProductDetail
            productDetail={productDescriptionData?.productDetail}
            productData={prodArray}
          />
        </div>
        <Reviews
          setTotalRating={setTotalRating}
          totalRating={totalRating}
          productData={prodArray}
        />
      </div>
    </>
  );
};

export default ProductDescription;
