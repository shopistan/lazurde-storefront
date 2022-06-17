import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Tick from "components/icons/Tick";

interface DropDownProps {
  dropdownData: { [key: string]: string }[];
  filterName: string;
  filterIndex: number;
}

interface CategoryDropDownProps {
  categoryData: DropDownProps;
  setIsOpened: Function;
  selectedFilters: {
    [key: string]: {
      name: string;
      selectedOptions: { [key: string]: { selected: boolean; name: string } };
    };
  };
  setSelectedFilters: Function;
  setTotalSelectedFilterCount: Function;
  onApplyFilter?: Function;
}

const DropDown = ({
  categoryData,
  setIsOpened = () => {},
  selectedFilters = {},
  setSelectedFilters = () => {},
  setTotalSelectedFilterCount = () => {},
  onApplyFilter= () => {},
}: CategoryDropDownProps): JSX.Element => {
  const filterName = categoryData?.filterName || "";
  const filterIndex = categoryData?.filterIndex || 0;

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
    onApplyFilter && onApplyFilter(selectedFilters);

  }, [selectedFilters]);

  return (
    <div
      data-testid={"dropdown-div"}
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
            const { optionName } = data;
            return (
              <div
                key={index}
                className={styles["title"]}
                onClick={() => {
                  if (
                    selectedFilters?.[filterIndex]?.selectedOptions?.[index]
                      ?.selected
                  ) {
                    const filterCopy = { ...selectedFilters };
                    delete filterCopy?.[filterIndex]?.selectedOptions?.[index];
                    if (
                      Object.keys(filterCopy?.[filterIndex]?.selectedOptions)
                        .length < 1
                    ) {
                      delete filterCopy?.[filterIndex];
                    }
                    setSelectedFilters && setSelectedFilters({ ...filterCopy });
                  } else {
                    setSelectedFilters &&
                      setSelectedFilters({
                        ...selectedFilters,
                        [filterIndex]: {
                          name: filterName,
                          selectedOptions: {
                            ...selectedFilters?.[filterIndex]?.selectedOptions,
                            [index]: {
                              selected: true,
                              name: optionName,
                            },
                          },
                        },
                      });
                  }
                }}
              >
                {optionName}
                <div
                  className={styles["div-tick"]}
                  data-show-tick={
                    selectedFilters?.[filterIndex]?.selectedOptions?.[index]
                      ?.selected
                  }
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
