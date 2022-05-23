import AppContentWrapper from "components/common/app-content-wrapper";
import Footer from "components/common/footer";
import Header from "components/common/header";
import SearchResultsInfo from "components/common/search-results-info";
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
        <SearchResultsInfo
          searchTerm={algoliaSearchResults?.query}
          totalItems={algoliaSearchResults?.hits?.length}
        />
        {pageComponents?.map((component: XMComponent, index) => {
          const Component = componentsById[component.id];
          if (Component) {
            if (component.id === "ProductListing") {
              if (algoliaSearchResults?.hits?.length) {
                return (
                  <Component
                    {...component.params}
                    productDataArray={algoliaSearchResults?.hits || []}
                    key={index}
                    showBreadcrumb={false}
                  />
                );
              } else return null;
            }
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
  const getFaceFilters = () => {
    if (query?.brand === `L'azurde`)
      return [
        `Brand:L'azurde`,
        `Brand:L'azurde,Miss L'`,
        `Brand:L'azurde,Kenaz`,
      ];
    else if (query?.brand === `Miss L'`)
      return [`Brand:Miss L'`, `Brand:L'azurde,Miss L'`];
    else if (query?.brand === "Kenaz")
      return [`Brand:Kenaz`, `Brand:L'azurde,Kenaz`];
    else
      return [
        `Brand:L'azurde`,
        `Brand:L'azurde,Miss L'`,
        `Brand:L'azurde,Kenaz`,
      ];
  };

  const {
    hits = [],
    nbHits = 0,
    page = 0,
    nbPages = 0,
    hitsPerPage = 0,
  } = await performKeywordSearch({
    query: query.keyword || "",
    facetFilters: getFaceFilters() || [],
  });

  const getCurrentBrandId = () => {
    if (query?.brand === `L'azurde`) return "lazurdeHeader";
    else if (query?.brand === `Miss L'`) return "missLHeader";
    else if (query?.brand === "Kenaz") return "kenazHeader";
    else return "lazurdeHeader";
  };
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/search")) || [];
  const headerProps =
    (
      globalComponents.find(
        (item: XMComponent) =>
          item.id === "Header" && item.params.headerId === getCurrentBrandId()
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
