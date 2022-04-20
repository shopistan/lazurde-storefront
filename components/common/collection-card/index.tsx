import React, { FC, useContext } from "react";
import Image from "next/image";
import { ImageType } from "lib/types/common";
import styles from "./index.module.scss";
import Button from "components/common/ui/button/index";
import useWindowSize from "lib/utils/useWindowSize";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

interface CollectionCardTypes {
  collectionbutton: string;
  collectiontitle: string;
  collectiontext: string;
  collectionImage: ImageType;
  collectionImageKenaz: ImageType;
  collectionImageMissl: ImageType;
}

interface _CollectionCardTypes {
  collectionbutton: string;
  collectiontitle: string;
  collectiontext: string;
}

interface CollectionCardProps {
  collectionCard: CollectionCardTypes[];
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
      className={`${styles["collection-container"]} ${
        appState.lang === "ar" && styles["arabic-card"]
      }`}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={8}
        slidesPerView={width > 1023 ? 2 : 1.08}
        navigation={width > 1023 ? true : false}
        scrollbar={{ draggable: true }}
        className={`collection-swiper`}
        key={appState?.lang}
        dir={appState?.lang === "en" ? "ltr" : "rtl"}
      >
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
                        width={width > 1023 ? 642 : 332}
                        height={width > 1023 ? 409 : 400}
                        layout="responsive"
                      />
                    )}
                    {collectionImageMissl && router.pathname === "/missl" && (
                      <Image
                        key={index}
                        className={styles["collection-image"]}
                        src={collectionImageMissl?.url}
                        alt={collectionImage?.altText}
                        width={width > 1023 ? 642 : 332}
                        height={width > 1023 ? 409 : 400}
                        layout="responsive"
                      />
                    )}
                    {router.pathname === "/" && (
                      <Image
                        key={index}
                        className={styles["collection-image"]}
                        src={collectionImage?.url}
                        alt={collectionImage?.altText}
                        width={width > 1023 ? 642 : 332}
                        height={width > 1023 ? 409 : 400}
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
      </Swiper>
    </div>
  );
};
export default CollectionCard;
