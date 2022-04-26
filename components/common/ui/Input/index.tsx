import { Search } from "components/icons";
import { InputType } from "lib/types/ui";
import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  className,
  style,
  value,
  placeholder = "This is placeholder text",
  label = "Placeholder",
  labelClassName,
  onChange = (e) => {},
  showLabel = true,
}: InputType): JSX.Element => {
  return (
    <div className={styles["input-container"]}>
      {showLabel && (
        <label className={`${styles["label"]} ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        className={`${styles["input-c"]} ${className}`}
        style={style}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      ></input>
    </div>
  );
};

export default Input;
