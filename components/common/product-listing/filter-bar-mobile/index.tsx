import React, { FC, useContext, useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { BackArrow, Search } from "components/icons";
import { ImageType } from "lib/types/common";
// import CategoryDropDown from "./category-dropdown";
import Image from "next/image";
import Select from "components/common/ui/select";
import BorderlessSelect from "components/common/ui/borderless-select";
import CategoryDropDown from "./category-dropdown";
import Accordion from "components/common/ui/accordion2/Accordion";
import Button from "components/common/ui/button";
import SortingModal from "./sorting-modal";

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
  const { appState } = useContext(AppContext);

  return (
    <div className={styles["site-navbar"]} data-headerId={headerId}>
      <div className={styles["nav-links-div"]}>
        <div className={styles["nav-links"]}>
          <BorderlessSelect
            options={optionsData}
            onChange={() => {}}
            defaultValue={""}
            selectedLabel={`${"Filter: "}`}
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
          className={styles["div-order-dropdown"]}
          data-opened={isOpened.opened}
        >
          <BorderlessSelect
            options={optionsData}
            onChange={() => {}}
            defaultValue={sortingSelected}
            selectedLabel={`${"Sort By: "}`}
            showInModal={true}
            modalChildren={
              <SortingModal
                sortingDataArray={optionsData}
                defaultValue={sortingSelected}
                onChange={(value) => {
                  setSortingSelected(value);
                }}
              ></SortingModal>
            }
          ></BorderlessSelect>
        </div>
      </div>

      <div
        className={styles["category-dropdown"]}
        data-opened={isOpened.opened}
      >
        {/* <CategoryDropDown
          setIsOpened={setIsOpened}
          categoryData={dropdownData}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        ></CategoryDropDown> */}
      </div>
      <div
        className={styles["overlay"]}
        data-opened={isOpened.opened}
        onClick={() => setIsOpened({ ...isOpened, opened: false })}
      />
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
                <span>{data.filterName}</span>
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
                dropdownData: data.filterOptions,
                filterName: data.filterName,
              }}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setTotalSelectedFilterCount={setTotalSelectedFilterCount}
            ></CategoryDropDown>
          </Accordion>
        );
      })}

      <div className={styles["div-filter-btns"]} data-has-count={totalSelectedFilterCount > 0}>
        <Button
          buttonText={"Clear All Filters"}
          buttonStyle={"white"}
          buttonSize={"sm"}
          onClick={() => {
            setSelectedFilters({});
          }}
        />
        <Button
          buttonText={`Apply ${
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : ""
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
        />
      </div>
    </>
  );
};
