import React from "react";
import Image from "next/image";

interface ExploreBrandProps {
  url: string;
  altText: string;
  title: string;
}

const ExploreBrand = ({ url, altText, title }: ExploreBrandProps) => {
  return (
    <>
      <div>
        {url && <Image width={'100%'} height={'100%'} src={url} alt={altText} />}
        {title && <h3>{title}</h3>}
      </div>
    </>
  );
};
export default ExploreBrand;
