import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./card.module.scss";

interface ExploreBrandProps {
  backGroundImage: ImageType;
  title: string;
}

const Cards = ({ backGroundImage, title }: ExploreBrandProps): JSX.Element => {
  return (
    <>
      <div className={`${styles["explore-container"]}`}>
        {backGroundImage?.url && (
          <img
            className={`${styles["explore-image"]}`}
            src={backGroundImage.url}
            alt={backGroundImage.altText}
            // layout="fill"
            // objectFit="cover"
            // quality={100}
          />
        )}
        {title && <h3 className={styles["explore-title"]}>{title}</h3>}
      </div>
    </>
  );
};
export default Cards;
