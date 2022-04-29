import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
import Tick from "components/icons/Tick";
import Button from "components/common/ui/button";

interface ArabicCategoryProps {
  linkHeading: string;
  linkTitle: [
    {
      title: string;
    }
  ];
}

interface CategoryDataProps {
  filterName: string;
  dropdownData: {
    optionName: string;
  }[];
  positionOffset: string;
  categoryLinks?: ArabicCategoryProps[];
}

interface DropDownProps {
  categoryData: CategoryDataProps;
  setIsOpened: Function;
  selectedFilters: { [key: string]: { [key: string]: string } };
  setSelectedFilters: Function;
  onApplyFilters: Function;
}

const DropDown = ({
  categoryData,
  setIsOpened = () => {},
  selectedFilters = {},
  setSelectedFilters = () => {},
  onApplyFilters = () => {},
}: DropDownProps): JSX.Element => {
  const { appState } = useContext(AppContext);
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
        setIsOpened &&
          setIsOpened((prev: object) => {
            return { ...prev, opened: true };
          });
      }}
      onMouseLeave={() => {
        setIsOpened &&
          setIsOpened((prev: object) => {
            return { ...prev, opened: false };
          });
      }}
    >
      <div className={styles["div-titles"]}>
        {categoryData &&
          Object.keys(categoryData).length > 0 &&
          categoryData?.dropdownData?.map((data, index) => {
            const { optionName } = data;
            return (
              <div
                key={index}
                className={styles["title"]}
                onClick={() => {
                  if (selectedFilters?.[filterName]?.[optionName]) {
                    const filterCopy = { ...selectedFilters };
                    delete filterCopy?.[filterName]?.[optionName];
                    if (Object.keys(filterCopy?.[filterName]).length < 1) {
                      delete filterCopy?.[filterName];
                    }
                    setSelectedFilters && setSelectedFilters({ ...filterCopy });
                  } else {
                    setSelectedFilters &&
                      setSelectedFilters({
                        ...selectedFilters,
                        [filterName]: {
                          ...selectedFilters?.[filterName],
                          [optionName]: true,
                        },
                      });
                  }
                }}
                style={{ marginInlineStart: categoryData?.positionOffset }}
              >
                {optionName}
                <div
                  className={styles["div-tick"]}
                  data-showTick={selectedFilters?.[filterName]?.[optionName]}
                >
                  <Tick />
                </div>
              </div>
            );
          })}
      </div>

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
            onApplyFilters && onApplyFilters({});
          }}
        />
        <Button
          buttonText={`${appState?.lang === "en" ? "Apply" : "يتقدم"} ${
            totalSelectedFilterCount > 0
              ? `(${totalSelectedFilterCount})`
              : "(1)"
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
          onClick={() => {
            onApplyFilters && onApplyFilters(selectedFilters);
          }}
        />
      </div>
    </div>
  );
};

export default DropDown;
