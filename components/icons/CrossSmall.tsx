import React from "react";

const CrossSmall = ({ ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
        }}
        onClick={() => {
          props.onClick && props.onClick();
        }}
        role={props?.role}
      ></div>
      <svg
        width={props?.width || "10"}
        height={props?.height || "11"}
        viewBox="0 0 10 11"
        fill={props?.color || "#000"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.757359 1.24264L9.24264 9.72792M9.24264 1.24264L0.757359 9.72792"
          stroke={props?.color || "black"}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default CrossSmall;
