import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import React, { FC, useEffect, useContext } from "react";
import AppContentWrapper from "../components/common/app-content-wrapper";
import { AppContext } from "lib/context";
import ImageMagnifier from "components/common/ui/imageMagnifier";

const LazurdeHome: FC<PageProps> = ({
  headerProps,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  const { appState, saveAppState } = useContext(AppContext);

  useEffect(() => {
    saveAppState({
      ...appState,
      brand: `L'azurde`,
    });
  }, []);
  return (
    <>
      <Head>
        <title>
          L&apos;azurde | Luxury Jewelry, Gifts &amp; Accessories |
          L&apos;AZURDE
        </title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        <div className={"component-container"}>
          <ImageMagnifier width={300} height={300} zoomNum={3} url={"https://cdn.lazurde.com/media/catalog/product/1/1/111405180250-1_optimized.png"}/>
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

export default LazurdeHome;

export async function getStaticProps(context: any) {
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
}
