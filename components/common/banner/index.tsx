import React , {FC} from 'react'
import Label from '../ui/label'
import Image from 'next/image'
import styles from './banner.module.scss'
import { ImageType } from 'lib/types/common'

interface BannerProps {
    bgColor: string;
    title: string;
    text: string;
    backgroundImage: ImageType;
}

const Banner : FC<BannerProps> = ({ bgColor = '#FEFBF4', title, text, backgroundImage }) => {
    return (
        <div className={styles['banner-container']} style={{ backgroundColor: bgColor }}>
            <div className='banner-text-section'>
                <Label className='banner-title' children={title} />
                <Label className='banner-text' children={text} />
            </div>
            <div className='banner-image-section'>
                <Image className='banner-image' src={backgroundImage.url} alt={backgroundImage.altText} width={903} height={297} layout='responsive' />
            </div>
        </div>
    )
}
export default Banner