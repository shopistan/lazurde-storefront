import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import React, { FC } from "react";
import AppContentWrapper from "../../components/common/app-content-wrapper";

const MissLHome: FC<PageProps> = ({
  headerProps,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  return (
    <>
      <Head>
        <title>
          {
            "Miss L'azurde |  The best 18 karat gold jewelry at the best price in Egypt"
          }
        </title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        <div className={'component-container'}>
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

export default MissLHome;

export async function getStaticProps() {
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/missl")) || [];
  const headerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Header" && item.params.headerId === 'missLHeader') || {})
      .params || {};
  const footerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Footer") || {})
      .params || {};
  const brandSidebarProps =
    (globalComponents.find((item: XMComponent) => item.id === "BrandSideBar") || {})
      .params || {};
  return {
    props: {
      headerProps,
      footerProps,
      brandSidebarProps,
      pageComponents,
    },
    revalidate: 5,
  };
}
