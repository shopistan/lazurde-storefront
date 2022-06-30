import { InputType } from "lib/types/ui";
import React, { useRef, useEffect } from "react";
import styles from "./Input.module.scss";

const Input = ({
  className,
  style,
  value,
  type = "text",
  placeHolder = "",
  label = "Placeholder",
  labelClassName,
  onChange = (e) => {},
  onBlur = (e) => {},
  showLabel = true,
  handleSubmit = (e) => {},
  inputRef,
  name = "",
  error = "",
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
        type={type}
        name={name}
        style={style}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        onKeyDown={(e) => handleSubmit(e)}
        ref={inputRef as any}
      ></input>
      <div className={styles["error-msg"]}>{error}</div>
    </div>
  );
};

export default Input;
