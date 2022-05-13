//@ts-nocheck
import React, { FC, useContext } from "react";
import Cards from "components/common/card";
import { ImageType } from "lib/types/common";
import styles from "./Brand-cards.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
//import { SwiperSlide } from "swiper/react";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import Slider from "components/common/ui/slider/slider";
import { desktopScreenSize } from "lib/utils/common";
import dynamic from "next/dynamic";

const DynamicSwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

type BrandCardsType = {
  cardTitle: string;
  cardImage: ImageType;
  favIconSrc: ImageType;
};

interface BrandCardsProps {
  heading: string;
  brandCards: BrandCardsType[];
}

const BrandCards: FC<BrandCardsProps> = ({
  heading,
  brandCards,
}): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");
  const onClick = () => {};

  return (
    <div className={styles["cards-container"]}>
      <h3 data-testid="heading" className={styles["cards-heading"]}>
        {appState?.lang === "en" ? heading : t("cardHeading")}
      </h3>
      <Slider
        desktopSlidePerView={3}
        mobileSlidePerView={1.1}
        navigation={width > desktopScreenSize ? true : false}
        scrollbar={true}
        className={`card-brands`}
      >
        <div className={`flex justify-between`}>
          {brandCards &&
            brandCards.map((data, index) => {
              const { cardTitle, cardImage, favIconSrc } = data;
              return (
                <DynamicSwiperSlide key={index}>
                  <div
                    className={`${styles["cards"]} ${
                      appState.lang == "ar" && styles["arabic-card"]
                    }`}
                    key={index}
                  >
                    <Cards
                      onClick={onClick}
                      className={styles["brand-card"]}
                      height="100%"
                      width="100%"
                      cardTitle={cardTitle}
                      cardImage={cardImage}
                      favIconSrc={favIconSrc}
                    />
                  </div>
                </DynamicSwiperSlide>
              );
            })}
        </div>
      </Slider>
    </div>
  );
};
export default BrandCards;
