import Footer from "components/common/footer";
import Header from "components/common/header";
import ProductCard from "components/lazurde/product-card";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import AppContentWrapper from "../components/common/app-content-wrapper";
import styles from "../styles/Home.module.css";

const LazurdeHome: FC<PageProps> = ({
  headerProps,
  footerProps,
  pageComponents = [],
}) => {
  console.log("HomePageProps", pageComponents);
  useEffect(() => {
    console.log("HomePage Mounted");
  }, []);
  return (
    <>
      <Header {...headerProps}></Header>
      <AppContentWrapper>
        <div className={styles.container}>
          {/* <div className={styles.links}>
            <Link href={"/en-sa"} locale="en-sa">
              <a>Lazurde en-sa</a>
            </Link>
            <Link href={"/"} locale="ar-sa">
              <a>Lazurde ar-sa</a>
            </Link>
            <Link href={"/"} locale="en-ae">
              <a>Lazurde en-ae</a>
            </Link>
            <Link href={"/"} locale="ar-ae">
              <a>Lazurde ar-ae</a>
            </Link>
            <Link href={"/"} locale="en-eg">
              <a>Lazurde en-eg</a>
            </Link>
            <Link href={"/"} locale="ar-eg">
              <a>Lazurde ar-eg</a>
            </Link>

            <Link href={"/kenaz"}>
              <a>Kenaz HomePage</a>
            </Link>
            <Link href={"/missl"}>
              <a>Miss'L HomePage</a>
            </Link>
          </div> */}
          {pageComponents.map((component: XMComponent, index) => {
            const Component = componentsById[component.id];
            if (Component) {
              return <Component {...component.params} key={index} />;
            }
            return null;
          })}
          <ProductCard image={{url: '', altText: ''}} title={'some title'} description={'some description'} price={'some price'} ></ProductCard>
        </div>
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default LazurdeHome;

export async function getServerSideProps(context: any) {
  const globalComponents = await fetchGlobalComponents();
  const pageComponents = await fetchXMComponents("/home");
  const headerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Header") || {})
      .params || {};
  const footerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Footer") || {})
      .params || {};
  return {
    props: {
      headerProps,
      footerProps,
      pageComponents,
    },
  };
}
