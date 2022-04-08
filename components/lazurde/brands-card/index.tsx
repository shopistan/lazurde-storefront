import React, { FC } from "react";
import Cards from "components/common/card";
import { ImageType } from "lib/types/common";
import styles from './brands-card.module.scss'

interface ExploreBrandsProps {
  title: string;
  backgroundImage: ImageType;
}

interface ExploreBrandArray {
  exploreBrandsArray: ExploreBrandsProps[];
}

const BrandsCard: FC<ExploreBrandArray> = ({ exploreBrandsArray }: any) => {
  return (
    <div className= {styles['explore-container']}>
      {exploreBrandsArray &&
        exploreBrandsArray.map((data: any) => {
          const { title, backgroundImage } = data;
          return (
              <Cards title={title} backgroundImage={backgroundImage} />
          );
        })}
    </div>
  );
};
export default BrandsCard;
