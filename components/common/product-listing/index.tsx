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
type Props = {};

const ProductListing = (props: Props) => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [filteredData, setFilteredData] = useState([])

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    console.log(
      fetchCategoryProducts({
        categoryName: "L'azurde > Earrings",
      })
    );
    // console.log(performFilteredSearch({ filters: [`Gold`] }));
  }, []);

  const applyFilters = (selectedFilters: any) => {
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

    //const filteredData = performFilteredSearch({filters: payload})
    const filteredData = []
    // setFilteredData(filteredData)
  };

  return (
    <>
      <div className={styles["product-listing__wrapper"]}>
        <BreadCrumbs />

        {width < 1024 ? (
          <FilterBarMobile></FilterBarMobile>
        ) : (
          <FilterBar onApplyFilters={applyFilters}></FilterBar>
        )}
        <div className={styles["product-listing__cards"]}>
          {productCardData &&
            productCardData.length > 0 &&
            productCardData?.map((data: any, index: number) => {
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
