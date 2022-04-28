import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Tick from "components/icons/Tick";

interface ArabicCategoryProps {
  linkHeading: string;
  linkTitle: [
    {
      title: string;
    }
  ];
}
interface DropDownProps {
  dropdownData: { [key: string]: string }[];
  filterName: string;
  categoryLinks?: ArabicCategoryProps[];
}

interface CategoryDropDownProps {
  categoryData: DropDownProps;
  setIsOpened: Function;
  selectedFilters: { [key: string]: { [key: string]: string } };
  setSelectedFilters: Function;
  setTotalSelectedFilterCount: Function;
}

const DropDown = ({
  categoryData,
  setIsOpened = () => {},
  selectedFilters = {},
  setSelectedFilters = () => {},
  setTotalSelectedFilterCount = () => {},
}: CategoryDropDownProps): JSX.Element => {
  const filterName = categoryData?.filterName || "";

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
    <div
      className={styles["category-dropdown"]}
      onMouseOver={() => {
        setIsOpened((prev: object) => {
          return { ...prev, opened: true };
        });
      }}
      onMouseLeave={() => {
        setIsOpened((prev: object) => {
          return { ...prev, opened: false };
        });
      }}
    >
      <div className={styles["div-titles"]}>
        {categoryData &&
          Object.keys(categoryData).length > 0 &&
          categoryData?.dropdownData.map((data, index) => {
            const { optionNames } = data;
            return (
              <div
                key={index}
                className={styles["title"]}
                onClick={() => {
                  if (selectedFilters?.[filterName]?.[optionNames]) {
                    const filterCopy = { ...selectedFilters };
                    delete filterCopy?.[filterName]?.[optionNames];
                    if (Object.keys(filterCopy?.[filterName]).length < 1) {
                      delete filterCopy?.[filterName];
                    }
                    setSelectedFilters && setSelectedFilters({ ...filterCopy });
                  } else {
                    setSelectedFilters && setSelectedFilters({
                      ...selectedFilters,
                      [filterName]: {
                        ...selectedFilters?.[filterName],
                        [optionNames]: true,
                      },
                    });
                  }
                }}
              >
                {optionNames}
                <div
                  className={styles["div-tick"]}
                  data-showTick={selectedFilters?.[filterName]?.[optionNames]}
                >
                  <Tick />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DropDown;
