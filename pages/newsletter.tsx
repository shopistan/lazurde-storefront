import React, { FC, useContext, useState, useEffect } from "react";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import AppContentWrapper from "../components/common/app-content-wrapper";
import { AppContext } from "lib/context";

const LazurdeHome: FC<PageProps> = ({
  headerProps,
  headerArray,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  const { appState } = useContext(AppContext);
  const [headerData, setHeaderData] = useState<any>({});

  const getCurrentBrandId = () => {
    if (appState?.brand === `L'azurde`) return "lazurdeHeader";
    else if (appState?.brand === `Miss L'`) return "missLHeader";
    else if (appState?.brand === "Kenaz") return "kenazHeader";
    else return "lazurdeHeader";
  };

  useEffect(() => {
    const currentHeaderProps: any[] =
      headerArray &&
      headerArray?.length > 0 &&
      headerArray?.filter((header: { params: any }) => {
        return header.params.headerId === getCurrentBrandId();
      });
    setHeaderData(currentHeaderProps?.[0]?.params);
  }, []);

  return (
    <>
      <Head>
        <title>
          L&apos;azurde | Luxury Jewelry, Gifts &amp; Accessories |
          L&apos;AZURDE
        </title>
      </Head>
      <Header {...headerData} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        <div className={"component-container"}>
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
  const pageComponents = (await fetchXMComponents(12, "/newsletter")) || [];
  const headerArray =
    globalComponents.filter((item: XMComponent) => item.id === "Header") || {};
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
      headerArray,
      footerProps,
      brandSidebarProps,
      pageComponents,
    },
    revalidate: 5,
  };
}
