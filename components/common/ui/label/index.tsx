import React from "react";

interface labelType {
  className?: string;
  style?: Object;
  children?: string | JSX.Element;
  testId?: string;
  role?: string;
}

const Label = ({
  className = "",
  style = {},
  children,
  testId = "",
  role = "",
}: labelType): JSX.Element => {
  return (
    <p
      data-testid={testId}
      role={role}
      className={`label-c ${className}`}
      style={style}
    >
      {children}
    </p>
  );
};

export default Label;
