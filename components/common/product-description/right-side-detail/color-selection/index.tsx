import React, { useState } from "react";
import styles from "./style.module.scss";
import Label from "components/common/ui/label";

interface ColorSelectionProps {
  productSizeArray?: { Color?: string }[];
  onColorChange?: Function;
}

const ColorSelection = ({
  productSizeArray = [],
  onColorChange = () => {},
}: ColorSelectionProps): JSX.Element => {
  const [activeSize, setActiveSize] = useState(1);

  return (
    <div className={styles["sizechart-wrapper"]}>
      {productSizeArray && productSizeArray.length > 0 ? (
        <>
          <Label className={styles["size-heading"]}>Select Color</Label>
          <div className={styles["product-sizes"]}>
            {productSizeArray?.map((size, index) => {
              const { Color } = size;
              if(!Color) return null
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSize(index);
                    onColorChange && onColorChange(Color);
                  }}
                  style={{background: `linear-gradient(to right, ${Color} 0%,#ffffff 100%)`} }
                  className={`${styles["product-size"]} ${
                    activeSize === index ? styles["active"] : ""
                  }`}
                >
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ColorSelection;

