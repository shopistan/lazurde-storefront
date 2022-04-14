import React, { MouseEventHandler } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText?: string;
  buttonStyle?: string;
  buttonSize?: "sm" | "md" | "lr" | "xl";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}

const Button = ({
  type = "button",
  buttonText,
  buttonStyle = "black",
  buttonSize = "md",
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      data-testid={"button"}
      data-style={buttonStyle}
      data-size={buttonSize}
      className={styles["button"]}
      onClick={onClick}
      type={type}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
