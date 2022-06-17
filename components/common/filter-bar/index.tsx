import React from "react";
import FilterBarMobile from "./filter-bar-mobile";
import FilterBar from "./filter-sorting-bar";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";

interface FilterBarMainProps {
updateProductArray: Function;
  filterList: [];
  hasFilteredData: Boolean;
  }

const FilterBarMain = ({
  updateProductArray = () => {},
  filterList = [],
  hasFilteredData = false,
}: FilterBarMainProps): JSX.Element => {
  const [width] = useWindowSize();
  return (
    <>
      {width <= desktopScreenSize ? (
        <FilterBarMobile
          onApplyFilters={updateProductArray}
          onSortingChange={updateProductArray}
          onClear={updateProductArray}
          filterList={filterList}
          hasFilteredData={hasFilteredData}
        ></FilterBarMobile>
      ) : (
        <FilterBar
          onApplyFilters={updateProductArray}
          onSortingChange={updateProductArray}
          onClear={updateProductArray}
          filterList={filterList}
          hasFilteredData={hasFilteredData}
        ></FilterBar>
      )}
    </>
  );
};

export default FilterBarMain;
