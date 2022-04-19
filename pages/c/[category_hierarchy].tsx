import React, { FC } from "react";
import { PageProps, XMComponent } from "lib/types/common";
import { GetStaticProps } from "next";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import Header from "components/common/header";
import AppContentWrapper from "components/common/app-content-wrapper";
import styles from "../styles/Home.module.css";
import { componentsById } from "components/xm-component-library";
import Footer from "components/common/footer";

const LazurdeProductListingPage: FC<PageProps> = ({
  headerProps,
  footerProps,
  pageComponents,
  brandSidebarProps,
}) => {
  return (
    <>
      <Head>
        <title>
          {"L'azurde | Luxury Jewelry, Gifts & Accessories | L'AZURDE"}
        </title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        <div className={styles.container}>
          {/* <div className={styles.links}>
            <Link href={"/en-sa"} locale="en-sa">
              <a>Lazurde en-sa</a>
            </Link>
          </div> */}
          {pageComponents.map((component: XMComponent, index) => {
            const Component = componentsById[component.id];
            if (Component) {
              return <Component {...component.params} key={index} />;
            }
            return null;
          })}
        </div>
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default LazurdeProductListingPage;

export const getStaticProps: GetStaticProps = async (context: any) => {
  console.log("Category Page Context", context);
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/home")) || [];
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
      pageComponents,
    },
    revalidate: 5,
  };
};
