import Slider from "components/common/ui/slider/slider";
import ZoomIcon from "components/icons/zoomIcon";
import Image from "next/image";
import React, { FC, useContext, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./image-section.module.scss";
import PopupImageView from "./popup-image-view";
import PopupImageViewV2 from "./popup-image-view-v2";
import { checkMediaType, desktopScreenSize } from "lib/utils/common";
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
  setSelectedImageUrl?: Function;
  setSelectedImageIndex?: Function;
  selectedImageIndex?: number;
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
          imageArray &&
          imageArray?.length > 0 && (
            <DesktopImageSectionV2
              imageArray={imageArray}
              setShowPopup={setShowPopup}
              setSelectedImageUrl={setSelectedImageUrl}
              setSelectedImageIndex={setSelectedImageIndex}
            />
          )
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
        <PopupImageViewV2
          closePopup={() => {
            setShowPopup(false);
          }}
          imageArray={imageArray}
          selectedImageUrl={selectedImageUrl}
          selectedImageIndex={selectedImageIndex}
          imageSize={imageSize}
        ></PopupImageViewV2>
      )}
    </>
  );
};

export default ImageSection;

const DesktopImageSectionV1 = ({
  imageArray,
  setShowPopup,
  setSelectedImageUrl,
  setSelectedImageIndex,
}: ImageSectionProps): any => {
  return imageArray?.map((image, index) => {
    return (
      <div
        key={index}
        className={styles["div-image-container-v1"]}
        onClick={() => {
          setSelectedImageIndex(index);
          setSelectedImageUrl(image?.url);
          setShowPopup(true);
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

const DesktopImageSectionV2 = ({
  imageArray,
  setShowPopup,
  setSelectedImageUrl,
  setSelectedImageIndex,
}: ImageSectionProps): any => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(imageArray[0]?.url);

  return (
    <div className={styles["div-image-container-v2"]}>
      <div
        onClick={() => {
          setSelectedImageIndex(activeImageIndex);
          setSelectedImageUrl(imageUrl);
          setShowPopup(true);
        }}
        className={styles["div-selected-image"]}
      >
        {MultiMediaDisplay(imageUrl, false)}
        <div className={styles["div-zoom-icon"]}>
          <ZoomIcon />
        </div>
      </div>
      <div className={styles["div-images-column"]}>
        {imageArray &&
          imageArray.length > 1 &&
          imageArray.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setImageUrl(image.url);
                  setActiveImageIndex(index);
                }}
                data-active={activeImageIndex === index}
              >
                {MultiMediaDisplay(image.url, true)}
                {/* <Image
                  src={image.url}
                  alt={image.altText}
                  layout={"fill"}
                ></Image> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const MobileImageSection = ({
  imageArray,
  setShowPopup,
  setSelectedImageUrl,
  setSelectedImageIndex,
  selectedImageIndex,
}: ImageSectionProps): any => {
  return (
    <Slider
      mobileSlidePerView={1}
      productSlider={true}
      initialSlide={selectedImageIndex}
    >
      {imageArray?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              key={index}
              className={styles["div-image-container-v2"]}
              onClick={() => {
                setShowPopup(true);
                setSelectedImageUrl(image?.url);
                setSelectedImageIndex(index);
              }}
            >
              {checkMediaType(image?.url) !== "img" ? (
                <>
                  <video
                    autoPlay={false}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    height="100%"
                    width="100%"
                    controls={false}
                  >
                    <source src={`${image?.url}#t=0.1`} type="video/mp4" />
                  </video>
                  <div className={styles["label-360-view"]}>360 view</div>
                </>
              ) : (
                image?.url && (
                  <Image
                    src={image?.url || "/"}
                    alt={image?.altText || ""}
                    layout={"fill"}
                  />
                )
              )}

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

const MultiMediaDisplay = (imageUrl: string, showLabel: boolean) => {
  return (
    <>
      {checkMediaType(imageUrl) !== "img" ? (
        <>
          <video
            autoPlay={false}
            muted={true}
            loop={true}
            playsInline={true}
            height="100%"
            width="100%"
            controls={false}
          >
            <source src={`${imageUrl}#t=0.1`} type="video/mp4" />
          </video>
          {showLabel && (
            <div className={styles["label-360-view"]}>360 view</div>
          )}
        </>
      ) : (
        imageUrl && (
          <Image src={imageUrl || "/"} alt={""} layout={"fill"}></Image>
        )
      )}
    </>
  );
};
