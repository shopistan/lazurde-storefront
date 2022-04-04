import { AppContext } from "lib/context";
import { ImageType } from "lib/types/common";
import { addProductToCart } from "lib/utils/cart";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React, { FC, useContext, useEffect } from "react";
import styles from "./Hero-banner.module.css";

interface LazurdeHeroBannerProps {
  backgroundImage: ImageType;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
}

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps> = ({
  backgroundImage,
  bannerText,
  buttonText,
  buttonLink,
}): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div className={styles["hero-banner-container"]}>
      <Image
        src={(backgroundImage || {}).url || "/placeholder.jpg"}
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles["bg-image"]}
      />
      <div className={styles["banner-text-section"]}>
        <h3>{bannerText || ""}</h3>
        <h5>{t("sampleTranslationText")}</h5>
        <button>{buttonText || ""}</button>
      </div>
    </div>
  );
};

export default LazurdeHeroBanner;
