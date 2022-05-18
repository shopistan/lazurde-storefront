import React, { FC } from 'react'
import Label from 'components/common/ui/label'
import Image from 'next/image'
import { ImageType } from 'lib/types/common'

type ServicesProps = {
    title: string | ''
    icon: ImageType | { url: '', altText: '' }
    iconTitle: string | ''
    iconText: string | ''
}

interface CustomerServiceProps {
    bannerImage: ImageType | { url: '', altText: '' }
    heading: string | ''
    services: ServicesProps[] | []
    inputIcon : ImageType | { url: '', altText: '' }
}

const CustomerService: FC<CustomerServiceProps> = ({ bannerImage, heading, services ,inputIcon }) => {
    console.log('props' , services);
    
    return (
        <>
            <div>
                {
                    bannerImage?.url &&
                    <Image src={bannerImage?.url} alt={bannerImage?.altText} width={1280} height={100} />
                }
                {
                    heading &&
                    <Label>{heading}</Label>
                }
                <Image src={inputIcon.url} alt={inputIcon.altText}  />
                <input placeholder=''/>
            </div>
            {
                services && services?.map((object, index) => {
                    const { title, icon, iconTitle, iconText } = object
                    return (
                        <div key={index}>
                            {
                                title &&
                                <Label>{title}</Label>
                            }
                            <div>
                                <div>
                                    {
                                        icon?.url &&
                                        <Image src={icon.url} alt={icon.altText} width={1280} height={100} />
                                    }
                                    {
                                        iconTitle &&
                                        <Label>{iconTitle}</Label>
                                    }
                                </div>
                                {
                                    iconText &&
                                    <Label>{iconText}</Label>
                                }
                            </div>
                        </div>

                    )
                })
            }
        </>
    )
}
export default CustomerService