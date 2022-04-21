import React from "react";

interface labelType {
  className?: string;
  style?: Object;
  children?: JSX.Element | string;
  testId?: string;
}

const Label = ({
  className = "",
  style = {},
  children,
  testId = "",
}: labelType): JSX.Element => {
  return (
    <p data-testid={testId} className={`label-c ${className}`} style={style}>
      {children}
    </p>
  );
};

export default Label;
