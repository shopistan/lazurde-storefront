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
  inputIcon = "",
  pattern=null,
  onImageClick = () => {},
}: InputType): JSX.Element => {
  return (
    <div className={styles["container"]}>
      {showLabel && (
        <label className={`${styles["label"]} ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className={styles["div-input"]}>
        <input
          className={`${styles["input-c"]} ${className}`}
          type={type}
          name={name}
          style={style}
          value={value}
          pattern={pattern}
          placeholder={placeHolder}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
          onKeyDown={(e) => handleSubmit(e)}
          ref={inputRef as any}
        />
        <div
          className={styles["input-icon"]}
          onClick={() => {
            onImageClick && onImageClick();
          }}
        >
          {inputIcon}
        </div>
      </div>

      <div className={`${styles["error-msg"]} ${error ? "div-error-msg" : ""}`}>
        {error}
      </div>
    </div>
  );
};

export default Input;
