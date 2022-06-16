import React, { useEffect } from "react";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { XMComponent, PageProps } from "lib/types/common";
import AccountInformation from "components/common/account-information";
import { accountInformationData } from "lib/mock-data/data";
import { getOrders } from "lib/utils/order";

export default function AccountPage({
  headerProps,
  brandSidebarProps,
  footerProps,
}: PageProps) {
  return (
    <>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AccountInformation
        title={accountInformationData.title}
        titleImage={accountInformationData.titleImage}
        barCode={accountInformationData.barCode}
        firstName={accountInformationData.firstName}
        lastName={accountInformationData.lastName}
        reviewText={accountInformationData.reviewText}
        reviewImage={accountInformationData.reviewImage}
        details={accountInformationData.details}
      />
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
