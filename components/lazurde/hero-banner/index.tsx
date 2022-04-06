import { ImageType } from "lib/types/common";
import Image from "next/image";
import React, { FC , useContext } from "react";
import styles from "./Hero-banner.module.scss";
import {AppContext} from 'lib/context'
import useTranslation from "next-translate/useTranslation";
import Button from 'components/common/button/index'
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

const LazurdeHeroBanner: FC<LazurdeHeroBannerProps[]> = ({
  heroBannerArray,
}: any): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState} = useContext(AppContext);
  console.log("AppState" , appState.lang)
  return (
    <div className={styles["hero-banner-block"]}>
      {heroBannerArray &&
        heroBannerArray.map((object: any , index: any) => {
          const { backgroundImage, bannerBodyText, bannerText, buttonText } =
            object;
          return (
            <div className={styles["hero-banner-container"]} key={index} >
              <Image
                src={(backgroundImage || {}).url || "/placeholder.jpg"}
                layout="fill"
                objectFit="cover"
                quality={100}
                className={styles["bg-image"]}
              />
              <div className={styles["banner-text-section"]}>
                <h3 className={styles["banner-text"]}>{ appState?.lang == 'en' ? bannerText || "" :  t("bannerText")}</h3>
                <h5 className={styles["sample-text"]}>
                  { appState?.lang == 'en' ? bannerBodyText || "" : t("bannerBodyText")}
                </h5>
                <Button buttonText ={appState?.lang == 'en' ? buttonText : t("buttonText") } />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LazurdeHeroBanner;
