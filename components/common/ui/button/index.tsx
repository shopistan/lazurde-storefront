import React, {MouseEventHandler} from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText: string;
  buttonStyle: string;
  buttonSize: "sm" | "md" | "lr";
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ buttonText, buttonStyle = 'black', buttonSize = "md", onClick }: ButtonProps): JSX.Element => {
  return (
    <button
      data-testid={'button'}
      data-style={buttonStyle}
      data-size={buttonSize}
      className={styles["button"]}
      onClick={onClick}
    >
      {buttonText || ""}
    </button>
  );
};
export default Button;
