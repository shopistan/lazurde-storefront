import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./card.module.scss";
import Label from "components/common/ui/label/index";

interface ExploreBrandProps {
  cardImage: ImageType;
  cardTitle: string;
  className : string;
  onClick: Function;
  width: string;
  height: string;
}

const Cards = ({
  cardImage,
  cardTitle,
  onClick,
  className,
  width,
  height,
}: ExploreBrandProps): JSX.Element => {
  return (
    <>
      <div
        className={className}
        onClick={() => {
          onClick;
        }}
      >
        {cardImage?.url && (
          <Image
            className={`${styles["card-image"]}`}
            src={cardImage.url}
            alt={cardImage.altText}
            width={width}
            height={height}
            layout="responsive"
          />
        )}
        {cardTitle && (
          <Label className={styles["card-title"]}>{cardTitle}</Label>
        )}
      </div>
    </>
  );
};
export default Cards;
