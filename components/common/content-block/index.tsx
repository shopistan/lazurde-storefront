import React, { FC } from 'react'
import Image from 'next/image'
import styles from './content-block.module.scss'
import { ImageType } from 'lib/types/common';

interface ContentBlockProps {
    content: { name: string; content: string; icon: { url: string, altText: string } }
}

const ContentBlock: FC<ContentBlockProps> = ({ content = {} }) => {
    return (
        <>
            <div className={styles['content-container']}>
                {
                    content.icon?.url &&
                    <div className={styles['image']}>
                        <Image src={content.icon.url} alt={content.icon.altText} width={16} height={16} />
                    </div>
                }
                <p className={styles['heading']}>{content?.name}</p>
                <p className={styles['content']} dangerouslySetInnerHTML={{ __html: content?.content }}></p>
            </div>
        </>
    )
}
export default ContentBlock