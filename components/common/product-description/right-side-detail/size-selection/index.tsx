import React, { useState } from "react";
import styles from "./style.module.scss";
import SizeChartModal from "./size-chart-modal";
import Label from "components/common/ui/label";

interface SizeChartProps {
  sizeChartUrl?: string;
  productSizeArray?: { sizeValue?: string }[];
  onSizeChange?: Function;
}

const SizeChart = ({
  sizeChartUrl = "https://lazurdesandbox.imgix.net/Frame%20208150.jpg",
  productSizeArray = [],
  onSizeChange = () => {},
}: SizeChartProps): JSX.Element => {
  const [activeSize, setActiveSize] = useState(1);
  const [sizeChartModalOpen, setSizeChartModalOpen] = useState(false);

  return (
    <div className={styles["sizechart-wrapper"]}>
      {productSizeArray && productSizeArray.length > 0 ? (
        <>
          <Label className={styles["size-heading"]}>Select Size</Label>
          <div className={styles["product-sizes"]}>
            {productSizeArray?.map((size, index) => {
              const { sizeValue } = size;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSize(index);
                    onSizeChange && onSizeChange(sizeValue);
                  }}
                  className={`${styles["product-size"]} ${
                    activeSize === index ? styles["active"] : ""
                  }`}
                >
                  {sizeValue}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      <div className={styles["size-chart-btn"]}>
        <button onClick={() => setSizeChartModalOpen(true)}>
          Sizing Chart
        </button>
      </div>
      {sizeChartModalOpen && (
        <SizeChartModal
          isOpened={sizeChartModalOpen}
          onClose={() => setSizeChartModalOpen(false)}
          sizeChartUrl={sizeChartUrl}
        />
      )}
    </div>
  );
};
export default SizeChart;
