import React, { FC, useContext, useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import DropDown from "./dropdown";
import BorderlessSelect from "components/common/ui/borderless-select";
import Button from "components/common/ui/button";
import useWindowSize from "lib/utils/useWindowSize";

const optionsData = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Best Sellers",
    value: "Best Sellers",
  },
  {
    label: "Biggest Saving",
    value: "Biggest Saving",
  },
  {
    label: "Most Viewed",
    value: "Most Viewed",
  },
  {
    label: "Product Name",
    value: "Product Name",
  },
];

const filterListData = [
  {
    filterName: "Brand",
    filterOptions: [
      {
        optionName: "Brand 1",
      },
      {
        optionName: "Brand 2",
      },
    ],
  },
  {
    filterName: "Type",
    filterOptions: [
      {
        optionName: "Two headed",
      },
      {
        optionName: "Solitaire",
      },
      {
        optionName: "Twins",
      },
      {
        optionName: "Bands",
      },
      {
        optionName: "Eternity",
      },
    ],
  },
  {
    filterName: "Metal",
    filterOptions: [
      {
        optionName: "Gold",
      },
      {
        optionName: "White Gold",
      },
    ],
  },
  {
    filterName: "Gemstone",
    filterOptions: [
      {
        optionName: "Diamond",
      },
    ],
  },
  {
    filterName: "Price",
    filterOptions: [
      {
        optionName: "100",
      },
      {
        optionName: "200",
      },
    ],
  },
];

interface FilterBarProps {
  filterList?:
    | {
        filterName: string;
        filterOptions: { optionName: string }[];
      }[]
    | [];
  headerId?: string;
  onApplyFilters?: Function;
  onSortingChange?: Function;
}

interface DropdownDataProps {
  filterName: string;
  dropdownData: {
    optionName: string;
  }[];
  positionOffset: string;
}

const FilterBar: FC<FilterBarProps> = ({
  headerId = "",
  filterList = filterListData,
  onApplyFilters = () => {},
  onSortingChange = () => {},
}): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const link: any = useRef(
    Array.isArray(filterList) &&
      filterList.length > 0 &&
      filterList.map(() => React.createRef())
  );

  const _arabicFilterBarData = t(
    "arabicFilterList",
    {},
    { returnObjects: true }
  );
  const _arabicSortingFilter = t("sortingFilter", {}, { returnObjects: true });

  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [dropdownData, setDropdownData] = useState<DropdownDataProps>();
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: { [key: string]: string };
  }>();
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const [width] = useWindowSize();
  const [optionData, setOptionData] = useState<{
    data?: any;
    defaultValue?: string;
  }>();

  useEffect(() => {
    let totalCount = 0;
    if (selectedFilters && Object.keys(selectedFilters).length > 0) {
      for (
        let index = 0;
        index < Object.keys(selectedFilters).length;
        index++
      ) {
        const filterTitle = Object.keys(selectedFilters)[index];
        const count =
          filterTitle && Object.keys(selectedFilters[filterTitle]).length;
        totalCount = Number(totalCount) + Number(count);
        setTotalSelectedFilterCount(totalCount);
      }
    } else {
      setTotalSelectedFilterCount(0);
    }
  }, [selectedFilters]);

  useEffect(() => {
    setOptionData({
      data: appState?.lang === "en" ? optionsData : _arabicSortingFilter,
      defaultValue: appState?.lang === "en" ? "Best Sellers" : "أفضل البائعين",
    });
  }, [appState]);

  return (
    <div className={styles["filter-bar-main"]} data-headerid={headerId}>
      <div className={styles["div-filter-bar"]}>
        <div className={styles["filter-links"]}>
          {Array.isArray(filterList) &&
            filterList.length > 0 &&
            filterList.map((data, index) => {
              const hasCategories = true;
              const selectedFilterCount = selectedFilters?.[data?.filterName]
                ? Object.keys(selectedFilters?.[data?.filterName]).length
                : 0;

              return (
                <div
                  role={"links"}
                  key={index}
                  className={styles["links"]}
                  ref={link.current[index]}
                  data-has-count={selectedFilterCount > 0}
                  onMouseOver={(event) => {
                    event.stopPropagation();

                    if (hasCategories) {
                      setIsOpened({ opened: true, selected: index });
                      setDropdownData({
                        filterName:
                          appState?.lang === "en"
                            ? data?.filterName
                            : Array.isArray(_arabicFilterBarData) &&
                              _arabicFilterBarData.length > 0 &&
                              _arabicFilterBarData[index]?.filterName,
                        dropdownData:
                          appState?.lang === "en"
                            ? data?.filterOptions
                            : Array.isArray(_arabicFilterBarData) &&
                              _arabicFilterBarData.length > 0 &&
                              _arabicFilterBarData[index]?.filterOptions,
                        positionOffset:
                          appState?.lang === "en"
                            ? link?.current[
                                index
                              ]?.current?.getBoundingClientRect().left
                            : width -
                              link?.current[
                                index
                              ]?.current?.getBoundingClientRect().right -
                              17.4,
                      });
                    } else {
                      setIsOpened({ opened: false, selected: index });
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasCategories) {
                      setIsOpened({ opened: false, selected: index });
                    } else {
                      setIsOpened({ opened: false, selected: -1 });
                    }
                  }}
                  data-selected={
                    hasCategories
                      ? isOpened?.opened === true &&
                        isOpened?.selected === index
                      : isOpened?.selected === index
                  }
                >
                  <span>
                    {appState?.lang === "en"
                      ? data?.filterName
                      : Array.isArray(_arabicFilterBarData) &&
                        _arabicFilterBarData.length > 0 &&
                        _arabicFilterBarData[index]?.filterName}
                  </span>
                  <div data-visible={selectedFilterCount > 0}>
                    <span>
                      {selectedFilterCount > 0 && selectedFilterCount}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={styles["div-clear-btn"]}
          data-opened={isOpened?.opened}
          data-has-count={totalSelectedFilterCount > 0}
        >
          <Button
            buttonText={appState?.lang === "en" ? "Clear All Filters" : "مسح"}
            buttonStyle={"white"}
            buttonSize={"sm"}
            onClick={() => {
              setSelectedFilters && setSelectedFilters({});
              onApplyFilters && onApplyFilters({});
            }}
          />
        </div>
        <div
          className={styles["div-order-dropdown"]}
          data-opened={isOpened?.opened}
        >
          <BorderlessSelect
            options={optionData?.data}
            defaultValue={optionData?.defaultValue}
            selectedLabel={appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}
            onChange={onSortingChange}
          ></BorderlessSelect>
        </div>
      </div>

      <div
        className={styles["category-dropdown"]}
        data-opened={isOpened?.opened}
      >
        <DropDown
          setIsOpened={setIsOpened}
          categoryData={dropdownData}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          onApplyFilters={onApplyFilters}
        ></DropDown>
      </div>
      <div
        role={"overlay"}
        className={styles["overlay"]}
        data-opened={isOpened?.opened}
        onClick={() => setIsOpened({ ...isOpened, opened: false })}
      ></div>
    </div>
  );
};

export default FilterBar;
