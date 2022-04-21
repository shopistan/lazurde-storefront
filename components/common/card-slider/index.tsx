import React, { useContext } from "react";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import Cards from "../card";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import Label from "components/common/ui/label";
import Slider from "components/common/ui/slider/slider";

type CardsArrType = {
  image?: { url: string; altText: string };
  heading?: string;
};
interface CardSliderProps {
  className?: string;
  sectionHeading?: string;
  bgColor?: string;
  cards?: CardsArrType[];
  testId?: string;
}

const CardSlider = ({
  cards = [],
  className = "",
  sectionHeading = "",
  bgColor = "#fff",
  testId = "",
}: CardSliderProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const _arabicCardData = t(
    "cardSliderData.cards",
    {},
    { returnObjects: true }
  );

  return (
    <div
      className={`${styles["card-slider__wrapper"]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <Label testId={testId} className={styles["card-slider__section-heading"]}>
        {appState?.lang === "en"
          ? sectionHeading
          : t("cardSliderData.sectionHeading")}
      </Label>
      <Slider
        desktopSlidePerView={4}
        mobileSlidePerView={1.1}
        navigation={width > 1023 ? true : false}
        scrollbar={true}
        className={`card-slider`}
      >
        <>
          {Array.isArray(cards) &&
            cards.length > 0 &&
            cards.map((content, index) => {
              const { image, heading } = content;
              return (
                <SwiperSlide key={index}>
                  <Cards
                    cardImage={image}
                    cardTitle={
                      appState?.lang === "en"
                        ? heading
                        : Array.isArray(_arabicCardData) &&
                          _arabicCardData.length > 0 &&
                          _arabicCardData[index].heading
                    }
                    width={width > 1023 ? 314 : 332}
                    height={width > 1023 ? 429 : 352}
                    className="category-slider-card"
                  />
                </SwiperSlide>
              );
            })}
        </>
      </Slider>
    </div>
  );
};

export default CardSlider;
