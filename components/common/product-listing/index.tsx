import React, { useContext, useEffect, useState, useRef } from "react";
import ProductCard from "components/common/product-card/ProductCard";
import FilterBar from "./filter-sorting-bar";
import useWindowSize from "lib/utils/useWindowSize";
import FilterBarMobile from "./filter-bar-mobile";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import {
  fetchCategoryProducts,
  performFilteredSearch,
  performMultiFilteredSearch,
} from "lib/algolia";
import BreadCrumbs from "components/common/ui/bread-crumbs";
import { ImageType } from "lib/types/common";
import { desktopScreenSize } from "lib/utils/common";
import Pagination from "../ui/pagination";

interface ProductCardProps {
  index?: number;
  title?: string;
  "Image url"?: string;
  "Image URL"?: string;
  "Image URL 2"?: string;
  "Image URL 3"?: string;
  "Image URL 4"?: string;
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

type SelectedFilterProps = {
  [key: string]: {
    name: string;
    selectedOptions: { [key: string]: { selected: boolean; name: string } };
  };
};
type SortingFilterProps = {
  label: string;
  value: string;
};

interface ProductListingProps {
  pageName?: string | "";
  productDataArray: [];
  categoryName: string;
  filterList: [];
  showBreadcrumb: boolean;
  searchTerm: string;
}

const ProductListing = ({
  pageName,
  productDataArray = [],
  categoryName = "",
  filterList,
  showBreadcrumb = true,
  searchTerm = "",
}: ProductListingProps): JSX.Element => {
  const [width] = useWindowSize();
  const {
    appState,
    totalSelectedFilterCount,
    setTotalSelectedFilterCount,
    selectedFilters,
    setSelectedFilters,
    hasFilteredData,
    setHasFilteredData,
  } = useContext(AppContext);
  const { t } = useTranslation("common");
  const listingWrapper = useRef<HTMLInputElement>();
  const [initialProductData, setInitialProductData] = useState<any>([]);
  const [filteredProductData, setFilteredProductData] = useState<any>("");
  const [filteredListData, setFilteredListData] = useState<any>([]);
  const [currentProductData, setCurrentProductData] = useState([]);
  // const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  // const [hasFilteredData, setHasFilteredData] = useState(false);

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    setTotalSelectedFilterCount(0);
    setSelectedFilters({});
  }, [searchTerm]);

  useEffect(() => {
    createFilterBarList(productDataArray);
    setFilteredProductData("");

    if (productDataArray && productDataArray?.length > 0) {
      const filteredArray = productDataArray?.filter(
        (item: {
          Brand: string;
          isLazurde: string;
          isMissL: string;
          isKenaz: string;
        }) => {
          if (appState.brand === `L'azurde`) {
            return item;
          }
          if (appState.brand === `Miss L'`) {
            return item?.isMissL;
          }
          if (appState.brand === "Kenaz") {
            return item?.isKenaz;
          }
          return false;
        }
      );
      setInitialProductData([...filteredArray]);
      setCurrentProductData([...filteredArray]);
    }
  }, [productDataArray]);

  useEffect(() => {
    initialProductData &&
      initialProductData?.length > 0 &&
      createFilterBarList(initialProductData);
  }, [initialProductData]);

  useEffect(() => {
    selectedFilters &&
      filteredProductData &&
      filteredProductData.length > 0 &&
      createFilterBarList(filteredProductData);
  }, [filteredProductData]);

  const applyFilters = async (selectedFilters: SelectedFilterProps = {}) => {
    if (Object.keys(selectedFilters)?.length < 1) {
      setHasFilteredData(false);
      return null;
    }
    setHasFilteredData(true);
    let payload: any[] = [];
    const categoryArray: string[] = [];

    for (let index = 0; index < Object.keys(selectedFilters).length; index++) {
      const filterType = Object.keys(selectedFilters)[index];

      const orFilters: any[] = [];

      Object.keys(selectedFilters[filterType]?.selectedOptions)?.forEach(
        (filterOption) => {
          if (selectedFilters[filterType]?.name === "Category") {
            categoryArray.push(
              selectedFilters[filterType]?.selectedOptions[filterOption]?.name
            );
            return;
          }
          const facet = `${selectedFilters[filterType]?.name}: ${selectedFilters[filterType]?.selectedOptions[filterOption]?.name}`;
          orFilters.push(facet);
        }
      );

      payload.push(orFilters);
    }

    let filteredData: any = [];

    if (categoryArray && categoryArray.length > 0) {
      let hitsArray: any[] = [];
      const result: any = await performMultiFilteredSearch({
        categoryArray: categoryArray,
        filters: payload,
      });

      for (let index = 0; index < result.length; index++) {
        const obj = result[index];

        hitsArray = hitsArray.concat(obj.hits);
      }
      filteredData = hitsArray;
    } else {
      filteredData = await performFilteredSearch({
        query: showBreadcrumb ? categoryName : searchTerm,
        filters: payload,
      });
    }
    let filteredArray = [];
    if (filteredData.length > 0) {
      filteredArray = filteredData?.filter(
        (item: {
          Brand: string;
          isLazurde: string;
          isMissL: string;
          isKenaz: string;
        }) => {
          if (appState.brand === `L'azurde`) {
            return item;
          }
          if (appState.brand === `Miss L'`) {
            return item?.isMissL;
          }
          if (appState.brand === "Kenaz") {
            return item?.isKenaz;
          }
          return false;
        }
      );
    }
    const nonVariantArray = filteredArray.filter((item: any) => item.isVariant === false)
    filteredArray = nonVariantArray
    return filteredArray;
  };

  const onSortingChange = (sortedValue: any = {}, filterdArray: []) => {
    const pData =
      filterdArray && Array.isArray(filterdArray)
        ? filterdArray
        : initialProductData;
    const sortedArray: any[] = [];
    if (sortedValue?.value !== "most viewed") {
      return pData;
    }

    if (sortedValue?.value === "most viewed") {
      pData.map((item: any) => {
        if (item?.IsMostViewed === true) {
          sortedArray?.unshift(item);
        } else {
          sortedArray?.push(item);
        }
      });
      if (sortedArray?.length > 0) {
        return sortedArray;
      } else {
        return pData;
      }
    }
  };

  const updateProductArray = async (
    selectedFilters: SelectedFilterProps,
    sortingValue: SortingFilterProps
  ) => {
    const filteredArray: any = await applyFilters(selectedFilters);
    const sortedArray = await onSortingChange(sortingValue, filteredArray);
    setFilteredProductData(sortedArray);
  };

  const createFilterBarList = (dataArray: any[]) => {
    const newFilterList: {
      filterName: string;
      filterOptions: { optionName: string }[];
    }[] = [];
    filterList &&
      Array.isArray(filterList) &&
      filterList?.length > 0 &&
      filterList?.map((filterItem: { filterName: string }) => {
        const name = filterItem?.filterName;
        const filterOptions: { optionName: string }[] = [];

        dataArray?.map((itemData: { [key: string]: string }) => {
          if (itemData?.hasOwnProperty(name)) {
            let itemToAdd = itemData?.[name];
            let nameSplit: string[] = [];
            if (name === "Category") nameSplit = itemData?.[name].split(">");

            const nameExists = filterOptions?.find(
              (option: { optionName: string }) => {
                if (name === "Category") {
                  return option?.optionName === nameSplit[nameSplit.length - 1];
                }
                return option?.optionName === itemToAdd;
              }
            );
            if (nameExists === undefined && name === "Category") {
              itemToAdd = nameSplit[nameSplit.length - 1];
            }
            nameExists === undefined &&
              itemToAdd &&
              filterOptions.push({ optionName: itemToAdd });
          }
        });
        if (filterOptions.length > 0) {
          newFilterList.push({
            filterName: name,
            filterOptions: filterOptions,
          });
        }
      });
    setFilteredListData(newFilterList);
  };

  const scrollToTop = () => {
    const header = document.getElementById("main-header");
    const headerHeight = header.getBoundingClientRect().height;
    const elementTop = listingWrapper?.current.offsetTop;
    document.body.scroll({
      top: elementTop - headerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={listingWrapper} className={styles["product-listing__wrapper"]}>
        {showBreadcrumb && <BreadCrumbs pageName={pageName} />}

        <Pagination
          pKey={productDataArray}
          paginationClass={styles["div-pagination"]}
          defaultPageNumber={1}
          pageSize={5}
          totalSize={
            Array.isArray(filteredProductData)
              ? filteredProductData?.length
              : initialProductData?.length
          }
          dataArray={
            Array.isArray(filteredProductData)
              ? filteredProductData
              : initialProductData
          }
          onInitialize={(slicedArray: []) => {
            setCurrentProductData(slicedArray);
          }}
          onPageUp={(slicedArray: []) => {
            scrollToTop();
            setCurrentProductData(slicedArray);
          }}
          onPageDown={(slicedArray: []) => {
            scrollToTop();
            setCurrentProductData(slicedArray);
          }}
        >
          <>
            {width <= desktopScreenSize ? (
              <FilterBarMobile
                onApplyFilters={updateProductArray}
                onSortingChange={updateProductArray}
                onClear={updateProductArray}
                filterList={filteredListData}
                hasFilteredData={hasFilteredData}
              ></FilterBarMobile>
            ) : (
              <FilterBar
                onApplyFilters={updateProductArray}
                onSortingChange={updateProductArray}
                onClear={updateProductArray}
                filterList={filteredListData}
                hasFilteredData={hasFilteredData}
              ></FilterBar>
            )}
            <div className={styles["product-listing__cards"]}>
              {currentProductData && currentProductData?.length > 0 ? (
                currentProductData?.map(
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
                        {
                          url: data["Image URL"] || data["Image url"],
                          altText: "",
                        },
                      ],
                      onlineExclusiveTag = data["Online Exclusive"],
                    } = data;

                    if (data["Image URL 2"]) {
                      productCardImages?.push({
                        url: data["Image URL 2"] || "",
                        altText: "",
                      });
                    }
                    if (data["Image URL 3"]) {
                      productCardImages?.push({
                        url: data["Image URL 3"] || "",
                        altText: "",
                      });
                    }
                    if (data["Image URL 4"]) {
                      productCardImages?.push({
                        url: data["Image URL 4"] || "",
                        altText: "",
                      });
                    }
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
              ) : (
                <div className={styles["div-no-items"]}>
                  <span>no items found</span>
                </div>
              )}
            </div>
          </>
        </Pagination>
      </div>
    </>
  );
};

export default ProductListing;
