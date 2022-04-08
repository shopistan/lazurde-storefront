import React , {FC} from "react";
import ExploreBrand from "components/common/explore-brand";

interface ExploreBrandsProps {
  title: string;
  url: string;
  altText: string;
}

interface ExploreBrandArray {
    exploreBrandsArray: ExploreBrandsProps[];
}

const ExploreBrands : FC<ExploreBrandArray> = ({ exploreBrandsArray }: any) => {
  return (
    exploreBrandsArray &&
    exploreBrandsArray.map((data : any) => {
        const {title , url , altText} = data
      return (
        <ExploreBrand title={title} url={url} altText={altText}
        />
      );
    })
  );
};
export default ExploreBrands;
