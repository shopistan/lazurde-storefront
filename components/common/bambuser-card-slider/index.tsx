import React, { useContext } from "react";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import Cards from "../card";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import Label from "components/common/ui/label";
import Slider from "components/common/ui/slider/slider";
import BambuserPopup from "../bambuser-popup";

type CardsArrType = {
  image?: { url: string; altText: string };
  heading?: string;
  description?: string;
  bambuserId?: string;
  btnText?: string;
};
interface BambuserCardSliderProps {
  className?: string;
  sectionHeading?: string;
  bgColor?: string;
  cards?: CardsArrType[];
  testId?: string;
}

const BambuserCardSlider = ({
  cards = [],
  className = "",
  sectionHeading = "",
  bgColor = "rgba(0, 0, 0, 0.02)",
  testId = "",
}: BambuserCardSliderProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const arabicBambuserSliderData = t(
    "arabicBambuserSliderData.cards",
    {},
    { returnObjects: true }
  );
  const arabicData = (index: number) => {
    const _array =
      Array.isArray(arabicBambuserSliderData) &&
      arabicBambuserSliderData.length > 0 &&
      arabicBambuserSliderData[index];
    return _array;
  };

  return (
    <div
      className={`${styles["bambuser-card-slider__wrapper"]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <Label
        testId={testId}
        className={styles["bambuser-card-slider__section-heading"]}
      >
        {appState?.lang === "en"
          ? sectionHeading
          : t("arabicBambuserSliderData.sectionHeading")}
      </Label>
      <Slider
        desktopSlidePerView={4}
        mobileSlidePerView={1.349}
        navigation={true}
        scrollbar={true}
        className={`bambuser-card-slider`}
      >
        <>
          {Array.isArray(cards) &&
            cards.length > 0 &&
            cards.map((content, index) => {
              const { image, heading, description, btnText, bambuserId } =
                content;
              return (
                <SwiperSlide key={index}>
                  <Cards
                    cardImage={image}
                    cardTitle={
                      appState?.lang === "en"
                        ? heading
                        : arabicData(index)?.heading
                    }
                    description={
                      appState?.lang === "en"
                        ? description
                        : arabicData(index)?.description
                    }
                    width={width > 1023 ? 314 : 264}
                    height={width > 1023 ? 314 : 264}
                    className="bambuser-slider-card"
                    bambuserBtn={true}
                    bambuserBtnBody={
                      <div className={styles["bambuser-btn-wrapper"]}>
                        <BambuserPopup
                          key={appState?.lang}
                          className={styles["bambuser-btn-arrow"]}
                          scriptId={Math.random() * index + "1"}
                          videoPlayBtn={true}
                          bId={bambuserId}
                        />
                      </div>
                    }
                  />
                  <div className={styles["bambuser-btn-wrapper"]}>
                    <BambuserPopup
                      key={appState?.lang}
                      className={styles["bambuser-btn"]}
                      scriptId={Math.random() * index + "2"}
                      bId={bambuserId}
                      btnText={
                        appState?.lang === "en"
                          ? btnText
                          : arabicData(index)?.btnText
                      }
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </>
      </Slider>
    </div>
  );
};

export default BambuserCardSlider;
