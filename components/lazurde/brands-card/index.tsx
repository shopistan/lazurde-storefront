import React, { FC } from "react";
import Cards from "components/common/card";
import { ImageType } from "lib/types/common";
import styles from "./brands-card.module.scss";

interface ExploreBrandsProps {
  cardTitle: string;
  cardImage: ImageType;
}

interface ExploreBrandArray {
  heading: string;
  exploreBrandsArray: ExploreBrandsProps[];
}

const BrandsCard: FC<ExploreBrandArray> = ({
  heading,
  exploreBrandsArray,
}): JSX.Element => {
  return (
    <>
    <h3>
      {heading}
    </h3>
      <div className={`flex justify-evenly ${styles["brands-container"]}`}>
        {exploreBrandsArray &&
          exploreBrandsArray.map((data: any) => {
            const { cardTitle, cardImage } = data;
            return <Cards onClick className={styles['card']} cardTitle={cardTitle} cardImage={cardImage} />;
          })}
      </div>
    </>
  );
};
export default BrandsCard;
