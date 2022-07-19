import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./style.module.scss";
import ProductDetail from "./product-detail";
import { productDescriptionData } from "lib/mock-data/data";
import ImageSection from "./image-section";
import { ProductType } from "lib/types/product";
import RightSideDetail from "./right-side-detail";
import Reviews from "components/common/reviews/index";
import { AppContext } from "lib/context";
import Link from "next/link";
import { getInventoryByIds, getInventoryAuth } from "lib/api/inventory";
import Spinner from "../ui/spinner";

interface ProductDescriptionProps {
  product: ProductType;
}

const destructureAttributes = (product: ProductType) => {
  const obj: { [key: string]: string } = {};
  product?.attributes?.map((attr: any) => {
    obj[attr?.name] = attr?.value;
  });
  return { ...product, ...obj };
};

const ProductDescription = ({
  product,
}: ProductDescriptionProps): JSX.Element => {
  const { appState, priceListId } = useContext(AppContext);
  const [prodArray, setProdArray] = useState<ProductType | any>([]);
  const [imageArray, setImageArray] = useState<
    { url: string; altText: string }[]
  >([]);
  const [link, setLink] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [isRatingError, setIsRatingError] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const redriectBreadCrumbs =
      appState?.brand === `Miss L'`
        ? "/missl"
        : appState?.brand === `Kenaz`
        ? "/kenaz"
        : "/";
    redriectBreadCrumbs && setLink(redriectBreadCrumbs);
  }, [appState?.brand]);

  useLayoutEffect(() => {
    // const itemIds = [];
    let modifiedProdArray = [];
    modifiedProdArray.push(destructureAttributes(product));
    // itemIds.push(modifiedProdArray.itemId);
    if (modifiedProdArray?.[0] && modifiedProdArray[0]?.children.length > 0) {
      modifiedProdArray[0]?.children?.map((variant, index) => {
        // modifiedProdArray?.children?.splice(
        //   index,
        //   1,
        //   destructureAttributes(variant)
        // );
        modifiedProdArray?.push(destructureAttributes(variant));
        // itemIds.push(variant.itemId);
      });
    }
    setProdArray(modifiedProdArray);

    // const getProductInventory = async (itemIds: number[]) => {
    //   const userData = await getInventoryAuth();

    //   const authToken =
    //     userData?.data?.accessToken ||
    //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWRiMjliMGM0NjQ4MDM2YTI0NWZjMCIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MjVkYjI5YWRlZTBlMjAwMDliMmRhNGQiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sInRlbmFudElkIjoiNjFhNTEwZmEzN2JiNjQwMDA5YWNmNTVlIiwiaXNzdWVyIjoiNTczNzg1OTIzMjI0IiwiaWF0IjoxNjU1Mzg0MTUzLCJleHAiOjE2NTUzODU5NTN9.W3PtK3P0VUST_btUg_vR8gCoAwNUezTw1EpCiYS5VBHqu063Q1eQLUONZsbjIfrxO6X9PlWJi-S2Uxmlvpd302XupGTRatfEfJN4L6RSgFQ_gFbU_DI7HZ5JNXnZ0M92ozvZtzR91gRZ874iujUZJgvKzg6zd_Smnh37SuM2RvU";
    //   const id = itemIds[0];
    //   const itemId = Number(id);
    //   const inventoryData = await getInventoryByIds(authToken, itemId);
    //   if (modifiedProdArray.itemId === itemId) {
    //     modifiedProdArray["hasStock"] =
    //       inventoryData?.data?.inventory.length > 0 &&
    //       inventoryData?.data?.inventory[0]?.counters?.["on-hand"] > 0;
    //   } else {
    //     modifiedProdArray?.children?.map((item) => {
    //       if (item.itemId === itemId) {
    //         item["hasStock"] =
    //           inventoryData?.data?.inventory.length > 0 &&
    //           inventoryData?.data?.inventory[0]?.counters?.["on-hand"] > 0;
    //       }
    //     });
    //   }
    //   setProdArray(modifiedProdArray);
    // };
    // getProductInventory(itemIds);
  }, [product]);

  useEffect(() => {
    if (prodArray[0]?.hasOwnProperty("Image URL")) {
      getImageArray(prodArray[0]);
    }
  }, [prodArray]);

  const getImageArray = (product: any) => {
    const imageArray: { url: string; altText: string }[] = [];
    Object.keys(product).map((attr: any) => {
      if (attr?.includes("Image URL")) {
        imageArray.push({ url: product[attr], altText: "" });
      }
    });
    setImageArray(imageArray);
  };

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
            {prodArray && prodArray.length > 0 ? (
              <RightSideDetail
                productData={prodArray}
                productSizeArray={prodArray[0]?.children}
                totalRating={totalRating}
                setIsRatingError={setIsRatingError}
                isRatingError={isRatingError}
                priceListId={priceListId}
                setIsloading={setIsloading}
              />
            ) : null}
          </div>
        </div>

        <div className={styles["product-feature-detail"]}>
          <ProductDetail
            productDetail={productDescriptionData?.productDetail}
            productData={prodArray[0]}
          />
        </div>
        <Reviews
          setTotalRating={setTotalRating}
          totalRating={totalRating}
          productData={prodArray[0]}
          setIsRatingError={setIsRatingError}
          isRatingError={isRatingError}
        />
      </div>
    </>
  );
};

export default ProductDescription;
