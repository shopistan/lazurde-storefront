import React from "react";
const FillHeart = ({
  fill = "#fff",
  stroke = "#fff",
  ...props
}: {
  fill?: string;
  stroke?: string;
}) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M1220 4763 c-459 -70 -834 -351 -1053 -788 -61 -123 -103 -244 -134
-394 -23 -109 -26 -150 -27 -311 0 -156 3 -202 22 -290 65 -300 214 -605 445
-913 231 -307 611 -686 1002 -998 280 -224 696 -516 936 -658 137 -81 160 -82
285 -8 551 328 1231 868 1622 1287 453 486 692 894 779 1329 27 132 24 402 -5
549 -93 465 -368 851 -751 1050 -120 63 -180 86 -306 118 -136 35 -375 44
-515 20 -161 -28 -357 -103 -484 -184 -156 -100 -323 -261 -418 -403 -29 -43
-55 -79 -58 -79 -3 0 -30 37 -60 83 -72 108 -260 296 -370 369 -165 109 -342
181 -526 213 -79 14 -316 19 -384 8z"
        />
      </g>
    </svg>
  );
};

export default FillHeart;
