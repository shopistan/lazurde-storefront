import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { AppContext } from "lib/context";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import React, { FC, useContext, useEffect, useState } from "react";
import AppContentWrapper from "../../components/common/app-content-wrapper";
import { useRouter } from "next/router";

const KenazHome: FC<PageProps> = ({
  headerProps,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  const router = useRouter();
  const { appState, saveAppState } = useContext(AppContext);

  const { pathname, query, asPath } = router || {
    pathname: "",
    query: "",
    asPath: "",
  };
  const { push } = useRouter() || { push: () => {} };
  const navigateToLocale = (locale: string) => {
    push({ pathname, query }, asPath, { locale: locale });
  };

  useEffect(() => {
    if (appState?.brand === "Kenaz") {
      saveAppState({
        ...appState,
        region: "sa",
        locale: `${appState?.lang}-${"sa"}`,
      });
      navigateToLocale(`${appState?.lang}-${"sa"}`);
    }
  }, [appState?.brand]);

  return (
    <>
      <Head>
        <title>{"Kenaz | L'azurde"}</title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      {/* <Header {...headerProps}></Header> */}
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

export default KenazHome;

export async function getStaticProps() {
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/kenaz")) || [];
  const headerProps =
    (
      globalComponents.find(
        (item: XMComponent) =>
          item.id === "Header" && item.params.headerId === "kenazHeader"
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
