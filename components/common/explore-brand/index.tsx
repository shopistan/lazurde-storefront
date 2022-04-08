import React from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";

interface ExploreBrandProps {
  backgroundImage : ImageType;
  title: string;
}

const ExploreBrand = ({ backgroundImage, title }: ExploreBrandProps) => {
  return (
    <>
      <div>
        {backgroundImage?.url && (
          <Image
            width={"100%"}
            height={"100%"}
            src={(backgroundImage || {})?.url || "/placeholder.jpg"}
            alt={backgroundImage.altText}
          />
        )}
        {title && <h3>{title}</h3>}
      </div>
    </>
  );
};
export default ExploreBrand;
