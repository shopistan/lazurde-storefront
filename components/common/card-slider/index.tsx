import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowSize from "lib/utils/useWindowSize";
import Cards from "../card";
import styles from "./style.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Label from "../ui/label";

const CardSlider = ({
  cards = [],
  className = "",
  sectionHeading = "",
  bgColor = "#fff",
}): JSX.Element => {
  const [width] = useWindowSize();

  return (
    <div
      className={`${styles["card-slider__wrapper"]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {sectionHeading && (
        <Label className={styles["card-slider__section-heading"]}>
          {sectionHeading}
        </Label>
      )}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={width > 1023 ? 4 : 1.1}
        navigation={width > 1023 ? true : false}
        scrollbar={{ draggable: true }}
        className="card-slider"
      >
        <div>
          {cards &&
            cards.length > 0 &&
            cards.map((content, i) => {
              const { image, heading } = content;
              return (
                <SwiperSlide key={i}>
                  <Cards
                    cardImage={image}
                    cardTitle={heading}
                    width={width > 1023 ? 314 : 332}
                    height={width > 1023 ? 429 : 352}
                    className="category-slider-card"
                  />
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>
    </div>
  );
};

export default CardSlider;
