import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import SizeChartModal from "./size-chart-modal";
import Label from "components/common/ui/label";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

interface SizeChartProps {
  productData?: { Size?: number; Color?: string };
  sizeChartUrl?: string;
  productSizeArray?: { Size?: number }[];
  onSizeChange?: Function;
  setSelectedSize?: Function;
  setSelectedColor?: Function;
  selectedSize: { size: number; index: number };
}

const SizeChart = ({
  productData = {},
  sizeChartUrl = "https://lazurdesandbox.imgix.net/Frame%20208150.jpg",
  productSizeArray = [],
  onSizeChange = () => {},
  setSelectedSize = () => {},
  setSelectedColor = () => {},
  selectedSize,
}: SizeChartProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [activeSize, setActiveSize] = useState(selectedSize.index);
  const [sizeChartModalOpen, setSizeChartModalOpen] = useState(false);
  const [sizeArray, setSizeArray] = useState([]);

  const getSizes = () => {
    const sizeSet = new Set();
    if (productData && productData.hasOwnProperty("Size")) {
      sizeSet.add(productData.Size);
    }
    productSizeArray &&
      productSizeArray.length > 0 &&
      productSizeArray.map((item: { Size?: number }) => {
        item.Size && sizeSet.add(item.Size);
      });

    if (activeSize === 0) {
      setSelectedSize({
        size: [...Array.from(sizeSet)][0],
        index: 0,
      });
    }
    setSizeArray([...Array.from(sizeSet)]);
  };

  useEffect(() => {
    getSizes();
  }, [productData, productSizeArray]);

  useEffect(() => {
    setSelectedColor({ color: "", index: 0 });
    selectedSize.size && onSizeChange && onSizeChange(selectedSize.size);
  }, [selectedSize]);

  return (
    <div className={styles["sizechart-wrapper"]}>
      {sizeArray && sizeArray.length > 0 ? (
        <>
          <Label className={styles["size-heading"]}>
            {appState.lang == "en" ? "Select Size" : t("Select Size")}
          </Label>
          <div className={styles["product-sizes"]}>
            {sizeArray?.map((size, index) => {
              if (!size) return null;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSize(index);
                    setSelectedSize({
                      size: size,
                      index: index,
                    });
                  }}
                  className={`${styles["product-size"]} ${
                    activeSize === index ? styles["active"] : ""
                  }`}
                >
                  {size}
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
