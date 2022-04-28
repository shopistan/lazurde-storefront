import React, { FC, useState, useRef, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import BorderlessSelect from "components/common/ui/borderless-select";
import CategoryDropDown from "./category-dropdown";
import Accordion from "components/common/ui/accordion2/Accordion";
import Button from "components/common/ui/button";
import SortingModal from "./sorting-modal";
import { AppContext } from "lib/context";

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

type LinkProps = {
  title: string;
  url: string;
  isBold: Boolean;
};
interface siteNavBarProps {
  filterList?:
    | [
        {
          filterName: string;
          filterOptions: { optionsNames: string }[];
        }
      ]
    | [];
  headerId?: string;
}

interface DropdownDataProps {
  dropdownData: [
    {
      title: string;
      catArr: [LinkProps];
    }
  ];
  categoryLinks: [];
}

interface FilterAccordionProps {
  setIsOpened: Function;
  selectedFilters: {
    [key: string]: { [key: string]: string };
  };
  setSelectedFilters: Function;
  setTotalSelectedFilterCount: Function;
  totalSelectedFilterCount: number;
}

const fl = [
  {
    filterName: "Brand",
    filterOptions: [
      {
        optionsNames: "SOmething",
      },
    ],
  },
  {
    filterName: "Type",
    filterOptions: [
      {
        optionsNames: "Two headed",
      },
      {
        optionsNames: "Solitaire",
      },
      {
        optionsNames: "Twins",
      },
      {
        optionsNames: "Bands",
      },
      {
        optionsNames: "Eternity",
      },
    ],
  },
  {
    filterName: "Metal",
    filterOptions: [
      {
        optionsNames: "SOmething",
      },
    ],
  },
  {
    filterName: "Gemstone",
    filterOptions: [
      {
        optionsNames: "SOmething",
      },
    ],
  },
  {
    filterName: "Price",
    filterOptions: [
      {
        optionsNames: "SOmething",
      },
    ],
  },
];

const FilterBarMobile: FC<siteNavBarProps> = ({
  headerId = "",
  filterList = fl,
}): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const link = useRef(filterList && filterList.map(() => React.createRef()));
  const sideNavTitlesArray: [{ navTitle: string; navCategoryLinks: [] }] = t(
    "siteNavLinks",
    {},
    { returnObjects: true }
  );

  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [sortingSelected, setSortingSelected] = useState("Best Sellers");
  const [dropdownData, setDropdownData] = useState<DropdownDataProps>();
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: { [key: string]: string };
  }>();
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);

  const _arabicFilterBarData = t(
    "arabicFilterList",
    {},
    { returnObjects: true }
  );
  const _arabicSortingFilter = t("sortingFilter", {}, { returnObjects: true });

  const [optionData, setOptionData] = useState<any>([]);
  useEffect(() => {
    setOptionData({
      data: appState?.lang === "en" ? optionsData : _arabicSortingFilter,
      defaultValue: "Best Sellers",
    });
  }, [appState]);

  return (
    <div className={styles["filter-bar_wrapper"]} data-headerId={headerId}>
      <div className={styles["filter-bar_items"]}>
        <div className={styles["filter-bar_item"]}>
          <BorderlessSelect
            className={"filter-mobile-select"}
            options={optionData?.data}
            onChange={() => {}}
            defaultValue={optionData?.defaultValue}
            selectedLabel={appState?.lang === "en" ? "Filter: " : "منقي:"}
            showInModal={true}
            modalChildren={
              <FilterAccordion
                setIsOpened={setIsOpened}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setTotalSelectedFilterCount={setTotalSelectedFilterCount}
                totalSelectedFilterCount={totalSelectedFilterCount}
              ></FilterAccordion>
            }
          ></BorderlessSelect>
        </div>
        <div
          className={styles["filter-bar_item"]}
          data-opened={isOpened.opened}
        >
          <BorderlessSelect
            className={styles["filter-mobile-select"]}
            options={optionData?.data}
            onChange={() => {}}
            defaultValue={optionData?.defaultValue}
            selectedLabel={appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}
            showInModal={true}
            modalChildren={
              <SortingModal
                sortingDataArray={optionData?.data}
                defaultValue={optionData?.defaultValue}
                onChange={(value) => {
                  setSortingSelected(value);
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
  setIsOpened,
  selectedFilters,
  setSelectedFilters,
  setTotalSelectedFilterCount,
  totalSelectedFilterCount,
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
      {fl.map((data, index) => {
        const selectedFilterCount =
          selectedFilters?.[data.filterName] &&
          Object.keys(selectedFilters?.[data.filterName]).length;
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
                  <span>{selectedFilterCount > 0 && selectedFilterCount}</span>
                </div>
              </div>
            }
            links={data.filterOptions}
            arrowIcon={false}
          >
            <CategoryDropDown
              key={index}
              setIsOpened={setIsOpened}
              categoryData={{
                dropdownData:
                  appState?.lang === "en"
                    ? data.filterOptions
                    : Array.isArray(_arabicFilterBarData) &&
                      _arabicFilterBarData.length > 0 &&
                      _arabicFilterBarData[index]?.filterOptions,
                filterName:
                  appState?.lang === "en"
                    ? data.filterName
                    : Array.isArray(_arabicFilterBarData) &&
                      _arabicFilterBarData.length > 0 &&
                      _arabicFilterBarData[index]?.filterName,
              }}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setTotalSelectedFilterCount={setTotalSelectedFilterCount}
            ></CategoryDropDown>
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
          }}
        />
        <Button
          buttonText={`${appState?.lang === "en" ? "Apply" : "يتقدم"} ${
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : ""
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
        />
      </div>
    </>
  );
};
