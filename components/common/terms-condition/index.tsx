import React, { FC, useState } from 'react'
import ContentBlock from '../content-block'
import Image from 'next/image'
import Label from '../ui/label'
import { ImageType } from 'lib/types/common'
import styles from './term-condition.module.scss'

type HyperLinksProps = {
    linkUrl: ImageType
    name: string | ''
    content: string | ''
}

interface TermCondtionProps {
    hyperLinks: HyperLinksProps[]
    sideBarBgcolor: string | ''
    contentBgcolor: string | ''
    icon: ImageType
}

const TermCondtion: FC<TermCondtionProps> = ({ hyperLinks, sideBarBgcolor, contentBgcolor, icon }) => {
    const [objects, setObjects] = useState({ name: '', content: '', linkUrl: {} })

    return (
        <div className={styles['term-comtainer']}>
            <Label className={styles['term-heading']}>Lazurde Policies</Label>
            <div className={styles['term-section']}>
                <div className={styles['term-left']} style={{ backgroundColor: sideBarBgcolor }}>

                    {
                        hyperLinks && hyperLinks.map((object, index) => {
                            const { linkUrl, name, content } = object
                            return (
                                <div className={styles['term-block']} key={index} onClick={() => {
                                    setObjects({
                                        content: content,
                                        name: name,
                                        linkUrl: {
                                            url: icon.url,
                                            altText: icon.altText
                                        }
                                    })
                                }}>
                                    <img src={linkUrl.url} alt={linkUrl.altText} />
                                    <Label>{name}</Label>
                                </div>

                            )

                        })

                    }
                </div>
                <div className={styles['term-right']} style={{ backgroundColor: contentBgcolor }}>
                    <ContentBlock imgUrl={icon} content={objects} />

                </div>
            </div>

        </div>
    )
}
export default TermCondtion