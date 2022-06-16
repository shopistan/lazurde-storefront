import React from "react";
const MinusIcon = ({ ...props }) => {
  return (
    <svg
      width={props.width || "19"}
      height={props.height || "19"}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.8 9.5H15.2"
        stroke={props.color || "black"}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MinusIcon;
