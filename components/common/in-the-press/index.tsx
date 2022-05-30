import React, { FC, useContext } from "react";
import { ImageType } from "lib/types/common";
import styles from "./in-the-press.module.scss";
import Image from "next/image";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

type StoryProps = {
  storyImage?: ImageType | { url: ""; altText: "" };
  storyTitle?: string | "";
  storyHeading?: string | "";
  storyDescriptin?: string | "";
};
interface InThePressProps {
  bannerImage: ImageType | { url: ""; altText: "" };
  heading: string | "";
  stories: StoryProps[] | [];
}

const InThePress: FC<InThePressProps> = ({ bannerImage, heading, stories }) => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [size] = useWindowSize();
  console.log("stories", stories);
  return (
    <div className={styles["inthepress-container"]}>
      <div>
        <Image
          src={bannerImage?.url}
          alt={bannerImage?.altText}
          width={size > desktopScreenSize ? 1280 : 375}
          height={size > desktopScreenSize ? 308 : 266}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className={styles["heading"]}>
        <span>{appState?.lang === "en" ? heading : t("InThePress")}</span>
      </div>
      <div className={styles["stories-wrapper"]}>
        {stories?.map((story, index) => {
          return (
            <div key={index} className={styles["story-card"]}>
              <Image
                src={story?.storyImage?.url}
                alt={story?.storyImage?.altText}
                width={size > desktopScreenSize ? 400 : 343}
                height={size > desktopScreenSize ? 200 : 200}
                layout="responsive"
              />
              <a>
                {appState?.lang === "en"
                  ? story?.storyTitle
                  : "خاتم الحب مع الماس"}
              </a>
              <span>
                {appState?.lang === "en"
                  ? story?.storyHeading
                  : "هذا عنوان وهمي"}
              </span>
              <p>
                {appState?.lang === "en"
                  ? story?.storyDescriptin
                  : " نا والآن سنجعل هذا اختبارًا أكبر لمطابقة التصميم هذه فقرة وهمية مكتوبة هنا والآن سنجعل هذا اختبارًا أكبر لمطابقة التصميم"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InThePress;
