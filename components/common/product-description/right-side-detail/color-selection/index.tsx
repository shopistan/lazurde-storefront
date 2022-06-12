import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import Label from "components/common/ui/label";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

interface ColorSelectionProps {
  productSizeArray?: { Size?: number, Color?: string }[];
  onColorChange?: Function;
  setSelectedColor?: Function;
  selectedColor: {color: string, index: number};
  selectedSize: {size: number, index: number};
}

const ColorSelection = ({
  productSizeArray = [],
  onColorChange = () => {},
  setSelectedColor = () => {},
  selectedColor,
  selectedSize,
}: ColorSelectionProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const [activeColor, setActiveColor] = useState(selectedColor.index);
  const [colorArray, setColorArray] = useState([]);

  const getColors = () => {
    const colorSet = new Set();
    productSizeArray.length > 0 &&
      productSizeArray.map((item: {Size?: number, Color?: string}) => {
        if (selectedSize.size > -1) {
          item.Size === selectedSize.size && item.Color && colorSet.add(item.Color);
        } else {
          item.Color && colorSet.add(item.Color);
        }
      });

    setSelectedColor({
      color: [...Array.from(colorSet)][0],
      index: 0,
    });
    setActiveColor(0)

    setColorArray([...Array.from(colorSet)]);
  };

  useEffect(() => {
    getColors();
  }, [selectedSize]);

  return (
    <>
      <div className={styles["color-wrapper"]}>
        {colorArray && colorArray.length > 0 ? (
          <>
            <Label className={styles["color-heading"]}>
              {appState.lang == "en" ? "Select Color" : t("Select Color")}
            </Label>
            <div className={styles["product-colors"]}>
              {colorArray?.map((color, index) => {
                if (!color) return null;
                return (
                  <div
                    key={index}
                    className={`${styles["outer-div"]} ${
                      activeColor === index ? styles["active"] : ""
                    }`}
                  >
                    <div
                      onClick={() => {
                        setActiveColor(index);
                        onColorChange && onColorChange(color);
                        setSelectedColor({
                          color: color,
                          index: index,
                        });
                      }}
                      style={{
                        background: `linear-gradient(to right, ${color} 0%,#ffffff 100%)`,
                      }}
                      className={`${styles["product-color"]} ${
                        activeColor === index ? styles["active"] : ""
                      }`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default ColorSelection;
