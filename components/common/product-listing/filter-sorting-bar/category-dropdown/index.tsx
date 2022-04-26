import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { AppContext } from "lib/context";
import Tick from "components/icons/Tick";
import Button from "components/common/ui/button";

type LinkProps = {
  title: string;
  url: string;
  isBold: Boolean;
};

interface ArabicCategoryProps {
  linkHeading: string;
  linkTitle: [
    {
      title: string;
    }
  ];
}

interface DropDownProps {
  filterName: string;
  dropdownData: {
    optionsNames: string;
  }[];
  positionOffset: string;
  categoryLinks?: ArabicCategoryProps[];
}

interface CategoryDropDownProps {
  categoryData: DropDownProps;
  setIsOpened: Function;
  selectedFilters: { [key: string]: { [key: string]: string; }; };
  setSelectedFilters: Function; 
}

const CategoryDropDown = ({
  categoryData,
  setIsOpened,
  selectedFilters,
  setSelectedFilters,
}: CategoryDropDownProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [showTick, setShowTick] = useState("");
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
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
        {categoryData?.dropdownData?.map((data, index) => {
          const { optionsNames } = data;
          const currentCategoryArabic = categoryData?.categoryLinks?.[index];
          return (
            <div
              key={index}
              className={styles["title"]}
              onClick={() => {
                if (selectedFilters?.[filterName]?.[optionsNames]) {
                  const filterCopy = { ...selectedFilters };
                  delete filterCopy?.[filterName]?.[optionsNames];
                  if (Object.keys(filterCopy?.[filterName]).length < 1) {
                    delete filterCopy?.[filterName];
                  }
                  setSelectedFilters({ ...filterCopy });
                } else {
                  setSelectedFilters({
                    ...selectedFilters,
                    [filterName]: {
                      ...selectedFilters?.[filterName],
                      [optionsNames]: true,
                    },
                  });
                }
              }}
              style={{marginLeft: categoryData?.positionOffset}}
            >
              {/* {appState.lang === "en"
                ? optionsNames
                : currentCategoryArabic?.linkHeading} */}
                {optionsNames}
              <div
                className={styles["div-tick"]}
                data-showTick={selectedFilters?.[filterName]?.[optionsNames]}
              >
                <Tick />
              </div>
            </div>
          );
        })}
      </div>

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
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : "(1)"
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
        />
      </div>
    </div>
  );
};

export default CategoryDropDown;
