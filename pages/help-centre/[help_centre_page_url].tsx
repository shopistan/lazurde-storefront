import React, { FC, useContext, useState, useEffect } from "react";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import {
  fetchAllLivePageRoutes,
  fetchGlobalComponents,
  fetchXMComponents,
} from "lib/xm";
import Head from "next/head";
import AppContentWrapper from "../../components/common/app-content-wrapper";
import Image from "next/image";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import { GetStaticPaths } from "next";
import { PageRouteType } from "lib/types/xm";

const HelpCentrePages: FC<PageProps> = ({
  headerProps,
  headerArray,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  const { t } = useTranslation("common");
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
    setHeaderData(currentHeaderProps?.[0].params);
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
      <div className={"back-block"}>
        <button className={"button"}>
          <Image
            src={"/question.png"}
            width={20}
            height={20}
            layout="fixed"
            alt="icon"
          />
          <p>
            {appState.lang == "en" ? "Have a question?" : t("customerButton")}
          </p>
        </button>
      </div>
    </>
  );
};

export default HelpCentrePages;

export const getStaticPaths: GetStaticPaths = async () => {
  const livePageRoutes = (await fetchAllLivePageRoutes()) || [];
  const ancillaryPageRoutes = livePageRoutes.filter(
    (pageRoute: PageRouteType) =>
      pageRoute.typeUrl === "/content" &&
      pageRoute.pageUrl.split("/").length > 2
  );
  // console.log("ancillary pageroutes", ancillaryPageRoutes);
  const paths = ancillaryPageRoutes.map((ancillaryPage: PageRouteType) => {
    return {
      params: {
        help_centre_page_url: ancillaryPage.pageUrl,
      },
    };
  });
  // for (let i = 0; i < paths.length; i++) {
  //   console.log("CPATH", paths[i].params);
  // }
  return { paths, fallback: "blocking" };
};

export async function getStaticProps(context: any) {
  //console.log("pageparams", context.params);
  const { help_centre_page_url = "" } = context.params || {};
  //console.log("help_centre_page_url", help_centre_page_url);
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents =
    (await fetchXMComponents(12, `/help-centre/${help_centre_page_url}`)) || [];
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
