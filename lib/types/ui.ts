import { ChangeEventHandler } from "react";

export type InputType = {
  value?: string;
  placeholder?: string;
  className?: string;
  style?: object;
  label?: string;
  labelClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  showLabel: boolean;
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
