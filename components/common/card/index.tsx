import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./card.module.scss";

interface ExploreBrandProps {
  backgroundImage: ImageType;
  title: string;
}

const Cards = ({ backgroundImage, title }: ExploreBrandProps): JSX.Element => {
  return (
    <>
      <div>
        {backgroundImage?.url && (
          <Image
            className={styles["explore-image"]}
            src={backgroundImage.url}
            alt={backgroundImage.altText}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        )}
        {title && <h3 className={styles["explore-title"]}>{title}</h3>}
      </div>
    </>
  );
};
export default Cards;
