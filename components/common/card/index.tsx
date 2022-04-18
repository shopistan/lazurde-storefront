import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./card.module.scss";
import Label from "components/common/ui/label";

interface CardProps {
  cardImage?: ImageType;
  cardTitle?: string;
  className?: string;
  onClick?: Function;
  width?: number | string;
  height?: number | string;
  color?: string;
  favIconSrc ?: ImageType;
}

const Cards = ({
  cardImage,
  cardTitle,
  onClick,
  className = "",
  width = 10,
  height = 10,
  color = "#000000",
  favIconSrc,
}: CardProps): JSX.Element => {
  return (
    <>
      <div
        className={styles[`${className}`]}
        onClick={() => {
          onClick;
        }}
      >
        {cardImage?.url && (
          <div className={styles["image-section"]}>
            {
              favIconSrc &&
            <img className={styles["fav-icon"]} src={favIconSrc.url} alt={favIconSrc.altText}/>
            }
            <Image
              className={`${styles["card-image"]}`}
              src={cardImage?.url}
              alt={cardImage?.altText}
              width={width}
              height={height}
              layout="responsive"
            />
          </div>
        )}
        {cardTitle && (
          <Label style={{ color: color }} className={styles["card-title"]}>
            {cardTitle}
          </Label>
        )}
      </div>
    </>
  );
};
export default Cards;
