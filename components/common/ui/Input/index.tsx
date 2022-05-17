import { InputType } from "lib/types/ui";
import React, { useRef, useEffect } from "react";
import styles from "./Input.module.scss";

const Input = ({
  className,
  style,
  value,
  placeHolder = "This is placeholder text",
  label = "Placeholder",
  labelClassName,
  onChange = (e) => {},
  showLabel = true,
  handleSubmit = (e) => {},
  inputRef,
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
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => handleSubmit(e)}
        ref={inputRef as any}
      ></input>
    </div>
  );
};

export default Input;
