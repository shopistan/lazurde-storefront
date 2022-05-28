import React, { FC } from "react";
import { ImageType } from "lib/types/common";

interface InThePressProps {
  bannerImage: ImageType | { url: ""; altText: "" };
  heading: string | "";
  stories: [];
  title: string | "";
}

const InThePress: FC<InThePressProps> = ({
  title,
  bannerImage,
  heading,
  stories,
}) => {
  return <div>In the Press..</div>;
};

export default InThePress;
