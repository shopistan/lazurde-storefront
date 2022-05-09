import React from "react";

const Tick = ({ ...props }) => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.10971L5.58917 9.46942L14.2837 1.20957L13.8 0.75L5.58917 8.55028L1.48375 4.65014L1 5.10971Z"
        fill="black"
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default Tick;
