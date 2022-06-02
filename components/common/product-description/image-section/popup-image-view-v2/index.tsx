import React, { useState } from "react";
import ImageMagnifier from "components/common/ui/imageMagnifier";
import { Cross } from "components/icons";
import Image from "next/image";
import styles from "./popup-image-view-v2.module.scss";
import Slider from "components/common/ui/slider/slider";
import { SwiperSlide } from "swiper/react";

interface PopupImageViewProps {
  closePopup: Function;
  imageArray: { url: string; altText: string }[];
  selectedImageUrl: string;
  selectedImageIndex: string | number;
  imageSize: { width: number; height: number };
}

const PopupImageViewV2 = ({
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
        <Slider desktopSlidePerView={1} productSlider={false} hasScrollbar={false} pagination={false} navigation={true}>
          {imageArray?.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div key={index} className={styles["div-image-container"]}>
                  <Image
                    src={image?.url || "/"}
                    alt={image?.altText || ""}
                    layout={"fill"}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Slider>
        {/* <ImageMagnifier
          width={imageSize.width}
          height={imageSize.height}
          zoomNum={2}
          url={imageUrl}
        /> */}
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

export default PopupImageViewV2;
