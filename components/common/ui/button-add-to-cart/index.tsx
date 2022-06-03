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
  onClick,
  onQuantityChange = () => {},
}: ButtonATCProps): JSX.Element => {
  const [quantityCounter, setQuantityCounter] = useState(1);

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
        <button
          onClick={() => {
            if (quantityCounter > 1) {
              setQuantityCounter(quantityCounter - 1);
            }
          }}
          className={styles["counter-decrement"]}
        >
          -
        </button>
        <span className={styles["counter-span"]}>{quantityCounter}</span>
        <button
          onClick={() => {
            setQuantityCounter(quantityCounter + 1);
          }}
          className={styles["counter-increment"]}
        >
          +
        </button>
      </div>
      <div className={styles["div-divider"]}></div>
    </>
  );
};
