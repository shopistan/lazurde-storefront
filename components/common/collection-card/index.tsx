import React, { FC, useContext } from "react";
import Image from 'next/image'
import { ImageType } from "lib/types/common";
import styles from './index.module.scss';
import Button from 'components/common/ui/button/index'
import useWindowSize from "lib/utils/useWindowSize";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from 'lib/context/index';
import useTranslation from "next-translate/useTranslation";

interface collectionCardProps {
    collectionbutton: string;
    collectiontitle: string;
    collectiontext: string;
    collectionImage: ImageType;
}

interface CollectionCardPropsArray {
    collectionCard: collectionCardProps[];
}


const CollectionCard: FC<CollectionCardPropsArray> = ({ collectionCard }): JSX.Element => {
    const [width] = useWindowSize();
    const { appState } = useContext(AppContext);
      const { t } = useTranslation("common");
      const _collectionCard =
    appState.lang === "en"
      ? collectionCard
      : t("arabicCollectionCard", {}, { returnObjects: true });
    return (

        <div className={styles["collection-container"]}>
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

                {Array.isArray(_collectionCard) &&
                    _collectionCard && _collectionCard.map((data, index) => {
                        const { collectionImage, collectionbutton, collectiontitle, collectiontext } = data
                        return (
                            <SwiperSlide>
                                <div className={styles["collection-card"]} key={index}>
                                    <div className={styles["image-section"]}>
                                        <Image key={index} className={styles["collection-image"]} src={collectionImage.url} alt={collectionImage.altText} width={width > 1023 ? 642 : 332} height={width > 1023 ? 409 : 400} layout="responsive" />
                                        <Button className={styles["collection-button"]} buttonText={collectionbutton} />
                                    </div>
                                    <div>
                                        <h3 className={styles["collection-title"]}>{collectiontitle}</h3>
                                        <p className={styles["collection-text"]}>{collectiontext}</p>
                                    </div>
                                </div>

                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
export default CollectionCard