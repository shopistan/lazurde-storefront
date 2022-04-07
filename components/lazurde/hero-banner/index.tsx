import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { FC, useContext } from "react";
import styles from "./Hero-banner.module.scss";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import Button from "components/common/button/index";
import { useRouter } from "next/router";
interface LazurdeHeroBannerProps {
  backgroundImage: ImageType;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
  bannerBodyText: string;
}

interface PropTypes {
  heroBannerArray: LazurdeHeroBannerProps[];
}

const LazurdeHeroBanner: FC<PropTypes> = ({ heroBannerArray }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  return (
    <div
      className={`${styles["hero-banner-block"]}  ${
        heroBannerArray.length > 1 && styles["block-spacing"]
      } ${
        router.asPath == "/kenaz" || router.asPath == "/missl"
          ? styles["kenaz-spacing"]
          : ""
      }`}
    >
      {heroBannerArray &&
        heroBannerArray?.map((object: any, index: any) => {
          const { backgroundImage, bannerBodyText, bannerText, buttonText } =
            object;
          return (
            <div
              className={`${styles["hero-banner-container"]} ${
                heroBannerArray?.length > 1 && styles["block-divison"]
              } ${router.asPath == "/kenaz" ? styles["kenaz-block"] : ""} ${
                router.asPath == "/missl" ? styles["missl-block"] : ""
              }`}
              key={index}
            >
              <Image
                src={(backgroundImage || {}).url || "/placeholder.jpg"}
                layout="fill"
                objectFit="cover"
                quality={100}
                className={`${styles["bg-image"]}`}
              />
              <div className={styles["banner-text-section"]}>
                <h3 className={styles["banner-text"]} data-testid="banner-text">
                  {appState?.lang == "en" ? bannerText || "" : t("bannerText")}
                </h3>
                <h5
                  className={styles["sample-text"]}
                  data-testid="bannerBodyText"
                >
                  {appState?.lang == "en"
                    ? bannerBodyText || ""
                    : t("bannerBodyText")}
                </h5>
                <Button
                  dataTestId="hero-button"
                  backgroundColor="black"
                  buttonText={
                    appState?.lang == "en" ? buttonText : t("buttonText")
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LazurdeHeroBanner;
