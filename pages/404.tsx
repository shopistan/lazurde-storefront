import React from "react";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { XMComponent, PageProps } from "lib/types/common";

export default function Custom404({
  headerProps,
  brandSidebarProps,
  footerProps,
}: PageProps) {
  return (
    <>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <h1>404 - Page Not Found!</h1>
      <Footer {...footerProps}></Footer>
    </>
  );
}

export async function getStaticProps(context: any) {
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
    props: {
      headerProps,
      footerProps,
      brandSidebarProps,
    },
  };
}
