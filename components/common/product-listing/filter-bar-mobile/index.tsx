import React, { FC, useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import BorderlessSelect from "components/common/ui/borderless-select";
import Accordion from "components/common/ui/accordion/Accordion";
import Button from "components/common/ui/button";
import SortingModal from "./sorting-modal";
import { AppContext } from "lib/context";
import DropDown from "./dropdown";

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
        optionName: "SOmething",
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
        optionName: "SOmething",
      },
    ],
  },
  {
    filterName: "Gemstone",
    filterOptions: [
      {
        optionName: "SOmething",
      },
    ],
  },
  {
    filterName: "Price",
    filterOptions: [
      {
        optionName: "SOmething",
      },
    ],
  },
];

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

interface FilterBarMobileProps {
  filterList?: FilterListProps[];
  headerId?: string;
  onApplyFilters: Function;
  onSortingChange: Function;
  onClear: Function;
}
interface FilterAccordionProps {
  filterList: FilterListProps[] | string;
  setIsOpened: Function;
  selectedFilters: SelectedFilterProps;
  setSelectedFilters: Function;
  setTotalSelectedFilterCount: Function;
  totalSelectedFilterCount: number;
  onApplyButtonClick: Function;
  onClear: Function;
  sortingSelected: string;
}

const FilterBarMobile: FC<FilterBarMobileProps> = ({
  filterList = filterListData,
  onApplyFilters = () => {},
  onSortingChange = () => {},
  onClear = () => {},
}): JSX.Element => {
  const { t } = useTranslation("common");
  const _arabicSortingFilter = t("sortingFilter", {}, { returnObjects: true });
  const _arabicFilterBarData = t(
    "arabicFilterList",
    {},
    { returnObjects: true }
  );
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [sortingSelected, setSortingSelected] = useState("Our Recommendation");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterProps>(
    {}
  );
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const [optionData, setOptionData] = useState<any>([]);
  const [currentFilterList, setCurrentFilterList] = useState<
    string | FilterListProps[]
  >(filterList);

  // useEffect(() => {
  //   sortingSelected &&
  //     onSortingChange &&
  //     onSortingChange(selectedFilters, { value: sortingSelected });
  // }, [sortingSelected]);

  const onApplyButtonClick = (selectedFilter: SelectedFilterProps) => {
    onApplyFilters(selectedFilter, { value: sortingSelected });
  };

  useEffect(() => {
    setSortingSelected(
      appState?.lang === "en" ? "Our Recommendation" : "أفضل البائعين"
    );
    setOptionData({
      data: appState?.lang === "en" ? optionsData : _arabicSortingFilter,
      defaultValue:
        appState?.lang === "en" ? "Our Recommendation" : "أفضل البائعين",
    });

    if (appState.lang === "en") {
      setCurrentFilterList(filterList);
    } else {
      setCurrentFilterList(_arabicFilterBarData);
    }
  }, [appState]);

  useEffect(() => {
    setCurrentFilterList(filterList);
  }, [filterList]);

  return (
    <div className={styles["filter-bar_wrapper"]}>
      <div className={styles["filter-bar_items"]}>
        <div className={styles["filter-bar_item"]}>
          <BorderlessSelect
            className={"filter-mobile-select"}
            onChange={() => {}}
            selectedLabel={
              <FilterCounter
                appState={appState}
                count={totalSelectedFilterCount}
              />
            }
            showInModal={true}
            modalChildren={
              <FilterAccordion
                filterList={currentFilterList}
                setIsOpened={setIsOpened}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setTotalSelectedFilterCount={setTotalSelectedFilterCount}
                totalSelectedFilterCount={totalSelectedFilterCount}
                onApplyButtonClick={onApplyButtonClick}
                onClear={onClear}
                sortingSelected={sortingSelected}
              ></FilterAccordion>
            }
          ></BorderlessSelect>
        </div>
        <div
          className={styles["filter-bar_item"]}
          data-opened={isOpened?.opened}
        >
          <BorderlessSelect
            className={styles["filter-mobile-select"]}
            options={optionData?.data}
            onChange={() => {}}
            defaultValue={optionData?.defaultValue}
            selectedLabel={appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}
            showInModal={true}
            selectedValue={sortingSelected}
            modalChildren={
              <SortingModal
                sortingDataArray={optionData?.data}
                defaultValue={optionData?.defaultValue}
                selectedVal={sortingSelected}
                onChange={(value: string) => {
                  setSortingSelected(value);
                  onSortingChange(selectedFilters, { value: value });
                }}
              ></SortingModal>
            }
          ></BorderlessSelect>
        </div>
      </div>
    </div>
  );
};

export default FilterBarMobile;

const FilterAccordion = ({
  filterList,
  setIsOpened,
  selectedFilters,
  setSelectedFilters,
  setTotalSelectedFilterCount,
  totalSelectedFilterCount,
  onApplyButtonClick,
  onClear,
  sortingSelected,
}: FilterAccordionProps): JSX.Element => {
  const { appState } = useContext(AppContext);

  return (
    <>
      {Array.isArray(filterList) &&
        filterList.length > 0 &&
        filterList.map((data, index) => {
          const selectedFilterCount = selectedFilters?.[index]
            ? Object.keys(selectedFilters?.[index]?.selectedOptions).length
            : 0;
          return (
            <Accordion
              key={index}
              heading={
                <div className={styles["div-counter"]}>
                  <span className={styles["filter-name"]}>
                    {data?.filterName}
                  </span>
                  <div data-visible={selectedFilterCount > 0}>
                    <span>
                      {selectedFilterCount > 0 && selectedFilterCount}
                    </span>
                  </div>
                </div>
              }
              links={data?.filterOptions}
              arrowIcon={false}
            >
              <DropDown
                key={index}
                setIsOpened={setIsOpened}
                categoryData={{
                  dropdownData: data?.filterOptions,
                  filterName: data?.filterName,
                  filterIndex: index,
                }}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setTotalSelectedFilterCount={setTotalSelectedFilterCount}
              ></DropDown>
            </Accordion>
          );
        })}

      <div
        className={styles["div-filter-btns"]}
        data-has-count={totalSelectedFilterCount > 0}
      >
        <Button
          buttonText={appState?.lang === "en" ? "Clear All Filters" : "مسح"}
          buttonStyle={"white"}
          buttonSize={"sm"}
          onClick={() => {
            setSelectedFilters && setSelectedFilters({});
            onClear && onClear({}, { value: sortingSelected });
          }}
        />
        <Button
          buttonText={`${appState?.lang === "en" ? "Apply" : "يتقدم"} ${
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : ""
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
          onClick={() => {
            onApplyButtonClick(selectedFilters);
          }}
        />
      </div>
    </>
  );
};

const FilterCounter = ({
  appState,
  count = 0,
}: {
  appState: { lang: String };
  count: Number;
}): JSX.Element => {
  return (
    <div className={styles["div-counter"]}>
      <span>{appState?.lang === "en" ? "Filter: " : "منقي:"}</span>
      <div data-visible={count > 0}>
        <span>{count > 0 && count}</span>
      </div>
    </div>
  );
};
