import React, { FC, useState, useContext } from 'react'
import Label from '../ui/label'
import Button from '../ui/button'
import Image from 'next/image'
import { ImageType } from 'lib/types/common'
import styles from './help-category.module.scss'
import Whatsapp from 'components/icons/Whatsapp'
import { desktopScreenSize } from 'lib/utils/common'
import useWindowSize from "lib/utils/useWindowSize";
import FeedbackPopUp from '../feedback-popup'
import useTranslation from "next-translate/useTranslation";
import { AppContext } from 'lib/context'

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

type _CategoryProps = {
    title?: string | ''
    text?: string | ''
    details?: string | ''
    link?: string | ''
    button?: string | ''
    tNumber?: string | ''
    vNumber?: string | ''
    crNumber?: string | ''
}


interface HelpCategoryProps {
    mainImage: ImageType
    heading: string | ''
    categories: CategoryProps[]
}

const HelpCategory: FC<HelpCategoryProps> = ({ mainImage = {}, heading = '', categories }) => {
    const [width] = useWindowSize()
    const [modalOpen, setModalOpen] = useState(false)
    const { t } = useTranslation("common");
    const { appState } = useContext(AppContext);

    const handleClick = () => {
        setModalOpen(true)
    }

    const onclose = () => {
        setModalOpen(false)
    }

    const _categories: _CategoryProps[] = t(
        "categories",
        {},
        { returnObjects: true }
    );


    return (
        <>
            <div className={styles['category-container']}>
                {
                    mainImage.url &&
                    <Image className={styles['category-mainImage']} src={mainImage?.url || ''} alt={mainImage.altText || ''} layout='responsive' width={width > desktopScreenSize ? 1280 : 375} height={width > desktopScreenSize ? 308 : 131} />
                }
                {
                    heading &&
                    <Label className={styles['contact-heading']}>{appState.lang === 'en' ? heading : t('helpHeading')}</Label>
                }
                <div className={styles['category-block']} >
                    {categories && categories.length > 0 && categories.map((category, index) => {
                        const { title, text, details, imageText, button, tNumber, vNumber, crNumber, bgColor } = category
                        return (
                            <div className={styles['category-section']} style={{ backgroundColor: bgColor }}>
                                <Label className={styles['category-title']}>{appState.lang == 'en' ? title : _categories[index].title}</Label>
                                <Label className={styles['category-text']}>{appState.lang == 'en' ? text : _categories[index].text}</Label>
                                {
                                    details &&
                                    <Label className={styles['category-details']}>{appState.lang == 'en' ? details : _categories[index].details}</Label>
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
                                    <Button onClick={handleClick} className={styles['category-button']}>{appState.lang == 'en' ? button : _categories[index].button}</Button>
                                }
                                {
                                    tNumber && vNumber && crNumber &&
                                    <div className={styles['category-number']}>
                                        <Label className={styles['category-number']}>{appState.lang == 'en' ? tNumber : _categories[index].tNumber}</Label>
                                        <Label className={styles['category-number']}>{appState.lang == 'en' ? vNumber : _categories[index].vNumber}</Label>
                                        <Label className={styles['category-number']}>{appState.lang == 'en' ? crNumber : _categories[index].crNumber}</Label>
                                    </div>
                                }
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <FeedbackPopUp heading='Send Feedback' open={modalOpen} onClose={onclose} />
        </>
    )
}
export default HelpCategory