import { ImageType } from 'lib/types/common';
import React, { FC } from 'react'
import Card from '../card/index'
import Label from '../ui/label'

type PLPCategoryTypes = {
    cardTitle: string;
    cardImage: ImageType;
}

interface PLPCategoryProps {
    title: string | '';
    text: string | '';
    cards: PLPCategoryTypes[] | [];
}

const PLPCategory: FC<PLPCategoryProps> = ({ title, text, cards }) => {
    return (
        <>
            <Label>{title}</Label>
            <Label>{text}</Label>
            {
                cards && cards.length > 0 && cards.map((data, index) => {
                    const { cardImage, cardTitle } = data
                    return (
                        <Card cardImage={cardImage} cardTitle={cardTitle} key={index} />
                    )
                })
            }
        </>
    )
}
export default PLPCategory