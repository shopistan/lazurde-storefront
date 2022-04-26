import React from "react";
import FilterBar from "./filter-sorting-bar";
import useWindowSize from "lib/utils/useWindowSize";
import FilterBarMobile from "./filter-bar-mobile";
type Props = {};

const ProductListing = (props: Props) => {
  const [width] = useWindowSize();

  return (
    <>
      <div>ProductListing</div>
      {width < 1024 ? (
        <FilterBarMobile></FilterBarMobile>
      ) : (
        <FilterBar></FilterBar>
      )}
    </>
  );
};

export default ProductListing;
