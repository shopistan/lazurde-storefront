import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import React, { FC } from "react";
import AppContentWrapper from "../components/common/app-content-wrapper";
import styles from "../styles/Home.module.css";
import BrandsCard from "components/lazurde/brands-card/index";
const LazurdeHome: FC<PageProps> = ({
  headerProps,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  const array = [
    {
      title: "hello",
      backGroundImage: {
        url: "https://images.unsplash.com/photo-1649423515812-5d7f4adb170c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        altText: "Image1",
      },
    },
    {
      title: "hello",
      backGroundImage: {
        url: "https://images.unsplash.com/photo-1649423515812-5d7f4adb170c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        altText: "Image1",
      },
    },
    {
      title: "hello",
      backGroundImage: {
        url: "https://images.unsplash.com/photo-1649423515812-5d7f4adb170c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        altText: "Image1",
      },
    },
  ];
  return (
    <>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      <AppContentWrapper>
        <div className={styles.container}>
          {/* <div className={styles.links}>
            <Link href={"/en-sa"} locale="en-sa">
              <a>Lazurde en-sa</a>
            </Link>
            <Link href={"/"} locale="ar-sa">
              <a>Lazurde ar-sa</a>
            </Link>
            <Link href={"/"} locale="en-ae">
              <a>Lazurde en-ae</a>
            </Link>
            <Link href={"/"} locale="ar-ae">
              <a>Lazurde ar-ae</a>
            </Link>
            <Link href={"/"} locale="en-eg">
              <a>Lazurde en-eg</a>
            </Link>
            <Link href={"/"} locale="ar-eg">
              <a>Lazurde ar-eg</a>
            </Link>

            <Link href={"/kenaz"}>
              <a>Kenaz HomePage</a>
            </Link>
            <Link href={"/missl"}>
              <a>Miss'L HomePage</a>
            </Link>
          </div> */}
          {pageComponents.map((component: XMComponent, index) => {
            const Component = componentsById[component.id];
            if (Component) {
              return <Component {...component.params} key={index} />;
            }
            return null;
          })}
        </div>
        <BrandsCard exploreBrandsArray={array} />
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default LazurdeHome;

export async function getStaticProps(context: any) {
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/home")) || [];
  const headerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Header") || {})
      .params || {};
  const footerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Footer") || {})
      .params || {};
  const brandSidebarProps =
    (globalComponents.find((item: XMComponent) => item.id === "BrandSideBar") || {})
      .params || {};
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
