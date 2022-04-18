import React from "react";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Label from 'components/common/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import Footer from "components/common/footer";
import Header from "components/common/header";
import { XMComponent, PageProps } from "lib/types/common";
import styles from '../styles/404.module.scss'

export default function Custom404({
  headerProps,
  brandSidebarProps,
  footerProps,
}: PageProps) {
  return (
    <>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <div className={styles["container-404"]}>
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
      <Footer {...footerProps}></Footer>
    </>
  );
}

export async function getStaticProps(context: any) {
  const globalComponents = (await fetchGlobalComponents()) || [];
  const headerProps =
    (
      globalComponents.find(
        (item: XMComponent) =>
          item.id === "Header" && item.params.headerId === "lazurdeHeader"
      ) || {}
    ).params || {};
  const footerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Footer") || {})
      .params || {};
  const brandSidebarProps =
    (
      globalComponents.find(
        (item: XMComponent) => item.id === "BrandSideBar"
      ) || {}
    ).params || {};
  return {
    props: {
      headerProps,
      footerProps,
      brandSidebarProps,
    },
  };
}
