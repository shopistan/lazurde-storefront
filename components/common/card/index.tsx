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
  favIconSrc?: ImageType;
  description?: string;
  bambuserBtn?: boolean;
  bambuserBtnBody?: JSX.Element | string;
}

const Cards = ({
  cardImage,
  cardTitle,
  description = "",
  onClick,
  className = "",
  width = 10,
  height = 10,
  color = "#000000",
  favIconSrc,
  bambuserBtn = false,
  bambuserBtnBody = null,
}: CardProps): JSX.Element => {
  return (
    <>
      <div
        className={styles[className]}
        onClick={() => {
          onClick();
        }}
        data-testid="click-div"
      >
        {cardImage?.url && (
          <div className={styles["image-section"]}>
            <div className={styles["fav-icon"]}>
              {favIconSrc && (
                <Image
                  src={favIconSrc?.url || ""}
                  alt={favIconSrc.altText || "fav-icon"}
                  layout="fixed"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div className={styles["img-wrapper"]}>
              <Image
                data-testid={"card-img"}
                className={`${styles["card-image"]}`}
                src={cardImage?.url}
                alt={cardImage?.altText}
                width={width}
                height={height}
                layout="responsive"
              />
              {bambuserBtn ? (
                <div data-testid="bambuser-body" className={styles["img-btn"]}>
                  {bambuserBtnBody}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className={styles["card-content"]}>
          {cardTitle ? (
            <Label style={{ color: color }} className={styles["card-title"]}>
              {cardTitle}
            </Label>
          ) : null}
          {description ? (
            <Label
              style={{ color: color }}
              className={styles["card-description"]}
            >
              {description}
            </Label>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Cards;
