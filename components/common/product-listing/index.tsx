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
import { desktopScreenSize } from "lib/utils/common";
import Pagination from "../ui/pagination";

interface ProductCardProps {
  index?: number;
  title?: string;
  "Image 1 URL"?: string;
  "Base Price"?: number | string;
  "Online Exclusive"?: boolean;
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
  pageName?: string | '' | [];
  productDataArray: [];
  categoryName: string;
  filterList: [];
  showBreadcrumb: boolean;
}

const ProductListing = ({
  pageName,
  productDataArray = [],
  categoryName = "",
  filterList,
  attributeFilters,
  showBreadcrumb = true,
}: ProductListingProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const dummyProductData = productCardData || [];
  const [initialProductData, setInitialProductData] = useState<any>([]);
  const [filteredProductData, setFilteredProductData] = useState<any>([]);

  const [currentProductData, setCurrentProductData] = useState([]);

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    // console.log(
    //   "something",
    //   fetchCategoryProducts({
    //     categoryName: "",
    //   })
    // );
    // const str = `Lazurde,Miss'l`
    // console.log("something", str.toLowerCase().includes(`miss'l`), productDataArray)
    // const arr = productDataArray.filter((item) => {
    //   if(appState.brand === `L'azurde`) {
    //     return item
    //   }
    //   if(appState.brand === `Miss L'`) {
    //     return item?.Brand?.toLowerCase().includes(`miss'l`)
    //   }
    //   if(appState.brand === "Kenaz") {
    //     return item?.Brand?.toLowerCase().includes("kenaz")
    //   }
    //   return false
    // })
    // console.log("something",arr)
    // console.log(performFilteredSearch({ filters: [`Gold`] }));
    // console.log("categoryName",categoryName)

    const filteredArray = productDataArray.filter((item: { Brand: string }) => {
      if (appState.brand === `L'azurde`) {
        return item;
      }
      if (appState.brand === `Miss L'`) {
        return (
          item?.Brand?.toLowerCase().includes(`miss`) ||
          item?.Brand?.toLowerCase().includes(`miss'l`) ||
          item?.Brand?.toLowerCase().includes(`miss l'`)
        );
      }
      if (appState.brand === "Kenaz") {
        return item?.Brand?.toLowerCase().includes("kenaz");
      }
      return false;
    });
    setInitialProductData([...filteredArray]);
    setCurrentProductData([...filteredArray]);
  }, [productDataArray]);

  const applyFilters = async (selectedFilters: any = {}) => {
    if (Object.keys(selectedFilters).length < 1) {
      return setFilteredProductData([]);
    }

    let payload: any[] = [];

    Object.keys(selectedFilters).forEach((filterType, index) => {
      const orFilters: any[] = [];

      Object.keys(selectedFilters[filterType]?.selectedOptions).forEach(
        (filterOption) => {
          const facet = `${selectedFilters[filterType]?.name}: ${selectedFilters[filterType]?.selectedOptions[filterOption]?.name}`;
          orFilters.push(facet);
        }
      );

      payload.push(orFilters);
    });

    // console.log("categoryName", categoryName);
    // payload = ["isMain: true"];
    const filteredData = await performFilteredSearch({ query: "", filters: payload });
    // const filteredData: [] = [];
    setFilteredProductData(filteredData);

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
        {showBreadcrumb && <BreadCrumbs pageName= {attributeFilters} />}

        <Pagination
          paginationClass={styles["div-pagination"]}
          defaultPageNumber={1}
          pageSize={5}
          totalSize={filteredProductData.length > 0 ? filteredProductData.length : initialProductData.length}
          dataArray={filteredProductData.length > 0 ? filteredProductData : initialProductData}
          onInitialize={(slicedArray: []) => {
            setCurrentProductData(slicedArray);
          }}
          onPageUp={(slicedArray: []) => {
            setCurrentProductData(slicedArray);
          }}
          onPageDown={(slicedArray: []) => {
            setCurrentProductData(slicedArray);
          }}
        >
          <>
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
                        { url: data["Image 1 URL"], altText: "" },
                      ],
                      onlineExclusiveTag = data['Online Exclusive'],
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
          </>
        </Pagination>
      </div>
    </>
  );
};

export default ProductListing;
