import React, { FC } from 'react'
import Label from '../ui/label'
import Image from 'next/image'
import styles from './banner.module.scss'
import { ImageType } from 'lib/types/common'
import useWindowSize from "lib/utils/useWindowSize";

interface BannerProps {
    bgColor: string;
    title: string;
    text: string;
    backgroundImage: ImageType;
}

const Banner: FC<BannerProps> = ({ bgColor = '#FEFBF4', title = '', text = '', backgroundImage = {} }) => {
    const [width] = useWindowSize();
    return (
        <div className={styles['banner-container']} style={{ backgroundColor: bgColor }}>
            <div className={styles['banner-text-section']}>
                <Label className={styles['banner-title']} children={title} />
                <Label className={styles['banner-text']} children={text} />
            </div>
            <div data-testId='image' className={styles['banner-image-section']}>
                <Image className={styles['banner-image']} src={backgroundImage?.url || ''} width={width > 1023 ? 903 : 329} height={width > 1023 ? 246 : 108} layout='responsive' alt={backgroundImage?.altText} />
            </div>
        </div>
    )
}
export default Banner