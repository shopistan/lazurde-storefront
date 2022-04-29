import React, { FC, useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import BorderlessSelect from "components/common/ui/borderless-select";
import Accordion from "components/common/ui/accordion2/Accordion";
import Button from "components/common/ui/button";
import SortingModal from "./sorting-modal";
import { AppContext } from "lib/context";
import DropDown from "./dropdown";

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

interface FilterBarMobileProps {
  filterList?: {
    filterName: string;
    filterOptions: { optionName: string }[];
  }[];
  headerId?: string;
  onApplyFilters: Function;
  onSortingChange: Function;
}
interface FilterAccordionProps {
  filterList: {
    filterName: string;
    filterOptions: { optionName: string }[];
  }[];
  setIsOpened: Function;
  selectedFilters: {
    [key: string]: { [key: string]: string };
  };
  setSelectedFilters: Function;
  setTotalSelectedFilterCount: Function;
  totalSelectedFilterCount: number;
  onApplyFilters: Function;
}

const FilterBarMobile: FC<FilterBarMobileProps> = ({
  filterList = filterListData,
  onApplyFilters = () => {},
  onSortingChange = () => {},
}): JSX.Element => {
  const { t } = useTranslation("common");
  const _arabicSortingFilter = t("sortingFilter", {}, { returnObjects: true });

  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [sortingSelected, setSortingSelected] = useState("Best Sellers");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: { [key: string]: string };
  }>({});
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const [optionData, setOptionData] = useState<any>([]);

  useEffect(() => {
    setSortingSelected(appState?.lang === "en" ? "Best Sellers" : "أفضل البائعين")
    setOptionData({
      data: appState?.lang === "en" ? optionsData : _arabicSortingFilter,
      defaultValue: appState?.lang === "en" ? "Best Sellers" : "أفضل البائعين",
    });
  }, [appState]);

  return (
    <div className={styles["filter-bar_wrapper"]}>
      <div className={styles["filter-bar_items"]}>
        <div className={styles["filter-bar_item"]}>
          <BorderlessSelect
            className={"filter-mobile-select"}
            onChange={() => {}}
            selectedLabel={appState?.lang === "en" ? "Filter: " : "منقي:"}
            showInModal={true}
            modalChildren={
              <FilterAccordion
                filterList={filterList}
                setIsOpened={setIsOpened}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setTotalSelectedFilterCount={setTotalSelectedFilterCount}
                totalSelectedFilterCount={totalSelectedFilterCount}
                onApplyFilters={onApplyFilters}
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
                  onSortingChange(value);
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
  onApplyFilters,
}: FilterAccordionProps): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const _arabicFilterBarData = t(
    "arabicFilterList",
    {},
    { returnObjects: true }
  );
  return (
    <>
      {Array.isArray(filterList) &&
        filterList.length > 0 &&
        filterList.map((data, index) => {
          const selectedFilterCount = selectedFilters?.[data.filterName]
            ? Object.keys(selectedFilters?.[data.filterName]).length
            : 0;
          return (
            <Accordion
              key={index}
              heading={
                <div className={styles["div-counter"]}>
                  <span className={styles["filter-name"]}>
                    {appState?.lang === "en"
                      ? data.filterName
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
              }
              links={data?.filterOptions}
              arrowIcon={false}
            >
              <DropDown
                key={index}
                setIsOpened={setIsOpened}
                categoryData={{
                  dropdownData:
                    appState?.lang === "en"
                      ? data?.filterOptions
                      : Array.isArray(_arabicFilterBarData) &&
                        _arabicFilterBarData.length > 0
                      ? _arabicFilterBarData[index]?.filterOptions
                      : [],
                  filterName:
                    appState?.lang === "en"
                      ? data?.filterName
                      : Array.isArray(_arabicFilterBarData) &&
                        _arabicFilterBarData.length > 0 &&
                        _arabicFilterBarData[index]?.filterName,
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
            setSelectedFilters({});
            onApplyFilters && onApplyFilters({});
          }}
        />
        <Button
          buttonText={`${appState?.lang === "en" ? "Apply" : "يتقدم"} ${
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : ""
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
          onClick={() => {
            onApplyFilters && onApplyFilters(selectedFilters);
          }}
        />
      </div>
    </>
  );
};
