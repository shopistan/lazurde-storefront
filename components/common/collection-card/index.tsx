import React, { FC, useContext } from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./index.module.scss";
import Button from "components/common/ui/button/index";
import useWindowSize from "lib/utils/useWindowSize";
import { SwiperSlide } from "swiper/react";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Slider from "components/common/ui/slider/slider";
import {desktopScreenSize} from 'lib/utils/common'

interface CollectionCardTypes {
  collectionbutton?: string;
  collectiontitle?: string;
  collectiontext?: string;
  collectionImage?: ImageType;
  collectionImageKenaz?: ImageType;
  collectionImageMissl?: ImageType;
}

interface _CollectionCardTypes {
  collectionbutton?: string;
  collectiontitle?: string;
  collectiontext?: string;
}

interface CollectionCardProps {
  collectionCard?: CollectionCardTypes[];
}

const CollectionCard: FC<CollectionCardProps> = ({
  collectionCard,
}): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation("common");

  const _collectionCard: _CollectionCardTypes[] = t(
    "collectionCard",
    {},
    { returnObjects: true }
  );
  
  return (
    <div
      className={`${styles["collection-container"]} ${appState.lang === "ar" && styles["arabic-card"]
        }`}
    >
      <Slider
        desktopSlidePerView={2}
        mobileSlidePerView={1.1}
        navigation={width > desktopScreenSize ? true : false}
        scrollbar={true}
        className={`collection-swiper`}
      >
        <>
          {collectionCard &&
            collectionCard.map((data, index) => {
              const {
                collectionImage,
                collectionbutton,
                collectionImageMissl,
                collectiontitle,
                collectionImageKenaz,
                collectiontext,
              } = data;
              return (
                <SwiperSlide key={index}>
                  <div className={styles["collection-card"]} key={index}>
                    <div className={styles["image-section"]}>
                      {collectionImageKenaz && router.pathname === "/kenaz" && (
                        <Image
                          key={index}
                          className={styles["collection-image"]}
                          src={collectionImageKenaz?.url}
                          alt={collectionImage?.altText}
                          width={desktopScreenSize ? 642 : 332}
                          height={desktopScreenSize ? 409 : 400}
                          layout="responsive"
                        />
                      )}
                      {collectionImageMissl && router.pathname === "/missl" && (
                        <Image
                          key={index}
                          className={styles["collection-image"]}
                          src={collectionImageMissl?.url}
                          alt={collectionImage?.altText}
                          width={width > desktopScreenSize ? 642 : 332}
                          height={width > desktopScreenSize ? 409 : 400}
                          layout="responsive"
                        />
                      )}
                      {router.pathname === "/" && (
                        <Image
                          key={index}
                          className={styles["collection-image"]}
                          src={collectionImage?.url}
                          alt={collectionImage?.altText}
                          width={width > desktopScreenSize ? 642 : 332}
                          height={width > desktopScreenSize ? 409 : 400}
                          layout="responsive"
                        />
                      )}

                      <Button
                        className={styles["collection-button"]}
                        buttonText={
                          appState.lang === "en"
                            ? collectionbutton
                            : _collectionCard[index].collectionbutton
                        }
                      />
                    </div>
                    <div>
                      <h3 className={styles["collection-title"]}>
                        {appState.lang === "en"
                          ? collectiontitle
                          : _collectionCard[index].collectiontitle}
                      </h3>
                      <p className={`${styles["collection-text"]}`}>
                        {appState.lang === "en"
                          ? collectiontext
                          : _collectionCard[index].collectiontext}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </>
      </Slider>
    </div>
  );
};
export default CollectionCard;
