import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { FC, useContext } from "react";
import styles from "./Hero-banner.module.scss";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import Button from "components/common/ui/button/index";
import { useRouter } from "next/router";
interface LazurdeHeroBannerTypes {
  backgroundImage: ImageType;
  bannerText: string;
  buttonText: string;
  buttonLink: string;
  bannerBodyText: string;
}

interface LazurdeHeroBannerProps {
  heroBannerArray: LazurdeHeroBannerTypes[];
}

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps> = ({ heroBannerArray }): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  return (
    <div
      className={`${styles["hero-banner-block"]}  ${
        heroBannerArray && heroBannerArray.length > 1 && styles["block-spacing"]
      } ${router?.asPath === '/missl' && styles["missl-spacing"]}`}
    >
      {heroBannerArray &&
        heroBannerArray?.map((object: any, index: any) => {
          const { backgroundImage, bannerBodyText, bannerText, buttonText } =
            object;
          return (
            <div
            style={{backgroundImage: `url(${backgroundImage.url}) `}}
              className={`${styles["hero-banner-container"]} ${
                heroBannerArray?.length > 1 && styles["block-divison"]
              } ${router?.asPath == "/kenaz" ? styles["kenaz-block"] : ""} ${
                router?.asPath == "/missl" ? styles["missl-block"] : ""
              }`}
              key={index}
            >
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
                  buttonStyle="black"
                  buttonText={
                    appState?.lang == "en" ? buttonText : t("buttonText")
                  }
                  buttonSize={'lr'}
                  onClick={() => {}}
                  type={'button'}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LazurdeHeroBanner;
