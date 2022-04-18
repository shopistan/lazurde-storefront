import React, { MouseEventHandler } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  className?: string;
  buttonText?: string | Function;
  buttonStyle?: string;
  buttonSize?: "sm" | "md" | "lr" | "xl" | "xxl";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}

const Button = ({
  className = '',
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
      className={`${styles["button"]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
