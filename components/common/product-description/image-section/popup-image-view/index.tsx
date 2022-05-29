import ImageMagnifier from "components/common/ui/imageMagnifier";
import React from "react";

const PopupImageView = () => {
  return (
    <>
      <div>PopupImageView</div>
      <ImageMagnifier
        width={300}
        height={300}
        zoomNum={3}
        url={
          "https://cdn.lazurde.com/media/catalog/product/1/1/111405180250-1_optimized.png"
        }
      />
    </>
  );
};

export default PopupImageView;
