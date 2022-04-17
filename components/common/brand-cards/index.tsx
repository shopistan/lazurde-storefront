import React, { FC, useContext } from "react";
import Cards from "components/common/card";
import { ImageType } from "lib/types/common";
import styles from "./brands-card.module.scss";
import useWindowSize from "lib/utils/useWindowSize";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";

type BrandCardsType = {
  cardTitle: string;
  cardImage: ImageType;
};

interface BrandCardsProps {
  heading: string;
  brandCards: BrandCardsType[];
}

const BrandsCard: FC<BrandCardsProps> = ({
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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={width > 1023 ? 3 : 1.29}
        navigation={width > 1023 ? true : false}
        scrollbar={{ draggable: true }}
        className={`card-brands`}
        key={appState?.lang}
        dir={appState?.lang === "en" ? "ltr" : "rtl"}
      >
        <div className={`flex justify-between`}>
          {brandCards &&
            brandCards.map((data, index) => {
              const { cardTitle, cardImage } = data;
              return (
                <SwiperSlide key={index}>
                  <div className={styles["cards"]} key={index}>
                    <Cards
                      onClick={onClick}
                      className={styles["brand-card"]}
                      height="100%"
                      width="100%"
                      cardTitle={cardTitle}
                      cardImage={cardImage}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>
    </div>
  );
};
export default BrandsCard;
