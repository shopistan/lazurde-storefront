import React from "react";

const Location = ({ ...props }) => {
  return (
    <>
      <svg
        width={props.width}
        height={props.height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.83333 2C6.61167 2 4 4.61167 4 7.83333C4 13.6667 9.83333 18.6667 9.83333 18.6667C9.83333 18.6667 15.6667 13.6667 15.6667 7.83333C15.6667 4.61167 13.055 2 9.83333 2ZM9.83333 17.525C8.4375 16.1529 4.83333 12.1879 4.83333 7.83333C4.83333 5.07625 7.07625 2.83333 9.83333 2.83333C12.5904 2.83333 14.8333 5.07625 14.8333 7.83333C14.8333 12.1883 11.2287 16.1533 9.83333 17.525Z"
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth="0.5"
        />
        <path
          d="M9.83333 8.66667C10.2936 8.66667 10.6667 8.29357 10.6667 7.83333C10.6667 7.3731 10.2936 7 9.83333 7C9.3731 7 9 7.3731 9 7.83333C9 8.29357 9.3731 8.66667 9.83333 8.66667Z"
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth="0.3"
        />
      </svg>
    </>
  );
};

export default Location;
