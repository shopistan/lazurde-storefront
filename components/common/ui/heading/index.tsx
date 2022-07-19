import React from "react";

interface headingType {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: JSX.Element | string;
  className?: string;
  style?: object;
  testId?: string;
}

const Heading = ({
  className = "",
  children,
  element,
  style = {},
  testId = "",
}: headingType): JSX.Element => {
  const TitleTag = element;
  return (
    <>
      <TitleTag
        data-testid={testId}
        className={`heading-c ${className}`}
        style={style}
      >
        {children}
      </TitleTag>
    </>
  );
};

export default Heading;
