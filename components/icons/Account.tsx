import React from "react";

const Account = ({ ...props }) => {
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
          d="M12.0371 10.6446C13.5 9.87875 14.5 8.34917 14.5 6.58333C14.5 4.05208 12.4479 2 9.91667 2C7.38542 2 5.33333 4.05208 5.33333 6.58333C5.33333 8.34917 6.33333 9.87875 7.79625 10.6446C4.45417 11.6208 2 14.8371 2 18.6667H17.8333C17.8333 14.8371 15.3792 11.6208 12.0371 10.6446ZM6.16667 6.58333C6.16667 4.51542 7.84875 2.83333 9.91667 2.83333C11.9846 2.83333 13.6667 4.51542 13.6667 6.58333C13.6667 8.65125 11.9846 10.3333 9.91667 10.3333C7.84875 10.3333 6.16667 8.65125 6.16667 6.58333ZM9.91667 11.1667C13.5562 11.1667 16.5637 14.0887 16.9567 17.8333H2.87667C3.26958 14.0887 6.27708 11.1667 9.91667 11.1667Z"
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth="0.5"
        />
      </svg>
    </>
  );
};

export default Account;
