import React, { FC } from 'react'
import Label from '../ui/label'
import Button from '../ui/button'
import Image from 'next/image'
import { ImageType } from 'lib/types/common'
import styles from './help-category.module.scss'
import Whatsapp from 'components/icons/Whatsapp'
import {desktopScreenSize} from 'lib/utils/common'
import useWindowSize from "lib/utils/useWindowSize";

type CategoryProps = {
    bgColor?: string | ''
    title?: string | ''
    text?: string | ''
    details?: string | ''
    link?: string | ''
    button?: string | ''
    tNumber?: string | ''
    vNumber?: string | ''
    crNumber?: string | ''
    image?: ImageType
    imageText?: string | ''
}

interface HelpCategoryProps {
    mainImage: ImageType
    heading: string | ''
    categories: CategoryProps[]
}

const HelpCategory: FC<HelpCategoryProps> = ({ mainImage = {}, heading = '', categories }) => {
    const [width] = useWindowSize()
    return (
        <div className={styles['category-container']}>
            {
                mainImage.url &&
                <Image className={styles['category-mainImage']} src={mainImage?.url || ''} alt={mainImage.altText || ''} layout='responsive' width={width > desktopScreenSize ? 1280 : 375} height={width > desktopScreenSize ? 308 : 131} />
            }
            {
                heading &&
                <Label className={styles['contact-heading']}>{heading}</Label>
            }
            <div className={styles['category-block']} >
                {categories && categories.length > 0 && categories.map((category) => {
                    const { title, text, details, imageText, button, tNumber, vNumber, crNumber, bgColor } = category
                    return (
                        <div className={styles['category-section']} style={{ backgroundColor: bgColor }}>
                            <Label className={styles['category-title']}>{title}</Label>
                            <Label className={styles['category-text']}>{text}</Label>
                            {
                                details &&
                                <Label className={styles['category-details']}>{details}</Label>
                            }
                            {
                                imageText &&
                                <div className={styles['category-imageBlock']}>
                                    <Whatsapp />
                                    <Label className={styles['category-imageText']}>{imageText}</Label>
                                </div>
                            }
                            {
                                button &&
                                <Button className={styles['category-button']}>{button}</Button>
                            }
                            {
                                tNumber && vNumber && crNumber &&
                                <div className={styles['category-number']}>
                                    <Label className={styles['category-number']}>{tNumber}</Label>
                                    <Label className={styles['category-number']}>{vNumber}</Label>
                                    <Label className={styles['category-number']}>{crNumber}</Label>
                                </div>
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
export default HelpCategory