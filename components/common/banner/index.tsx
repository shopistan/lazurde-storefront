import React, { FC, useContext } from 'react'
import Label from '../ui/label'
import Image from 'next/image'
import styles from './banner.module.scss'
import { ImageType } from 'lib/types/common'
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";

interface BannerProps {
    bgColor: string;
    title: string;
    text: string;
    backgroundImage: ImageType;
}

const Banner: FC<BannerProps> = ({ bgColor = '#FEFBF4', title = '', text = '', backgroundImage = {} }) => {
    const { appState } = useContext(AppContext);
    const { t } = useTranslation("common");
    const [width] = useWindowSize();
    return (
        <div className={styles['banner-container']} style={{ backgroundColor: bgColor }}>
            {
                backgroundImage && backgroundImage.url &&
                <div className={`${styles['banner-image-section']} ${appState?.lang == 'ar' && styles['arabic-layout']}`}>
                    <Image className={`${styles['banner-image']}`} src={backgroundImage?.url} width={width > 1023 ? 903 : 329} height={width > 1023 ? 297 : 108} layout={width > 767 ? 'responsive' : 'fixed'} alt={backgroundImage?.altText || ''} />
                </div>
            }
            <div className={styles['banner-text-section']}>
                <Label className={styles['banner-title']} children={appState?.lang == 'en' ? title : t("bannerTitle")} />
                <Label className={styles['banner-text']} children={appState?.lang == 'en' ? text : t("bannerSubTitle")} />
            </div>
        </div>
    )
}
export default Banner