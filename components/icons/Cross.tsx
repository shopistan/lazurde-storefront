import React from "react";

const Cross = ({ ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.928932 1.07107L15.0711 15.2132M15.0711 1.07107L0.928932 15.2132"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Cross;
