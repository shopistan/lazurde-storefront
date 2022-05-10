import React from "react";
const ChevronDown = ({ ...props }) => {
  return (
    <svg
      width={props.width || "10px"}
      height={props.height || "7px"}
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.64645 4.56784C3.84171 4.7631 4.15829 4.7631 4.35355 4.56784L7.53553 1.38586C7.7308 1.1906 7.7308 0.874015 7.53553 0.678752C7.34027 0.48349 7.02369 0.48349 6.82843 0.678752L4 3.50718L1.17157 0.678753C0.976311 0.483491 0.659728 0.483491 0.464466 0.678753C0.269204 0.874015 0.269204 1.1906 0.464466 1.38586L3.64645 4.56784ZM3.5 3.5L3.5 4.21429L4.5 4.21429L4.5 3.5L3.5 3.5Z"
        fill={props.color || '#000'}
      />
    </svg>
  );
};

export default ChevronDown;
