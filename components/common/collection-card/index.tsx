import React, { FC } from "react";
import Image from 'next/image'
import { ImageType } from "lib/types/common";
import styles from './index.module.scss';
import Button from 'components/common/ui/button/index'

interface collectionCardProps {
    collectionbutton: string;
    collectiontitle: string;
    collectiontext: string;
    collectionImage : ImageType;
}

interface collectionCardPropsArray {
    collectionCard: collectionCardProps[];
}


const CollectionCard: FC<collectionCardPropsArray> = ({ collectionCard }): JSX.Element => {
    return (
        <div className={styles["collection-container"]}>
            {

                collectionCard && collectionCard.map((data, index) => {
                    const { collectionImage, collectionbutton, collectiontitle, collectiontext } = data
                    return (
                        <div className={styles["collection-card"]} key={index}>
                            <div className={styles["image-section"]}>
                                <Image className={styles["collection-image"]} src={collectionImage.url} alt={collectionImage.altText} width='100%' height='100%' />
                                <Button className={styles["collection-button"]} buttonText={collectionbutton} />
                            </div>
                            <div>
                                <h3 className={styles["collection-title"]}>{collectiontitle}</h3>
                                <p className={styles["collection-text"]}>{collectiontext}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CollectionCard