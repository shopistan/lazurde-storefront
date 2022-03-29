import { AppContext } from "lib/context";
import { ImageObject } from "lib/types/common";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React, { FC, useContext, useEffect } from "react";
import styles from "./Hero-banner.module.css";

interface LazurdeHeroBannerProps {
  backgroundImage: ImageObject;
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
  const { brand, setBrand } = useContext(AppContext);
  const { t } = useTranslation("common");
  useEffect(() => {
    setBrand("missl");
  }, []);
  console.log("Brand", brand);

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
