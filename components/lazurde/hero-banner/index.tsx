import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { FC } from "react";
import styles from "./Hero-banner.module.scss";

interface LazurdeHeroBannerProps {
  backgroundImage: ImageType;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
  bannerBodyText: string;
}

interface PropTypes {
  heroBannerArray: LazurdeHeroBannerProps[];
}

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps[]> = ({
  heroBannerArray,
}: any): JSX.Element => {
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
