import React, { FC } from "react";
import { ImageType } from "lib/types/common";

interface CelebrityChoiceProps {
  bannerImage: ImageType | { url: ""; altText: "" };
  heading: string | "";
  celebrities: [];
  title: string | "";
}

const CelebrityChoice: FC<CelebrityChoiceProps> = ({
  title,
  bannerImage,
  heading,
  celebrities,
}) => {
  return <div>Celebrity Choice</div>;
};

export default CelebrityChoice;
