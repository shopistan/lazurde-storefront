import React from 'react'
import Label from 'components/common/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import styles from './404.module.scss'

const Custom404 = () => {
    return <div className={styles["container-404"]}>
        <Label className={styles["title-404"]}>Whoops, our bad :(</Label>
        <Image className={styles["image-404"]} src='/404.png' alt='' width='545' height='207' />
        <Label className={styles["text-404"]}>The content you requested was not found.</Label>
        <div className={styles["link-section"]}>
            <div className={styles["links-link"]}>
                <Link href='/'>Go Back</Link>
            </div>
            <Label className={styles["link-label"]}>to the previous page.</Label>
        </div>
        <Label className={styles["text-404"]}>Follow these links to get you back on track!</Label>
        <div className={styles["link-section"]}>
        <div className={styles["links-link"]}>
            <Link href='/'>Store Home</Link>
        </div>
        <span className={styles["seperator"]}></span>
        <div className={styles["links-link"]}>
            <Link href='/'>My Account</Link>
        </div>
        </div>

    </div>
}
export default Custom404