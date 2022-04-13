import Footer from "components/common/footer";
import Header from "components/common/header";
import { componentsById } from "components/xm-component-library";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import React, { FC } from "react";
import AppContentWrapper from "../../components/common/app-content-wrapper";
import styles from "../../styles/Home.module.css";

const KenazHome: FC<PageProps> = ({
  headerProps,
  brandSidebarProps,
  footerProps,
  pageComponents,
}) => {
  return (
    <>
      <Header {...headerProps} brandSidebarProps={brandSidebarProps}></Header>
      {/* <Header {...headerProps}></Header> */}
      <AppContentWrapper>
        <div className={styles.container}>
          {/* <h1>This is Kenaz HomePage</h1>
          <div className={styles.links}>
            <Link href={"/kenaz"} locale="en-sa">
              <a>Kenaz sa-en</a>
            </Link>
            <Link href={"/kenaz"} locale="ar-sa">
              <a>Kenaz sa-ar</a>
            </Link>
            <Link href={"/kenaz"} locale="en-ae">
              <a>Kenaz ae-en</a>
            </Link>
            <Link href={"/kenaz"} locale="ar-ae">
              <a>Kenaz ae-ar</a>
            </Link>
            <Link href={"/kenaz"} locale="en-eg">
              <a>Kenaz eg-en</a>
            </Link>
            <Link href={"/kenaz"} locale="ar-eg">
              <a>Kenaz eg-ar</a>
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
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default KenazHome;

export async function getStaticProps() {
  const globalComponents = (await fetchGlobalComponents()) || [];
  const pageComponents = (await fetchXMComponents(12, "/kenaz")) || [];
  const headerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Header") || {})
      .params || {};
  const footerProps =
    (globalComponents.find((item: XMComponent) => item.id === "Footer") || {})
      .params || {};
  return {
    props: {
      headerProps,
      footerProps,
      pageComponents,
    },
    revalidate: 5,
  };
}
