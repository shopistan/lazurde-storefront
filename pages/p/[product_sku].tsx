import { PageProps, XMComponent } from "lib/types/common";
import {
  fetchAllProducts,
  fetchProductBySku,
  fetchProductPriceByItemId,
} from "lib/utils/product";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC, useEffect } from "react";
import { ProductType } from "lib/types/product";
import { fetchGlobalComponents } from "lib/xm";
import Footer from "components/common/footer";
import AppContentWrapper from "components/common/app-content-wrapper";
import Header from "components/common/header";
import Head from "next/head";
import ProductDescription from "components/common/product-description";

interface ProductDescriptionPageProps extends PageProps {
  product: ProductType;
}

const LazurdeProductDescriptionPage: FC<ProductDescriptionPageProps> = ({
  product,
  headerProps,
  footerProps,
  brandSidebarProps,
}) => {
  // useEffect(() => {
  //   const f = async () => {
  //     const s = await fetchProductPrice(product.itemId, {
  //       priceList: [100000],
  //       itemId: [product.itemId],
  //     });
  //     console.log("price", s);
  //   };
  //   f();
  // }, []);
  return (
    <>
      <Head>
        <title>
          L&apos;azurde | Luxury Jewelry, Gifts &amp; Accessories |
          L&apos;AZURDE
        </title>
      </Head>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <div>
        <ProductDescription product={product}></ProductDescription>
      </div>
      {/* <AppContentWrapper>
      </AppContentWrapper> */}
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default LazurdeProductDescriptionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: ProductType[] = await fetchAllProducts(1, 50);
  let randomlyFilteredProducts: ProductType[] = [];
  for (let i = 0; i < allProducts.length; i++) {
    if (Math.random() > 0.5) {
      randomlyFilteredProducts.push(allProducts[i]);
    }
  }
  const paths = randomlyFilteredProducts.map((product: ProductType) => ({
    params: {
      product_sku: product.sku,
    },
  }));

  // for (let i = 0; i < paths.length; i++) {
  //   console.log("product paths", paths[i], paths.length);
  // }

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { product_sku = "" } = context.params;
  const product: ProductType = await fetchProductBySku(product_sku as string);
  const globalComponents = (await fetchGlobalComponents()) || [];
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
    props: { product, headerProps, footerProps, brandSidebarProps },
    revalidate: 5,
  };
};
