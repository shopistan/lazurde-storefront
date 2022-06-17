import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
import Tick from "components/icons/Tick";
import Button from "components/common/ui/button";

interface CategoryDataProps {
  filterName: string;
  filterIndex: number;
  dropdownData: {
    optionName: string;
  }[];
  positionOffset: string;
}

interface DropDownProps {
  categoryData: CategoryDataProps;
  setIsOpened: Function;
  selectedFilters: {
    [key: string]: {
      name: string;
      selectedOptions: { [key: string]: { selected: boolean; name: string } };
    };
  };
  setSelectedFilters: Function;
  onApplyFilters: Function;
  hasFilteredData: Boolean;
}

const DropDown = ({
  categoryData,
  setIsOpened = () => { },
  selectedFilters = {},
  setSelectedFilters = () => { },
  onApplyFilters = () => { },
  hasFilteredData = false,
}: DropDownProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const filterName = categoryData?.filterName || "";
  const filterIndex = categoryData?.filterIndex || 0;

  useEffect(() => {
    console.log("something", selectedFilters);

    let totalCount = 0;
    if (selectedFilters && Object.keys(selectedFilters)?.length > 0) {
      for (
        let index = 0;
        index < Object.keys(selectedFilters)?.length;
        index++
      ) {
        const filterTitle = Object.keys(selectedFilters)?.[index];
        const count =
          filterTitle &&
          Object.keys(selectedFilters[filterTitle]?.selectedOptions)?.length;

        totalCount = Number(totalCount) + Number(count);
        setTotalSelectedFilterCount(totalCount);
      }
    } else {
      setTotalSelectedFilterCount(0);
    }
    onApplyFilters && onApplyFilters(selectedFilters);

  }, [selectedFilters]);

  return (
    <div
      key={categoryData?.dropdownData?.length}
      data-testid={"dropdown-div"}
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
      <div key={categoryData?.dropdownData?.length} className={styles["div-titles"]}>
        {categoryData &&
          Object.keys(categoryData)?.length > 0 &&
          categoryData?.dropdownData?.map((data, index) => {
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
                      Object.keys(filterCopy?.[filterIndex]?.selectedOptions)?.length < 1
                    ) {
                      delete filterCopy?.[filterIndex];
                    }
                    setSelectedFilters && setSelectedFilters({ ...filterCopy });
                  } else {
                    const updatedFilters = {
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
                    };
                    setSelectedFilters && setSelectedFilters(updatedFilters);
                  }
                }}
                style={{ marginInlineStart: categoryData?.positionOffset }}
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

      <div
        className={styles["div-filter-btns"]}
        data-has-count={hasFilteredData || totalSelectedFilterCount > 0}
      >
        <Button
          buttonText={appState?.lang === "en" ? "Clear All Filters" : "مسح"}
          buttonStyle={"underline"}
          buttonSize={"sm"}
          onClick={() => {
            setSelectedFilters && setSelectedFilters({});
            onApplyFilters && onApplyFilters({});
          }}
        />
        {/* <Button
          buttonText={`${appState?.lang === "en" ? "Apply" : "يتقدم"} ${
            totalSelectedFilterCount > 0 ? `(${totalSelectedFilterCount})` : " "
          }`}
          buttonStyle={"black"}
          buttonSize={"sm"}
          onClick={() => {
            onApplyFilters && onApplyFilters(selectedFilters);
          }}
        /> */}
      </div>
    </div>
  );
};

export default DropDown;
