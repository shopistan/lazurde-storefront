import React, { FC } from "react";
import Cards from "components/common/card";
import { ImageType } from "lib/types/common";
import styles from "./brands-card.module.scss";
import useWindowSize from "lib/utils/useWindowSize";

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
  const size = useWindowSize();
  const onClick = () => {
    console.log("hello");
  };
  return (
    <div className={styles["cards-container"]}>
      <h3 className={styles["cards-heading"]}>{heading}</h3>

      <div className={`flex justify-between`}>
        {exploreBrandsArray &&
          exploreBrandsArray.map((data, index) => {
            const { cardTitle, cardImage } = data;
            return (
              <div className={styles["cards"]} key={index}>
                <Cards
                  onClick={onClick}
                  className={styles["brand-card"]}
                  height="100%"
                  width="100%"
                  cardTitle={cardTitle}
                  cardImage={cardImage}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default BrandsCard;
