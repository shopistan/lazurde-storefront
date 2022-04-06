import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { FC, useContext } from "react";
import styles from "./Hero-banner.module.scss";
import { AppContext } from "lib/context";

interface LazurdeHeroBannerProps {
  backgroundImage: ImageType;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
  bannerBodyText: string;
}

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps[]> = ({
  heroBannerArray,
}): JSX.Element => {
  const { appState } = useContext(AppContext);
  return (
    <div className={styles["hero-banner-block"]}>
      {heroBannerArray &&
        heroBannerArray.map((object: any) => {
          const { backgroundImage, bannerBodyText, bannerText, buttonText } =
            object;
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
                <h3 className={styles["banner-text"]}>{bannerText || ""}</h3>
                <h5 className={styles["sample-text"]}>
                  {bannerBodyText || ""}
                </h5>
                <button className={styles["banner-button"]}>
                  {buttonText || ""}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LazurdeHeroBanner;
