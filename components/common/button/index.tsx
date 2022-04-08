import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText: string;
  buttonStyle: string;
}

const Button = ({ buttonText, buttonStyle = 'black' }: ButtonProps): JSX.Element => {
  return (
    <button
      data-testid={'hero-button'}
      data-style={buttonStyle}
      className={styles["banner-button"]}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
