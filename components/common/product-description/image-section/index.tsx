import Slider from "components/common/ui/slider/slider";
import ZoomIcon from "components/icons/zoomIcon";
import Image from "next/image";
import React, { FC, useContext, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./image-section.module.scss";
import PopupImageView from "./popup-image-view";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";

const images = [
  {
    url: "/dummy-image1.png",
    altText: "",
  },
  {
    url: "/dummy-image2.png",
    altText: "",
  },
  {
    url: "/dummy-image3.png",
    altText: "",
  },
  {
    url: "/dummy-image4.png",
    altText: "",
  },
];

interface ImageSectionProps {
  imageArray: { url: string; altText: string }[];
  setShowPopup: Function;
  setSelectedImageUrl: Function;
  setSelectedImageIndex: Function;
}

const ImageSection = ({ imageArray = images }): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 });
  const [width] = useWindowSize();

  useEffect(() => {
    if (width > desktopScreenSize) {
      setImageSize({ width: 600, height: 600 });
    } else {
      setImageSize({ width: 400, height: 400 });
    }
  }, [width]);

  return (
    <>
      <div className={styles["main-image-section"]}>
        {width > desktopScreenSize ? (
          <DesktopImageSection
            imageArray={imageArray}
            setShowPopup={setShowPopup}
            setSelectedImageUrl={setSelectedImageUrl}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        ) : (
          <MobileImageSection
            imageArray={imageArray}
            setShowPopup={setShowPopup}
            setSelectedImageUrl={setSelectedImageUrl}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        )}
      </div>
      {showPopup && (
        <PopupImageView
          closePopup={() => {
            setShowPopup(false);
          }}
          imageArray={imageArray}
          selectedImageUrl={selectedImageUrl}
          selectedImageIndex={selectedImageIndex}
          imageSize={imageSize}
        ></PopupImageView>
      )}
    </>
  );
};

export default ImageSection;

const DesktopImageSection = ({
  imageArray,
  setShowPopup,
  setSelectedImageUrl,
  setSelectedImageIndex,
}: ImageSectionProps): any => {
  return imageArray?.map((image, index) => {
    return (
      <div
        key={index}
        className={styles["div-image-container"]}
        onClick={() => {
          setShowPopup(true);
          setSelectedImageUrl(image?.url);
          setSelectedImageIndex(index);
        }}
      >
        <Image
          src={image?.url || "/"}
          alt={image?.altText || ""}
          layout={"fill"}
        />
        <div className={styles["div-zoom-icon"]}>
          <ZoomIcon />
        </div>
      </div>
    );
  });
};

const MobileImageSection = ({
  imageArray,
  setShowPopup,
  setSelectedImageUrl,
  setSelectedImageIndex,
}: ImageSectionProps): any => {
  return (
    <Slider mobileSlidePerView={1} productSlider={true} pagination={true}>
      {imageArray?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              key={index}
              className={styles["div-image-container"]}
              onClick={() => {
                setShowPopup(true);
                setSelectedImageUrl(image?.url);
                setSelectedImageIndex(index);
              }}
            >
              <Image
                src={image?.url || "/"}
                alt={image?.altText || ""}
                layout={"fill"}
              />
              {/* <div className={styles["div-zoom-icon"]}>
              <ZoomIcon />
            </div> */}
            </div>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};
