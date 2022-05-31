import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { desktopScreenSize } from 'lib/utils/common'

interface SliderProps {
  children?: any | JSX.Element | string;
  desktopSlidePerView?: number;
  mobileSlidePerView?: number;
  pagination?: boolean;
  navigation?: boolean;
  scrollbar?: boolean;
  className?: string;
  productSlider?: boolean;
}

const Slider = ({
  children,
  desktopSlidePerView = 4,
  mobileSlidePerView = 1.1,
  navigation = false,
  scrollbar = false,
  pagination = false,
  productSlider = false,
  className = "",
}: SliderProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const [renderSlider, setRendeSlider] = useState(false);

  useEffect(() => {
    setRendeSlider(true);
  }, [appState]);

  const sliderSetting = {
    modules: [Navigation, Pagination, Scrollbar, A11y],
    spaceBetween: 8,
    slidesPerView: width > desktopScreenSize ? desktopSlidePerView : mobileSlidePerView,
    navigation: navigation,
    scrollbar: { draggable: scrollbar },
    className: className,
    key: appState?.lang,
    dir: appState?.lang === "en" ? "ltr" : "rtl",
  };

  const productSliderSetting = {
    modules: [Navigation, Pagination, Scrollbar, A11y],
    spaceBetween: 0,
    slidesPerView: width > desktopScreenSize ? desktopSlidePerView : mobileSlidePerView,
    pagination: { clickable: pagination },
    navigation: navigation,
    className: className,
    key: appState?.lang,
    dir: appState?.lang === "en" ? "ltr" : "rtl",
  };

  return (
    renderSlider && (
      <Swiper {...(!productSlider ? sliderSetting : productSliderSetting)}>
        {children}
      </Swiper>
    )
  );
};
export default Slider;
