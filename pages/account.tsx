import React, { useContext, useEffect, useState } from "react";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Footer from "components/common/footer";
import Header from "components/common/header";
import { XMComponent, PageProps } from "lib/types/common";
import AccountInformation from "components/common/account-information";
import { accountInformationData } from "lib/mock-data/data";
import { getOrders } from "lib/utils/order";
import { AppContext } from "lib/context";

export default function AccountPage({
  headerProps,
  headerArray,
  brandSidebarProps,
  footerProps,
}: PageProps) {
  const { appState } = useContext(AppContext)
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
      <Header {...headerData} brandSidebarProps={brandSidebarProps}></Header>
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
    },
  };
}
