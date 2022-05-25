import React, { FC } from "react";
import { ImageType } from "lib/types/common";
import styles from "./celebrity-choice.module.scss";
import Image from "next/image";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

type CelebritiesProps = {
  celebrityImage?: ImageType | { url: ""; altText: "" };
  celebritySign?: ImageType | { url: ""; altText: "" };
};
interface CelebrityChoiceProps {
  bannerImage: ImageType | { url: ""; altText: "" };
  heading: string | "";
  celebrities: CelebritiesProps[] | [];
  title: string | "";
}

const CelebrityChoice: FC<CelebrityChoiceProps> = ({
  title,
  bannerImage,
  heading,
  celebrities,
}) => {
  const [size] = useWindowSize();
  return (
    <div className={styles["celebrity-container"]}>
      <div>
        <Image
          src={bannerImage?.url}
          alt={bannerImage?.altText}
          width={size > desktopScreenSize ? 1280 : 376}
          height={size > desktopScreenSize ? 308 : 120}
          layout="responsive"
        />
      </div>
      <div>
        {celebrities?.map((celeb) => {
          <div>
            <Image
              src={celeb?.celebrityImage?.url}
              alt={celeb?.celebrityImage?.url}
              width={size > desktopScreenSize ? 421.33 : 372}
              height={size > desktopScreenSize ? 416 : 120}
              layout="responsive"
            />
            <Image
              src={celeb?.celebritySign?.url}
              alt={celeb?.celebritySign?.url}
              width={244}
              height={113}
              layout="responsive"
            />
          </div>;
        })}
      </div>
    </div>
  );
};

export default CelebrityChoice;
