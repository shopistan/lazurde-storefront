import React, { FC, useContext } from "react";
import { ImageType } from "lib/types/common";
import styles from "./celebrity-choice.module.scss";
import Image from "next/image";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

type CelebritiesProps = {
  celebrityImage?: ImageType | { url: ""; altText: "" };
  celebritySign?: ImageType | { url: ""; altText: "" };
};
interface CelebrityChoiceProps {
  bannerImage: ImageType | { url: ""; altText: "" };
  heading: string | "";
  celebrities: CelebritiesProps[] | [];
  detailsHeading: string | "";
  detailsDescription: string | "";
}

const CelebrityChoice: FC<CelebrityChoiceProps> = ({
  bannerImage,
  heading,
  celebrities,
  detailsHeading,
  detailsDescription,
}) => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [size] = useWindowSize();
  return (
    <div className={styles["celebrity-container"]}>
      <div>
        <div className={styles["banner-heading"]}>
          {appState?.lang === "en" ? heading : t("bannerHeading")}
        </div>
        <Image
          src={bannerImage?.url}
          alt={bannerImage?.altText}
          width={size > desktopScreenSize ? 1280 : 375}
          height={size > desktopScreenSize ? 308 : 266}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className={styles["celebrities-wrapper"]}>
        {celebrities?.map((celeb, index) => {
          return (
            <div key={index} className={styles["celebrity-card"]}>
              <Image
                src={celeb?.celebrityImage?.url}
                alt={celeb?.celebrityImage?.altText}
                width={size > desktopScreenSize ? 421 : 370}
                height={size > desktopScreenSize ? 416 : 302}
                // layout="responsive"
              />
              <Image
                src={celeb?.celebritySign?.url}
                alt={celeb?.celebritySign?.altText}
                width={244}
                height={113}
                // layout="responsive"
              />
            </div>
          );
        })}
      </div>
      <div className={styles["details-wrapper"]}>
        <div className={styles["details-heading"]}>
          <h1>{appState?.lang === "en" ? detailsHeading : "وهميهذا عنوان وهمي"}</h1>
        </div>
        <div className={styles["details-description"]}>
          <p>
            {appState?.lang === "en"
              ? detailsDescription
              : "هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي هذا وصف وهمي"}
          </p>
          <button className={styles["shop-all-btn"]}>
            {appState?.lang === "en" ? "Shop All" : t("shopAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrityChoice;
