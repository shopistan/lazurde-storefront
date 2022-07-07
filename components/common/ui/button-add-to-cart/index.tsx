import { MinusIcon, PlusIcon } from "components/icons";
import React, { MouseEventHandler, useEffect, useState } from "react";
import styles from "./buttonATC.module.scss";

interface ButtonATCProps {
  className?: string;
  buttonText?: string | Function;
  buttonStyle?: string;
  buttonSize?: "sm" | "md" | "lr" | "xl" | "xxl" | "fill";
  onClick?: MouseEventHandler<HTMLDivElement>;
  type?: "button" | "submit";
  children?: JSX.Element | string;
  showCounter?: boolean;
  onQuantityChange?: Function;
  quantityCounter?: number;
  setQuantityCounter?: Function;
}

interface QuantitySectionProps {
  quantityCounter?: number;
  setQuantityCounter?: Function;
}

const ButtonATC = ({
  className = "",
  type = "button",
  buttonText = "",
  buttonStyle = "black",
  buttonSize = "md",
  children,
  showCounter = false,
  onClick = () => {},
  onQuantityChange = () => {},
  quantityCounter = 1,
  setQuantityCounter = () => {},
}: ButtonATCProps): JSX.Element => {
  // const [quantityCounter, setQuantityCounter] = useState(1);

  useEffect(() => {
    onQuantityChange(quantityCounter);
  }, [quantityCounter]);

  return (
    <button
      data-testid={"buttonATC"}
      data-style={buttonStyle}
      data-size={buttonSize}
      data-counter={showCounter}
      className={`${styles["buttonATC"]} ${className}`}
      type={type}
    >
      {showCounter && (
        <QuantitySection
          quantityCounter={quantityCounter}
          setQuantityCounter={setQuantityCounter}
        ></QuantitySection>
      )}
      <div onClick={onClick}>{buttonText || ""}</div>
      {children || ""}
    </button>
  );
};
export default ButtonATC;

const QuantitySection = ({
  quantityCounter,
  setQuantityCounter,
}: QuantitySectionProps): JSX.Element => {
  return (
    <>
      <div className={styles["div-quantity-counter"]}>
        <div
          onClick={() => {
            if (quantityCounter > 1) {
              setQuantityCounter(quantityCounter - 1);
            }
          }}
          className={styles["counter-decrement"]}
        >
          <MinusIcon color="white" width="20px" height="20px" />
        </div>
        <span className={styles["counter-span"]}>{quantityCounter}</span>
        <div
          onClick={() => {
            setQuantityCounter(quantityCounter + 1);
          }}
          className={styles["counter-increment"]}
        >
          <PlusIcon width="20px" height="20px" color="white" />
        </div>
      </div>
      <div className={styles["div-divider"]}></div>
    </>
  );
};
