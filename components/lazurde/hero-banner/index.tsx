import ProductCard from "../../../components/common/product-card";
import { ImageObject } from "lib/types/common";
import Image from "next/image";
import React, { FC } from "react";
import styles from "./Hero-banner.module.css";

interface EnumProducts {
  title: string;
  description: string;
  price: Number;
}

interface EnumServiceItems extends Array<EnumProducts> {}

interface LazurdeHeroBannerProps {
  backgroundImage: ImageObject;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
  products: EnumServiceItems;
}

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps> = ({
  backgroundImage,
  bannerText,
  buttonText,
  buttonLink,
  products,
}): JSX.Element => {
  return (
    <div className={styles["w-100"]}>
      <div className={styles["hero-banner-container"]}>
        <div className={styles["welcome-message"]}>
          <h1 className={styles["welcome-message-h"]}>{bannerText || ""}</h1>{" "}
          <h3>
            {" "}
            {`The greatest selection of sale pieces from the world's best designer -
     only on L'AZURDE`}{" "}
          </h3>
          <button className={styles["button-1"]}>{buttonText || ""}</button>
        </div>
      </div>
      <div className={styles["trending-h"]}>
        <h2>{`What's Trending`}</h2>
      </div>
      <div className={styles["whats-trending-section"]}>
        {[1, 2, 3, 4]?.map((item, i) => {
          return (
            <ProductCard
              key={i}
              title={"New Title"}
              price={0.9}
              description={""}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LazurdeHeroBanner;
