import { ImageType } from 'lib/types/common';
import React, { FC, useContext } from 'react'
import Cards from '../card/index'
import Label from '../ui/label'
import styles from './plp-category.module.scss'
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router'
import { desktopScreenSize } from 'lib/utils/common'

type PLPCategoryTypes = {
    cardTitle?: string | '';
    cardImage?: ImageType;
    cardLink?: string | '';
}

type _PLPCategoryTypes = {
    cardTitle?: string;
}


interface PLPCategoryProps {
    backgroundColor?: string;
    title?: string;
    isLeft?: Boolean;
    isRight?: Boolean;
    isCentre?: Boolean;
    text?: string;
    cards?: PLPCategoryTypes[];
}

const PLPCategory: FC<PLPCategoryProps> = ({ backgroundColor = '#fafafa', title = '', text = '', cards = [], isLeft = false, isRight = false, isCentre = true }) => {
    const { appState } = useContext(AppContext);
    const router = useRouter()
    const { t } = useTranslation("common");
    const _plpCategoryCard: _PLPCategoryTypes[] = t(
        "plpCategoryCard",
        {},
        { returnObjects: true }
    );
    return (
        <div className={styles['plpCategory-container']} style={{ backgroundColor: backgroundColor }}>
            <Label className={` ${styles["plpCategory-title"]}`}>{appState.lang == 'en' ? title : t('plpCategoryTitle')}</Label>
            <Label className={` ${styles["plpCategory-text"]}`}>{appState.lang == 'en' ? text : t('plpCategoryText')}</Label>
            <div className={` ${isLeft && 'text-left'} ${isCentre && 'text-center'} ${isRight && 'text-right'} ${styles['plpCategory-card']}`}>
                {
                    cards.length > 0 && cards.map((card, index) => {
                        const { cardImage, cardTitle, cardLink } = card
                        return (
                            <div key={index} onClick={() => { router?.push(`${cardLink}`) }}>
                                <Cards width={desktopScreenSize ? 314 : 167.5} height={desktopScreenSize ? 331 : 180.5} className={`plp-card`} cardImage={cardImage} cardTitle={appState?.lang == 'en' ? cardTitle : _plpCategoryCard[index]?.cardTitle} key={index} />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}
export default PLPCategory