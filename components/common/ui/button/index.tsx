import React, { MouseEventHandler } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  className?: string;
  buttonText?: string | Function;
  buttonStyle?: "black" | "white" | "underline";
  buttonSize?: "sm" | "md" | "lr" | "xl" | "xxl" | "fill";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  children?: JSX.Element | string;
}

const Button = ({
  className = "",
  type = "button",
  buttonText = "",
  buttonStyle = "black",
  buttonSize = "md",
  children,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      data-testid={"button"}
      data-style={buttonStyle}
      data-size={buttonSize}
      className={`${styles["button"]} ${className}`}
      onClick={(e) => onClick(e)}
      type={type}
    >
      {buttonText || ""}
      {children || ""}
    </button>
  );
};
export default Button;
