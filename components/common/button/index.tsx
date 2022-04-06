import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText: string;
  backgroundColor: string;
}

const Button = ({ buttonText, backgroundColor }: ButtonProps) => {
  return (
    <button
      className={styles["banner-button"]}
      style={{ backgroundColor: backgroundColor }}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
