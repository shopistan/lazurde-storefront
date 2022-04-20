import React, { useContext } from "react";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface SliderProps {
  children?: JSX.Element | string;
  desktopSlidePerView?: number;
  mobileSlidePerView?: number;
  navigation?: boolean;
  scrollbar?: boolean;
  className?: string;
}

const Slider = ({
  children,
  desktopSlidePerView = 4,
  mobileSlidePerView = 1.1,
  navigation = true,
  scrollbar = true,
  className = "",
}: SliderProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={8}
      slidesPerView={width > 1023 ? desktopSlidePerView : mobileSlidePerView}
      navigation={navigation}
      scrollbar={{ draggable: scrollbar }}
      className={className}
      key={appState?.lang}
      dir={appState?.lang === "en" ? "ltr" : "rtl"}
    >
      {children}
    </Swiper>
  );
};
export default Slider;
