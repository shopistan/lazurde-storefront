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
    label: "Our Recommendation",
    value: "Our Recommendation",
  },
  {
    label: "Most Viewed",
    value: "most viewed",
  },
  {
    label: "Best Sellers Online",
    value: "Best Sellers Online",
  },
  {
    label: "Best Sellers Store",
    value: "Best Sellers Store",
  },
  {
    label: "Price - Low to High",
    value: "Price - Low to High",
  },
  {
    label: "Price - High to Low",
    value: "Price - High to Low",
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

type optionProps = { label?: string; img?: string; value?: string };

type FilterListProps = {
  filterName: string;
  filterOptions: { optionName: string }[];
};

type SelectedFilterProps = {
  [key: string]: {
    name: string;
    selectedOptions: { [key: string]: { selected: boolean; name: string } };
  };
};
interface FilterBarProps {
  filterList?: FilterListProps[] | [];
  headerId?: string;
  onApplyFilters?: Function;
  onSortingChange?: Function;
  onClear?: Function;
  hasFilteredData: Boolean;
}

interface DropdownDataProps {
  filterName: string;
  filterIndex: number;
  dropdownData: {
    optionName: string;
  }[];
  positionOffset: string;
}

const FilterBar: FC<FilterBarProps> = ({
  headerId = "",
  filterList = filterListData,
  onApplyFilters = () => { },
  onSortingChange = () => { },
  onClear = () => { },
  hasFilteredData = false,
}): JSX.Element => {
  const {
    appState,
    totalSelectedFilterCount,
    setTotalSelectedFilterCount,
    selectedFilters,
    setSelectedFilters,
  } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [currentSortingValue, setCurrentSortingValue] = useState<any>("");

  const onApplyButtonClick = (selectedFilter: SelectedFilterProps) => {
    onApplyFilters(selectedFilter, currentSortingValue);
  };

  let link: any = useRef([1, 2, 3, 4, 5, 6, 7].map(() => React.createRef()));

  const _arabicFilterBarData = t(
    "arabicFilterList",
    {},
    { returnObjects: true }
  );

  const _arabicSortingFilter: optionProps[] = t(
    "sortingFilter",
    {},
    { returnObjects: true }
  );

  const [currentFilterList, setCurrentFilterList] = useState<FilterListProps[]>(
    filterList
  );
  const [isOpened, setIsOpened] = useState({ opened: false, selected: "" });
  const [dropdownData, setDropdownData] = useState<DropdownDataProps>();
  // const [listLoading, setListLoading] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState<SelectedFilterProps>();
  // const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const [linkRefs, setLinkRefs] = useState(link);
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
          filterTitle &&
          Object.keys(selectedFilters[filterTitle]?.selectedOptions).length;
        totalCount = Number(totalCount) + Number(count);
        setTotalSelectedFilterCount(totalCount);
      }
    } else {
      setTotalSelectedFilterCount(0);
    }
  }, [selectedFilters]);

  useEffect(() => {
    setCurrentSortingValue("");
    setSelectedFilters({});
    setOptionData({
      data: _arabicSortingFilter,
      defaultValue:
        appState?.lang === "en" ? "Our Recommendation" : "our recommendation",
    });

    if (appState.lang === "en") {
      setCurrentFilterList([...filterList]);
    } else {
      // setCurrentFilterList(_arabicFilterBarData);
    }
  }, [appState]);

  useEffect(() => {
    setCurrentFilterList([...filterList]);
    setLinkRefs(link);
    // setListLoading(false)
  }, [filterList]);

  useEffect(() => {
    if (isOpened.opened) {
      const currentFilter = currentFilterList.find((item) => item?.filterName === isOpened?.selected)
      const currentFilterIndex = currentFilterList.findIndex((item) => item?.filterName === isOpened?.selected)
      setDropdownData({
        filterName: currentFilter?.filterName,
        filterIndex: currentFilterIndex,
        dropdownData: currentFilter?.filterOptions,
        positionOffset:
          appState?.lang === "en"
            ? linkRefs?.current[
              currentFilterIndex
            ]?.current?.getBoundingClientRect().left
            : width -
            linkRefs?.current[
              currentFilterIndex
            ]?.current?.getBoundingClientRect().right -
            17.4,
      });
    }
  }, [currentFilterList]);

  return (
    <div key={currentFilterList.length} className={styles["filter-bar-main"]} data-header-id={headerId}>
      <div className={styles["div-filter-bar"]}>
        <div className={styles["filter-links"]}>
          {Array.isArray(currentFilterList) &&
            currentFilterList.length > 0 &&
            currentFilterList.map((data, index) => {
              if(!data) return
              const hasCategories = true;
              const selectedFilterCount = selectedFilters?.[index]
                ? Object.keys(selectedFilters?.[index]?.selectedOptions).length
                : 0;

              return (
                <div
                  role={"links"}
                  key={`${index}-${data?.filterOptions?.length}`}
                  className={styles["links"]}
                  ref={
                    linkRefs && linkRefs?.current
                      ? linkRefs?.current[index]
                      : null
                  }
                  data-has-count={selectedFilterCount > 0}
                  onMouseOver={(event) => {
                    event.stopPropagation();

                    if (hasCategories) {
                      setIsOpened({ opened: true, selected: data?.filterName });
                      setDropdownData({
                        filterName: data?.filterName,
                        filterIndex: index,
                        dropdownData: data?.filterOptions,
                        positionOffset:
                          appState?.lang === "en"
                            ? linkRefs?.current[
                              index
                            ]?.current?.getBoundingClientRect().left
                            : width -
                            linkRefs?.current[
                              index
                            ]?.current?.getBoundingClientRect().right -
                            17.4,
                      });
                    } else {
                      setIsOpened({ opened: false, selected: data?.filterName });
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasCategories) {
                      setIsOpened({ opened: false, selected: data?.filterName });
                    } else {
                      setIsOpened({ opened: false, selected: "-1" });
                    }
                  }}
                  data-selected={
                    hasCategories
                      ? isOpened?.opened === true &&
                      isOpened?.selected === data?.filterName
                      : isOpened?.selected === data?.filterName
                  }
                >
                  <span>{data?.filterName}</span>
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
          data-has-count={hasFilteredData || totalSelectedFilterCount > 0}
        >
          <Button
            buttonText={appState?.lang === "en" ? "Clear All Filters" : "مسح"}
            buttonStyle={"underline"}
            buttonSize={"sm"}
            onClick={() => {
              setSelectedFilters && setSelectedFilters({});
              onClear && onClear({}, currentSortingValue);
            }}
          />
        </div>
        <div
          className={styles["div-order-dropdown"]}
          data-opened={isOpened?.opened}
        >
          <BorderlessSelect
            options={_arabicSortingFilter}
            defaultValue={optionData?.defaultValue}
            selectedLabel={appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}
            onChange={(value: { label: string; value: string }) => {
              setCurrentSortingValue(value);
              onSortingChange && onSortingChange(selectedFilters, value);
            }}
          ></BorderlessSelect>
        </div>
      </div>

      <div
        key={dropdownData?.dropdownData.length}
        className={styles["category-dropdown"]}
        data-opened={isOpened?.opened}
      >
        <DropDown
          setIsOpened={setIsOpened}
          categoryData={dropdownData}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          onApplyFilters={onApplyButtonClick}
          hasFilteredData={hasFilteredData}
          // listLoading={listLoading}
          // setListLoading={setListLoading}
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
