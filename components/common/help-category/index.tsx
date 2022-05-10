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
            <Image src={mainImage.url} alt={mainImage.altText} />
            <Label>{heading}</Label>
            {categories && categories.length > 0 && categories.map((category, index) => {
                const { title, text, contact, image, imageText, button, tNumber, vNumber, crNumber, bgColor } = category
                return (
                    <div style={{ backgroundColor: bgColor }} key={index}>
                        <Label>{title}</Label>
                        <Label>{text}</Label>
                        {
                            contact &&
                            <Label>{contact}</Label>
                        }
                        {
                            image || imageText &&
                            <div>
                                <Image src={image?.url} alt={image?.altText} />
                                <Label>{imageText}</Label>
                            </div>
                        }
                        {
                            button &&
                            <Button>{button}</Button>
                        }
                        {
                            tNumber && vNumber && crNumber &&
                            <div>
                                <Label>{tNumber}</Label>
                                <Label>{vNumber}</Label>
                                <Label>{crNumber}</Label>
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