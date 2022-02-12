import { ImageObject } from "lib/types/common";
import Image from "next/image";
import React, { FC } from "react";
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
  return (
    <div className={styles["hero-banner-container"]}>
      <Image
        src={(backgroundImage || {}).imageUrl || "/placeholder.jpg"}
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles["bg-image"]}
      />
      <h3>{bannerText || ""}</h3>
      <button>{buttonText || ""}</button>
    </div>
  );
};

export default LazurdeHeroBanner;
