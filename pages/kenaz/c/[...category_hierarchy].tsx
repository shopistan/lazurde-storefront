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
  categoryHierarchy: string[];
}

const KenazProductListingPage: FC<ProductListingPageProps> = ({
  headerProps,
  footerProps,
  brandSidebarProps,
  pageComponents = [],
  algoliaSearchResults,
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

export default KenazProductListingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const livePageRoutes = (await fetchAllLivePageRoutes()) || [];
  //console.log("livePageRoutes", livePageRoutes);
  const kenazListingPageRoutes = livePageRoutes.filter(
    (pageRoute: PageRouteType) =>
      pageRoute.typeUrl === "/c" && pageRoute.pageUrl.includes("missl")
  );
  //console.log("missl Listing", kenazListingPageRoutes);
  const paths = kenazListingPageRoutes.map((listingPage: PageRouteType) => {
    const cSlug = listingPage.pageUrl.replace("/kenaz/c/", "");
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
  //console.log("Page URL", pageUrl);
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents =
    (await fetchXMComponents(12, `/kenaz/c/${pageUrl}`)) || [];
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

  const categoryName =
    (
      pageComponents.find(
        (component: XMComponent) => component.id === "ProductListing"
      ) || {}
    )?.params?.categoryName || null;

  let searchResults;

  if (categoryName) {
    searchResults = await fetchCategoryProducts({
      categoryName,
    });
  }

  const {
    hits = [],
    nbHits = 0,
    page = 0,
    nbPages = 0,
    hitsPerPage = 0,
  } = searchResults || {};

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
    },
    revalidate: 5,
  };
};
