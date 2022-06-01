import React from "react";
import SizeChart from "../product-size";

interface RightSideDetailProps {
  onSizeChange?: Function;
  productSizeArray?: { sizeValue?: string }[];
}

const RightSideDetail = ({
  onSizeChange,
  productSizeArray = [],
}: RightSideDetailProps): JSX.Element => {
  return (
    <>
      <SizeChart
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
    </>
  );
};
export default RightSideDetail;
