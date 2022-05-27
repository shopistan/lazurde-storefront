import React from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";

const PopupImageView = () => {
  return (
    <>
      <div>PopupImageView</div>
      <SideBySideMagnifier
        imageSrc="/brand-missL.jpg"
        largeImageSrc="/brand-missL.jpg"
        alwaysInPlace={true}
      ></SideBySideMagnifier>
    </>
  );
};

export default PopupImageView;
