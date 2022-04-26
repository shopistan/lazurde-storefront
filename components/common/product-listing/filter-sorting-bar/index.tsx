import React, { FC, useContext, useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import CategoryDropDown from "./category-dropdown";
import BorderlessSelect from "components/common/ui/borderless-select";
import Button from "components/common/ui/button";

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
          filterOptions: [{ optionsNames: string }];
        }
      ]
    | [];
  headerId?: string;
  onApplyFilters: Function;
}

interface DropdownDataProps {
  filterName: string;
  dropdownData: {
    optionsNames: string;
  }[];
  positionOffset: string;
}

const fl = [
  {
    filterName: "Brand",
    filterOptions: [
      {
        optionsNames: "Brand 1",
      },
      {
        optionsNames: "Brand 2",
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
        optionsNames: "Gold",
      },
      {
        optionsNames: "White Gold",
      },
    ],
  },
  {
    filterName: "Gemstone",
    filterOptions: [
      {
        optionsNames: "Diamond",
      },
    ],
  },
  {
    filterName: "Price",
    filterOptions: [
      {
        optionsNames: "100",
      },
      {
        optionsNames: "200",
      },
    ],
  },
];

const FilterBar: FC<siteNavBarProps> = ({
  headerId = "",
  filterList = fl,
  onApplyFilters,
}): JSX.Element => {
  const { t } = useTranslation("common");
  const link: any = useRef(
    filterList && filterList.map(() => React.createRef())
  );
  const sideNavTitlesArray: [{ navTitle: string; navCategoryLinks: [] }] = t(
    "siteNavLinks",
    {},
    { returnObjects: true }
  );

  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [dropdownData, setDropdownData] = useState<DropdownDataProps>();
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: { [key: string]: string };
  }>();
  const { appState } = useContext(AppContext);
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);

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

  return (
    <div className={styles["filter-bar-main"]} data-headerId={headerId}>
      <div className={styles["div-filter-bar"]}>
        <div className={styles["filter-links"]}>
          {filterList &&
            filterList.length > 0 &&
            filterList.map((data, index) => {
              const hasCategories = true;
              const selectedFilterCount =
                selectedFilters?.[data.filterName] &&
                Object.keys(selectedFilters?.[data.filterName]).length;

              return (
                <div
                  key={index}
                  className={styles["links"]}
                  ref={link.current[index]}
                  data-has-count={selectedFilterCount > 0 }
                  onMouseOver={(event) => {
                    event.stopPropagation();

                    if (hasCategories) {
                      setIsOpened({ opened: true, selected: index });
                      setDropdownData({
                        filterName: data.filterName,
                        dropdownData: data.filterOptions,
                        positionOffset:
                          link?.current[index].current.getBoundingClientRect()
                            .left,
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
                      ? isOpened.opened === true && isOpened.selected === index
                      : isOpened.selected === index
                  }
                >
                  <span>{data.filterName}</span>
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
          data-opened={isOpened.opened}
          data-has-count={totalSelectedFilterCount > 0}
        >
          <Button
            buttonText={"Clear All Filters"}
            buttonStyle={"white"}
            buttonSize={"sm"}
            onClick={() => {
              setSelectedFilters({});
              onApplyFilters({})
            }}
          />
        </div>
        <div
          className={styles["div-order-dropdown"]}
          data-opened={isOpened.opened}
        >
          <BorderlessSelect
            options={optionsData}
            onChange={() => {}}
            defaultValue={"Best Sellers"}
            selectedLabel={`${"Sort By: "}`}
          ></BorderlessSelect>
        </div>
      </div>

      <div
        className={styles["category-dropdown"]}
        data-opened={isOpened.opened}
      >
        <CategoryDropDown
          setIsOpened={setIsOpened}
          categoryData={dropdownData}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          onApplyFilters={onApplyFilters}
        ></CategoryDropDown>
      </div>
      <div
        className={styles["overlay"]}
        data-opened={isOpened.opened}
        onClick={() => setIsOpened({ ...isOpened, opened: false })}
      ></div>
    </div>
  );
};

export default FilterBar;
