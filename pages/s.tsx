import AppContentWrapper from "components/common/app-content-wrapper";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { performKeywordSearch } from "lib/algolia";
import { AlgoliaProductType } from "lib/types/algolia";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { FC } from "react";

interface SearchPageProps extends PageProps {
  algoliaSearchResults: {
    hits: AlgoliaProductType[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    query: string;
  };
}

const SearchPage: FC<SearchPageProps> = ({
  headerProps,
  footerProps,
  brandSidebarProps,
  pageComponents,
  algoliaSearchResults,
}) => {
  console.log("Search Page Props: ", algoliaSearchResults);
  return (
    <>
      <Head>
        <title>
          {"L'azurde | Luxury Jewelry, Gifts & Accessories | L'AZURDE"}
        </title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        {pageComponents.map((component: XMComponent, index) => {
          const Component = componentsById[component.id];
          if (Component) {
            return <Component {...component.params} key={index} />;
          }
          return null;
        })}
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { query = {} } = context;
  const {
    hits = [],
    nbHits,
    page,
    nbPages,
    hitsPerPage,
  } = await performKeywordSearch({
    query: query.keyword || "",
  });
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/search")) || [];
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
      algoliaSearchResults: {
        hits,
        nbHits,
        page,
        nbPages,
        hitsPerPage,
        query: query.keyword,
      },
    },
  };
};
