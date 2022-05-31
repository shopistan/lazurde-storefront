import React, { useState } from "react";
import ImageMagnifier from "components/common/ui/imageMagnifier";
import { Cross } from "components/icons";
import Image from "next/image";
import styles from "./popup-image-view.module.scss";

interface PopupImageViewProps {
  closePopup: Function;
  imageArray: { url: string; altText: string }[];
  selectedImageUrl: string;
  selectedImageIndex: string | number;
  imageSize: {width: number, height: number}
}

const PopupImageView = ({
  closePopup,
  imageArray,
  selectedImageUrl,
  selectedImageIndex,
  imageSize,
}: PopupImageViewProps): JSX.Element => {
  const [imageUrl, setImageUrl] = useState(selectedImageUrl);
  const [activeImageIndex, setActiveImageIndex] = useState(selectedImageIndex);
  return (
    <>
      <div className={styles["main-popup-view"]}>
        <div className={styles["div-images-column"]}>
          {imageArray.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setImageUrl(image.url);
                  setActiveImageIndex(index);
                }}
                data-active={activeImageIndex === index}
              >
                <Image
                  src={image.url}
                  alt={image.altText}
                  layout={"fill"}
                ></Image>
              </div>
            );
          })}
        </div>
        <ImageMagnifier
          width={imageSize.width}
          height={imageSize.height}
          zoomNum={2}
          url={imageUrl}
        />
        <div
          className={styles["div-close-button"]}
          onClick={() => {
            closePopup && closePopup();
          }}
        >
          <Cross width={20}></Cross>
        </div>
      </div>
    </>
  );
};

export default PopupImageView;
