import React, { FC, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { KenazLogo, LazurdeLogo, LazurdeLSLogo, MisslLogo } from 'components/icons';
import styles from "./brand-sidebar.module.scss";
"./publo"
const brandData = [
  {
    url: "/brand-lazurde.jpg",
    altText: 'brand image',
    label: 'L’azurde',
    labelUrl: '/',
  },
  {
    url: '/brand-missL.jpg',
    altText: 'brand image',
    label: 'Miss L’',
    labelUrl: '/',
  },
  {
    url: '/brand-kenaz.jpg',
    altText: 'brand image',
    label: 'Kenaz',
    labelUrl: '/',
  },
  {
    url: '/brand-lazurdeLS.jpg',
    altText: 'brand image',
    label: 'L’azurde InStyle',
    labelUrl: '/',
  },
]

interface BrandProps {
  url: string;
  altText: string;
  label: string;
  labelUrl: string;
}

interface SidebarProps {
  isOpened: boolean;
  setIsOpened: Function;

}

const BrandContainer: FC<BrandProps> = ({ url, altText, label, labelUrl }): JSX.Element => {
  return (
    <div>
      <Image src={url} alt={altText} width={'186px'} height={'183px'} layout='intrinsic' />
      <Link href={labelUrl}>
        <a >
          {label}
        </a>
      </Link>
    </div>
  )
}

const BrandSideBar: FC<SidebarProps> = ({ isOpened, setIsOpened}): JSX.Element => {

  return (
    <>
      <div className={styles["overlay"]} data-opened={isOpened} onClick={(() => setIsOpened(!isOpened))}></div>
      <div className={styles["brand_sidebar"]} data-opened={isOpened}>
        <div className={styles["text_div"]}>
          <div>
            <LazurdeLogo width="182px" height="24px" />
          </div>
          <div className={styles["slogan_div"]}>
            <span >One Account. One Checkout. Multiple Brands</span>
          </div>
          <div className="flex gap-x-[8px]">
            <LazurdeLogo width="88px" height="12px" />
            <MisslLogo width="80px" height="13px" />
            <KenazLogo width="79px" height="12px" />
            <LazurdeLSLogo width="77px" height="22px" />
          </div>
        </div>
        <div className={styles["brand_div"]}>
          {brandData.map((data) => {
            return BrandContainer({ ...data })
          })}
        </div>
      </div>
    </>

  );
};

export default BrandSideBar;