import React, { FC, useContext } from "react";
import { ImageType } from "lib/types/common";
import styles from "./celebrity-choice.module.scss";
import Image from "next/image";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface CelebritiesProps {
  celebrityImage?: ImageType | { url: ""; altText: "" };
  celebritySign?: ImageType | { url: ""; altText: "" };
}
interface CelebrityChoiceProps {
  bannerImage?: ImageType | { url: ""; altText: "" };
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
      <div className={styles["banner-heading-container"]}>
        {bannerImage?.url ? (
          <Image
            src={bannerImage?.url}
            alt={bannerImage?.altText}
            width={size > desktopScreenSize ? 1280 : 375}
            height={size > desktopScreenSize ? 376 : 200}
            layout="responsive"
            objectFit="cover"
          />
        ) : null}
        <div className={styles["banner-heading"]}>
          <span>{appState?.lang === "en" ? heading : t("bannerHeading")}</span>
        </div>
      </div>
      <div className={styles["celebrities-wrapper"]}>
        {celebrities &&
          celebrities.length > 0 &&
          celebrities?.map((celeb, index) => {
            return (
              <div key={index} className={styles["celebrity-card"]}>
                {celeb?.celebrityImage?.url ? (
                  <Image
                    src={celeb?.celebrityImage?.url}
                    alt={celeb?.celebrityImage?.altText}
                    width={
                      size > desktopScreenSize ? 421 : size > 600 ? 250 : 343
                    }
                    height={
                      size > desktopScreenSize ? 416 : size > 600 ? 280 : 302
                    }
                    objectFit="cover"
                    layout="fixed"
                  />
                ) : null}
                {celeb?.celebritySign?.url ? (
                  <Image
                    src={celeb?.celebritySign?.url}
                    alt={celeb?.celebritySign?.altText}
                    width={244}
                    height={113}
                  />
                ) : null}
              </div>
            );
          })}
      </div>
      <hr className={styles["divider"]} />
      <div className={styles["details-wrapper"]}>
        <div className={styles["details-heading"]}>
          <h1>
            {appState?.lang === "en" ? detailsHeading : "وهميهذا عنوان وهمي"}
          </h1>
        </div>
        <div className={styles["details-description"]}>
          {appState.lang == "en" ? (
            <p
              key={Math.random()}
              dangerouslySetInnerHTML={{
                __html: detailsDescription,
              }}
            ></p>
          ) : (
            " نا والآن سنجعل هذا اختبارًا أكبر لمطابقة التصميم هذه فقرة وهمية مكتوبة هنا والآن سنجعل هذا اختبارًا أكبر لمطابقة التصميم"
          )}
          <button className={styles["shop-all-btn"]}>
            {appState?.lang === "en" ? "Shop All" : t("shopAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrityChoice;
