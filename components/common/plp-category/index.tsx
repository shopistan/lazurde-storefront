import { ImageType } from 'lib/types/common';
import React, { FC, useContext } from 'react'
import Cards from '../card/index'
import Label from '../ui/label'
import styles from './plp-category.module.scss'
import useWindowSize from "lib/utils/useWindowSize";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";

type PLPCategoryTypes = {
    cardTitle: string;
    cardImage: ImageType;
}

type _PLPCategoryTypes = {
    cardTitle: string;
}


interface PLPCategoryProps {
    title: string;
    text: string;
    cards: PLPCategoryTypes[];
}

const PLPCategory: FC<PLPCategoryProps> = ({ title = '', text = '', cards = [] }) => {
    const { appState } = useContext(AppContext);
    const { t } = useTranslation("common");
    const _plpCategoryCard: _PLPCategoryTypes[] = t(
        "plpCategoryCard",
        {},
        { returnObjects: true }
    );
    const [width] = useWindowSize();
    return (
        <div className={styles['plpCategory-container']}>
            <Label className={styles["plpCategory-title"]}>{appState.lang == 'en' ? title : t('plpCategoryTitle')}</Label>
            <Label className={styles["plpCategory-text"]}>{appState.lang == 'en' ? text : t('plpCategoryText')}</Label>
            <div className={styles['plpCategory-card']}>

                {
                    cards.length > 0 && cards.map((card, index) => {
                        const { cardImage, cardTitle } = card
                        return (
                            <Cards width={width > 1023 ? 314 : 167.5} height={width > 1024 ? 331 : 180.5} className={`plp-card`} cardImage={cardImage} cardTitle={appState.lang == 'en' ? cardTitle : _plpCategoryCard[index].cardTitle} key={index} />

                        )
                    })
                }
            </div>
        </div>
    )
}
export default PLPCategory