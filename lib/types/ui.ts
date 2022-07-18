import { ChangeEventHandler, ReactComponentElement, RefObject, FC } from "react";

export type InputType = {
  name?: string;
  value?: string;
  type?: string;
  placeHolder?: string;
  className?: string;
  style?: object;
  label?: string;
  labelClassName?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  showLabel?: boolean;
  pattern?: string;
  handleSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: any;
  inputIcon?: any;
  onImageClick?: Function;
};
