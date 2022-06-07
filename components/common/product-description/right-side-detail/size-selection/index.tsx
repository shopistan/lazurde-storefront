import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import SizeChartModal from "./size-chart-modal";
import Label from "components/common/ui/label";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

interface SizeChartProps {
  sizeChartUrl?: string;
  productSizeArray?: { Size?: string }[];
  onSizeChange?: Function;
}

const SizeChart = ({
  sizeChartUrl = "https://lazurdesandbox.imgix.net/Frame%20208150.jpg",
  productSizeArray = [],
  onSizeChange = () => {},
}: SizeChartProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [activeSize, setActiveSize] = useState(1);
  const [sizeChartModalOpen, setSizeChartModalOpen] = useState(false);

  return (
    <div className={styles["sizechart-wrapper"]}>
      {productSizeArray && productSizeArray.length > 0 ? (
        <>
          <Label className={styles["size-heading"]}>
            {appState.lang == "en" ? "Select Size" : t("Select Size")}
          </Label>
          <div className={styles["product-sizes"]}>
            {productSizeArray?.map((size, index) => {
              const { Size } = size;
              if (!Size) return null;
              return (
                <div
                  key={Math.random()}
                  onClick={() => {
                    setActiveSize(index);
                    onSizeChange && onSizeChange(Size);
                  }}
                  className={`${styles["product-size"]} ${
                    activeSize === index ? styles["active"] : ""
                  }`}
                >
                  {Size}
                </div>
              );
            })}
          </div>
          <div className={styles["size-chart-btn"]}>
            <button onClick={() => setSizeChartModalOpen(true)}>
              {appState.lang == "en" ? "Sizing Chart" : t("Sizing Chart")}
            </button>
          </div>
        </>
      ) : null}
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
