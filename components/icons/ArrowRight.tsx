import React from "react";

const ArrowRight = ({ fill = "#000", fillOpacity='1', width = "5", height = "8", className = '' }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M4.06355 4.35355C4.25882 4.15829 4.25882 3.84171 4.06355 3.64645L0.881572 0.464466C0.68631 0.269204 0.369728 0.269204 0.174466 0.464466C-0.0207964 0.659729 -0.0207963 0.976311 0.174466 1.17157L3.00289 4L0.174466 6.82843C-0.0207958 7.02369 -0.0207957 7.34027 0.174466 7.53553C0.369728 7.7308 0.686311 7.7308 0.881573 7.53553L4.06355 4.35355ZM3 4.5L3.71 4.5L3.71 3.5L3 3.5L3 4.5Z"
          fill={fill}
          fillOpacity={fillOpacity}
        />
      </svg>
    </>
  );
};

export default ArrowRight;
