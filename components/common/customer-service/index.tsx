import React, { FC, useState } from 'react'
import Label from 'components/common/ui/label'
import Image from 'next/image'
import { ImageType } from 'lib/types/common'
import styles from './customer-service.module.scss'
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from 'lib/utils/common'
import { useRouter } from "next/router";

type ServicesProps = {
    icon: ImageType | { url: '', altText: '' }
    iconTitle: string | ''
    iconText: string | ''
    url: string | ''
}

interface CustomerServiceProps {
    bannerImage: ImageType | { url: '', altText: '' }
    heading: string | ''
    services: ServicesProps[] | []
    inputIcon: ImageType | { url: '', altText: '' }
    title: string | ''
}

const CustomerService: FC<CustomerServiceProps> = ({ title, bannerImage, heading, services, inputIcon }) => {
    const [width] = useWindowSize();
    const [filterBlock, setFilterBlock] = useState(services)
    const router = useRouter();
    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        const nameFilter = services.filter(
            (val) => val?.iconTitle?.toString().toLowerCase().indexOf(inputValue) === 0
        );
        setFilterBlock(nameFilter);
    }

    return (
        <div className={styles['services-container']}>
            <div className={styles['services_search-section']}>
                <div>
                    {
                        bannerImage?.url &&
                        <Image className={styles['services_banner-image']} src={bannerImage?.url} alt={bannerImage?.altText} width={width > desktopScreenSize ? 1280 : 375} height={width > desktopScreenSize ? 308 : 120} layout='responsive' />
                    }
                </div>
                <div className={styles['text-section']}>
                    {
                        heading &&
                        <Label className={styles['heading']}>{heading}</Label>
                    }
                    <div className={styles['search-bar']}>
                        <Image src={inputIcon.url} alt={inputIcon.altText} width={width > desktopScreenSize ? 20 : 16} height={width > desktopScreenSize ? 20 : 16} />
                        <input placeholder='Search' onChange={(e) => { handleFilter(e) }} />
                    </div>

                </div>
            </div>
            {
                title &&
                <Label className={styles['title']}>{title}</Label>
            }
            <div className={styles['service-section']}>
                {
                    filterBlock && filterBlock && filterBlock.length > 0 ? filterBlock.map((object, index) => {
                        const { icon, iconTitle, iconText, url = '/' } = object
                        return (
                            <div onClick={() => { router?.push(url && url) }} key={index} className={styles['service-block']}>
                                <div>
                                    <div className={styles['icon-block']}>
                                        {
                                            icon?.url &&
                                            <Image src={icon.url} alt={icon.altText} width={27} height={31} />
                                        }
                                        {
                                            iconTitle &&
                                            <Label className={styles['icon-title']}>{iconTitle}</Label>
                                        }
                                    </div>
                                    {
                                        iconText &&
                                        <Label className={styles['icon-text']}>{iconText}</Label>
                                    }
                                </div>
                            </div>

                        )
                    })
                        : (
                            <>
                                <p>No matching found</p>
                            </>
                        )}
            </div>
            <button className={styles['button']}><Image src={'/question.png'} width={20} height={20} /><p>{'Have a question?'}</p></button>
        </div>
    )
}
export default CustomerService