import React, { FC } from 'react'
import Label from '../ui/label'
import Button from '../ui/button'
import Image from 'next/image'
import { ImageType } from 'lib/types/common'
import styles from './help-category.module.scss'

type CategoryProps = {
    bgColor?: string | ''
    title?: string | ''
    text?: string | ''
    contact?: string | ''
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
    return (
        <>
            <Image className={styles['category-mainImage']} src={mainImage.url} alt={mainImage.altText} layout='responsive' width={1280} height={308} />
            <Label className={styles['contact-heading']}>{heading}</Label>
            {categories && categories.length > 0 && categories.map((category, index) => {
                const { title, text, contact, image, imageText, button, tNumber, vNumber, crNumber, bgColor } = category
                return (
                    <div style={{ backgroundColor: bgColor }} key={index}>
                        <Label className={styles['category-title']}>{title}</Label>
                        <Label className={styles['category-text']}>{text}</Label>
                        {
                            contact &&
                            <Label className={styles['category-contact']}>{contact}</Label>
                        }
                        {
                            image || imageText &&
                            <div className={styles['category-imageBlock']}>
                                <Image className={styles['category-image']} src={image?.url} alt={image?.altText} />
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
                                <Label className={styles['category-tnumber']}>{tNumber}</Label>
                                <Label className={styles['category-vnumber']}>{vNumber}</Label>
                                <Label className={styles['category-crnumber']}>{crNumber}</Label>
                            </div>
                        }
                    </div>
                )
            })
            }
        </>
    )
}
export default HelpCategory