import React from "react";

const IconTick = ({ ...props }) => {
  return (
    <svg
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4233 1.47217L4.47206 8.42346L0.999888 4.95128"
        stroke={props?.stroke || "white"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconTick;
