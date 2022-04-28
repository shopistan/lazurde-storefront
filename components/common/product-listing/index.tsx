import React, { useContext, useEffect, useState } from "react";
import ProductCard from "components/common/product-card/ProductCard";
import { productCardData } from "lib/mock-data/data";
import FilterBar from "./filter-sorting-bar";
import useWindowSize from "lib/utils/useWindowSize";
import FilterBarMobile from "./filter-bar-mobile";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import { fetchCategoryProducts, performFilteredSearch } from "lib/algolia";
import BreadCrumbs from "components/common/ui/bread-crumbs";
import { ImageType } from "lib/types/common";

interface ProductCardProps {
  index?: number;
  title?: string;
  "Image URL"?: string;
  "Base Price"?: number | string;
  basePrice?: number | string;
  discount?: string;
  discountAmount?: number | string;
  productCardImages?: ImageType[];
  onlineExclusiveTag?: boolean;
  sku?: string;
  itemId?: string;
  priceListId?: string;
  currency?: string;
}

interface ProductListingProps {
  productDataArray: [];
  categoryHierarchy: string[];
}

const ProductListing = ({
  productDataArray = [],
  categoryHierarchy = [],
}: ProductListingProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [currentProductData, setCurrentProductData] = useState(
    [...productDataArray, ...productCardData] || []
  );

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    // console.log(
    //   fetchCategoryProducts({
    //     categoryName: "L'azurde > Earrings",
    //   })
    // );
    // console.log(performFilteredSearch({ filters: [`Gold`] }));
    // console.log("categoryHierarchy",categoryHierarchy)
  }, []);

  const applyFilters = (selectedFilters: any = {}) => {
    if (Object.keys(selectedFilters).length < 1) {
      return setCurrentProductData([...productDataArray, ...productCardData]);
    }

    const payload = [];

    Object.keys(selectedFilters).forEach((filterType, index) => {
      const orFilters: any[] = [];

      Object.keys(selectedFilters[filterType]).forEach((filterOption) => {
        const facet = `${filterType}: ${filterOption}`;
        orFilters.push(facet);
      });

      payload.push(orFilters);
    });

    // console.table(payload);

    // const filteredData = performFilteredSearch({query: categoryHierarchy[0], filters: payload})
    const filteredData: [] = [];
    setCurrentProductData(filteredData);
  };

  const onSortingChange = (sortedValue: any = {}) => {
    console.log("sortedValue", sortedValue);
    

    // if (sortedValue.length < 1) {
    //   return setCurrentProductData(productDataArray);
    // }

    // const payload = [];

    // Object.keys(sortedValue).forEach((filterType, index) => {
    //   const orFilters: any[] = [];
    //   Object.keys(sortedValue[filterType]).forEach((filterOption) => {
    //     const facet = `${filterType}: ${filterOption}`;
    //     orFilters.push(facet);
    //   });
    //   payload.push(orFilters);
    // });

    // console.table(payload);

    //const filteredData = performFilteredSearch({filters: payload})
    const filteredData: [] = [];
    setCurrentProductData(filteredData);
  };

  return (
    <>
      <div className={styles["product-listing__wrapper"]}>
        <BreadCrumbs />

        {width < 1024 ? (
          <FilterBarMobile
            onApplyFilters={applyFilters}
            onSortingChange={onSortingChange}
          ></FilterBarMobile>
        ) : (
          <FilterBar
            onApplyFilters={applyFilters}
            onSortingChange={onSortingChange}
          ></FilterBar>
        )}
        <div className={styles["product-listing__cards"]}>
          {currentProductData && currentProductData.length > 0
            ? currentProductData?.map(
                (data: ProductCardProps, index: number) => {
                  const {
                    sku,
                    itemId,
                    priceListId,
                    currency,
                    title,
                    basePrice = data["Base Price"],
                    discount,
                    discountAmount,
                    productCardImages = [
                      { url: data["Image URL"], altText: "" },
                    ],
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
                        sku={sku}
                        itemId={itemId}
                        priceListId={priceListId}
                        currency={currency}
                        basePrice={basePrice}
                        discount={discount}
                        discountAmount={discountAmount}
                        productCardImages={productCardImages}
                        onlineExclusiveTag={onlineExclusiveTag}
                        index={index}
                      />
                    </>
                  );
                }
              )
            : ""}
        </div>
      </div>
    </>
  );
};

export default ProductListing;
