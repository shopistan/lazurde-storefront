import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./card.module.scss";

interface ExploreBrandProps {
  cardImage: ImageType;
  cardTitle: string;
  className : string;
}

const Cards = ({ cardImage, cardTitle, className }: ExploreBrandProps): JSX.Element => {
  return (
    <>
      <div className={`${styles["card-container"]}`}>
        {cardImage?.url && (
          <img
            className={`${styles["card-image"]}`}
            src={cardImage.url}
            alt={cardImage.altText}
          />
        )}
        {cardTitle && <h3 className={className}>{cardTitle}</h3>}
      </div>
    </>
  );
};
export default Cards;
