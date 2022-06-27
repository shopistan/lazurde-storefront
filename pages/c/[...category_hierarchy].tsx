import React, { FC } from "react";
import { PageProps, XMComponent } from "lib/types/common";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  fetchAllLivePageRoutes,
  fetchGlobalComponents,
  fetchXMComponents,
} from "lib/xm";
import Head from "next/head";
import Header from "components/common/header";
import AppContentWrapper from "components/common/app-content-wrapper";
import { componentsById } from "components/xm-component-library";
import Footer from "components/common/footer";
import { PageRouteType } from "lib/types/xm";
import { fetchCategoryProducts } from "lib/algolia";
import { AlgoliaProductType } from "lib/types/algolia";

interface ProductListingPageProps extends PageProps {
  algoliaSearchResults: {
    hits: AlgoliaProductType[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
  };
  filterProps: {filterList: []};
  categoryHierarchy: string[];
}

const LazurdeProductListingPage: FC<ProductListingPageProps> = ({
  headerProps,
  footerProps,
  brandSidebarProps,
  pageComponents = [],
  algoliaSearchResults,
  filterProps,
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
        {pageComponents.map((component: XMComponent, index) => {
          const Component = componentsById[component.id];
          if (Component) {
            if (component.id === "ProductListing") {
              return (
                <Component
                  {...component.params}
                  productDataArray={algoliaSearchResults.hits}
                  filterList={filterProps?.filterList}
                  key={index}
                />
              );
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

export default LazurdeProductListingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const livePageRoutes = (await fetchAllLivePageRoutes()) || [];
  const listingPageRoutes = livePageRoutes.filter(
    (pageRoute: PageRouteType) => pageRoute.typeUrl === "/c"
  );
  const paths = listingPageRoutes.map((listingPage: PageRouteType) => {
    const cSlug = listingPage.pageUrl.replace("/", "");
    return {
      params: {
        category_hierarchy: [cSlug],
      },
    };
  });
  // for (let i = 0; i < paths.length; i++) {
  //   console.log("CPATH", paths[i].params.category_hierarchy);
  // }
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { category_hierarchy = [] } = context.params || {};
  const pageUrl = category_hierarchy.join("/");
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, `/${pageUrl}`)) || [];
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
    const filterProps =
    (
      globalComponents.find(
        (item: XMComponent) =>
          item.id === "FilterBar"
      ) || {}
    ).params || {};
    console.log("FILTERBAR", filterProps, globalComponents);

  const categoryName =
    (
      pageComponents.find(
        (component: XMComponent) => component.id === "ProductListing"
      ) || {}
    )?.params?.categoryName || '';

  let searchResults;

  searchResults = await fetchCategoryProducts({
    categoryName,
  });

  let {
    hits = [],
    nbHits = 0,
    page = 0,
    nbPages = 0,
    hitsPerPage = 0,
  } = searchResults || {};

  const nonVariantArray = hits.filter((item: any) => item.isVariant === false)
  hits = nonVariantArray
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
      },
      filterProps,
    },
    revalidate: 5,
  };
};
