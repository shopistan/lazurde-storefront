import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText: string;
  backgroundColor: string;
  dataTestId : string;
}

const Button = ({ dataTestId,  buttonText, backgroundColor }: ButtonProps) => {
  return (
    <button
    data-testid ={dataTestId}
      className={styles["banner-button"]}
      style={{ backgroundColor: backgroundColor }}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
