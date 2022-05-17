import React, { FC } from 'react'
import Image from 'next/image'
import styles from './content-block.module.scss'
import { ImageType } from 'lib/types/common';

interface ContentBlockProps {
    content: { name: string; content: string }
    imgUrl: ImageType
}

const ContentBlock: FC<ContentBlockProps> = ({ imgUrl, content = {} }) => {
    return (
        <>
            <div>
                {
                    imgUrl?.url &&
                    <Image src={imgUrl.url} alt={imgUrl.altText} />
                }
                <p className={styles['heading']}>{content?.name}</p>
                <p className={styles['content']} dangerouslySetInnerHTML={{ __html: content?.content }}></p>
            </div>
        </>
    )
}
export default ContentBlock