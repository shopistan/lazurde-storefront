import React , {FC} from "react";
import ExploreBrand from "components/common/explore-brand";
import { ImageType } from "lib/types/common";

interface ExploreBrandsProps {
  title: string;
  backgroundImage : ImageType;
}

interface ExploreBrandArray {
    exploreBrandsArray: ExploreBrandsProps[];
}

const ExploreBrands : FC<ExploreBrandArray> = ({ exploreBrandsArray }: any) => {
  return (
    exploreBrandsArray &&
    exploreBrandsArray.map((data : any) => {
        const {title , backgroundImage} = data
      return (
        <ExploreBrand title={title} backgroundImage={backgroundImage}
        />
      );
    })
  );
};
export default ExploreBrands;
