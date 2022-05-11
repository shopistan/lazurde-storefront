import React from "react";

const ArrowLeft = ({
  fill = "#000",
  fillOpacity="1",
  width = "5",
  height = "8",
  className = "",
}) => {
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
          d="M0.647384 3.64645C0.452122 3.84171 0.452122 4.15829 0.647384 4.35355L3.82936 7.53553C4.02463 7.7308 4.34121 7.7308 4.53647 7.53553C4.73173 7.34027 4.73173 7.02369 4.53647 6.82843L1.70804 4L4.53647 1.17157C4.73173 0.976311 4.73173 0.659728 4.53647 0.464466C4.34121 0.269204 4.02463 0.269204 3.82936 0.464466L0.647384 3.64645ZM1.71094 3.5H1.00094L1.00094 4.5H1.71094L1.71094 3.5Z"
          fill={fill}
          fillOpacity={fillOpacity}
        />
      </svg>
    </>
  );
};

export default ArrowLeft;
