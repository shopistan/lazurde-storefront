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
import { desktopScreenSize } from 'lib/utils/common'

interface ProductCardProps {
  index?: number;
  title?: string;
  "Image URL"?: string;
  "Base Price"?: number | string;
  basePrice?: number | string;
  discount?: string;
  discountedPrice?: number | string;
  productCardImages?: ImageType[];
  onlineExclusiveTag?: boolean;
  sku?: string;
  itemId?: string;
  priceListId?: string;
  currency?: string;
}

interface ProductListingProps {
  productDataArray: [];
  categoryName: string;
  filterList: [];
}

const ProductListing = ({
  productDataArray = [],
  categoryName = "",
  filterList,
}: ProductListingProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const dummyProductData = productCardData || [];
  const [currentProductData, setCurrentProductData] = useState(
    [...productDataArray, ...dummyProductData] || []
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
    // console.log("categoryName",categoryName)
  }, []);

  const applyFilters = (selectedFilters: any = {}) => {
    if (Object.keys(selectedFilters).length < 1) {
      return setCurrentProductData([...productDataArray, ...dummyProductData]);
    }

    let payload = [];

    Object.keys(selectedFilters).forEach((filterType, index) => {
      const orFilters: any[] = [];

      Object.keys(selectedFilters[filterType]?.selectedOptions).forEach((filterOption) => {
        const facet = `${selectedFilters[filterType]?.name}: ${selectedFilters[filterType]?.selectedOptions[filterOption]?.name}`;
        orFilters.push(facet);
      });

      payload.push(orFilters);
    });

    // console.log("categoryName", categoryName);
    // payload = ["isMain: true"];
    // const filteredData = performFilteredSearch({ query: "", filters: payload });
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

        {width <= desktopScreenSize ? (
          <FilterBarMobile
            onApplyFilters={applyFilters}
            onSortingChange={onSortingChange}
            filterList={filterList}
          ></FilterBarMobile>
        ) : (
          <FilterBar
            onApplyFilters={applyFilters}
            onSortingChange={onSortingChange}
            filterList={filterList}
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
                  discountedPrice,
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
                      discountAmount={discountedPrice}
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
