import React from "react";

const AppleButton = ({ ...props }) => {
  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <rect x="0.5" y="0.5" width="59" height="23" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_8220_28243"
            transform="translate(0 -0.0277019) scale(0.00285714 0.00732919)"
          />
        </pattern>
        <image
          id="image0_8220_28243"
          width="350"
          height="144"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default AppleButton;