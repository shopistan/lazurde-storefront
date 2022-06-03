import React, { useState } from "react";
import ImageMagnifier from "components/common/ui/imageMagnifier";
import { Cross, CrossSmall } from "components/icons";
import Image from "next/image";
import styles from "./popup-image-view-v2.module.scss";
import Slider from "components/common/ui/slider/slider";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

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
  const [width] = useWindowSize();
  return (
    <>
      <div className={styles["main-popup-view"]}>
        <Slider
          className={"popup-image-slider"}
          desktopSlidePerView={1}
          productSlider={false}
          hasScrollbar={false}
          pagination={false}
          navigation={true}
        >
          {imageArray?.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className={`${
                    styles["div-image-container"]
                  } ${"swiper-zoom-container"}`}
                >
                  {/* <Image
                    src={image?.url || "/"}
                    alt={image?.altText || ""}
                    layout={"fill"}
                  /> */}
                  <ImageMagnifier
                    width={imageSize.width}
                    height={imageSize.height}
                    zoomNum={2}
                    url={image?.url}
                    imageIndex={index}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Slider>

        <div
          className={styles["div-close-button"]}
          onClick={() => {
            closePopup && closePopup();
          }}
        >
          {width >= desktopScreenSize ? (
            <Cross width={20}></Cross>
          ) : (
            <CrossSmall></CrossSmall>
          )}
        </div>
      </div>
    </>
  );
};

export default PopupImageViewV2;
