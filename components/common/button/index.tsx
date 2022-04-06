import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  buttonText : string
}

const Button = ({buttonText} : ButtonProps) => {
return (
    <button className={styles["banner-button"]}>
    {buttonText || ""}
  </button>
)
}
export default Button