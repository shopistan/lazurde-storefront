import React from "react";

interface labelType {
  className?: string;
  style?: Object;
  children?: JSX.Element | string;
}

const Label = ({ className = "", style = {}, children }: labelType): JSX.Element => {
  return (
    <p className={`label-c ${className}`} style={style}>
      {children}
    </p>
  );
};

export default Label;
