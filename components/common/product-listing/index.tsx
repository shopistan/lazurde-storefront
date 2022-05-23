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
}

const ProductListing = ({
  pageName,
  productDataArray = [],
  categoryName = "",
  filterList,
  showBreadcrumb = true,
}: ProductListingProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const dummyProductData = productCardData || [];
  const [initialProductData, setInitialProductData] = useState<any>([]);
  const [filteredProductData, setFilteredProductData] = useState<any>("");
  const [filteredListData, setFilteredListData] = useState<any>([]);
  const [currentProductData, setCurrentProductData] = useState([]);

  const _arabicProductCardData = t(
    "arabicProductCardData",
    {},
    { returnObjects: true }
  );

  useEffect(() => {
    createFilterBarList();
    setFilteredProductData("");
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

  const applyFilters = async (selectedFilters: SelectedFilterProps = {}) => {
    if (Object.keys(selectedFilters).length < 1) {
      // setFilteredProductData("");
      return null;
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
    const filteredData = await performFilteredSearch({
      query: categoryName,
      filters: payload,
    });
    // const filteredData: [] = [];
    // setFilteredProductData(filteredData);
    return filteredData;
  };

  const onSortingChange = (sortedValue: any = {}, filterdArray: [] = []) => {
    const pData =
      filterdArray && filterdArray.length > 0
        ? filterdArray
        : initialProductData && initialProductData.length > 0
        ? initialProductData
        : productDataArray;
    const sortedArray: any[] = [];
    if (sortedValue.value !== "most viewed") {
      // setFilteredProductData(checkFilteredData);
      return pData;
    }

    if (sortedValue.value === "most viewed") {
      pData.map((item: any) => {
        if (item.IsMostViewed === true) {
          sortedArray.unshift(item);
        } else {
          sortedArray.push(item);
        }
      });
      if (sortedArray.length > 0) {
        // setFilteredProductData(sortedArray);
        return sortedArray;
      } else {
        // setFilteredProductData(pData);
        return pData;
      }
    }

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
    // const filteredData: [] = [];
    // setCurrentProductData(filteredData);
  };

  const updateProductArray = async (
    selectedFilters: SelectedFilterProps,
    sortingValue: SortingFilterProps
  ) => {
    const filteredArray: any = await applyFilters(selectedFilters);
    const sortedArray = await onSortingChange(sortingValue, filteredArray);
    setFilteredProductData(sortedArray);
  };

  const createFilterBarList = () => {
    const newFilterList: {
      filterName: string;
      filterOptions: { optionName: string }[];
    }[] = [];
    filterList.length > 0 &&
      filterList.map((filterItem: { filterName: string }) => {
        const name = filterItem.filterName;
        const filterOptions: { optionName: string }[] = [];
        productDataArray.map((itemData: { [key: string]: string }) => {
          if (itemData.hasOwnProperty(name)) {
            const nameExists = filterOptions.find(
              (option: { optionName: string }) => {
                return option.optionName === itemData[name];
              }
            );
            nameExists === undefined &&
              itemData[name] &&
              filterOptions.push({ optionName: itemData[name] });
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

  return (
    <>
      <div className={styles["product-listing__wrapper"]}>
        {showBreadcrumb && <BreadCrumbs pageName={pageName} />}

        <Pagination
          pKey={initialProductData}
          paginationClass={styles["div-pagination"]}
          defaultPageNumber={1}
          pageSize={5}
          totalSize={
            Array.isArray(filteredProductData)
              ? filteredProductData.length
              : initialProductData.length
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
            setCurrentProductData(slicedArray);
          }}
          onPageDown={(slicedArray: []) => {
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
              ></FilterBarMobile>
            ) : (
              <FilterBar
                onApplyFilters={updateProductArray}
                onSortingChange={updateProductArray}
                onClear={updateProductArray}
                filterList={filteredListData}
              ></FilterBar>
            )}
            <div className={styles["product-listing__cards"]}>
              {currentProductData && currentProductData.length > 0 ? (
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
