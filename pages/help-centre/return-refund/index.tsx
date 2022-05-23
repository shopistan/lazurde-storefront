import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Head from "next/head";
import React, { FC , useContext } from "react";
import AppContentWrapper from "../../../components/common/app-content-wrapper";
import Image from 'next/image'
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

const ReturnRefund: FC<PageProps> = ({
    headerProps,
    brandSidebarProps,
    footerProps,
    pageComponents,
}) => {
    const { appState } = useContext(AppContext);
    const { t } = useTranslation("common");
    return (
        <>
            <Head>
                <title>
                    L&apos;azurde | Luxury Jewelry, Gifts &amp; Accessories |
                    L&apos;AZURDE
                </title>
            </Head>
            <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
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
            <div className={'back-block'}>
            <button className={"button"}>
              <Image src={"/question.png"} width={20} height={20} />
              <p>
                {appState.lang == "en"
                  ? "Have a question?"
                  : t("customerButton")}
              </p>
            </button>
          </div>
        </>
    );
};

export default ReturnRefund;

export async function getStaticProps(context: any) {
    const globalComponents = (await fetchGlobalComponents()) || [];
    const pageComponents = (await fetchXMComponents(12, "/help-centre/refund-return")) || [];
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
        },
        revalidate: 5,
    };
}
