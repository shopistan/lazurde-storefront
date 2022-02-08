import Footer from "components/common/footer";
import Header from "components/common/header";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Link from "next/link";
import React, { FC } from "react";
import AppContentWrapper from "../../components/common/app-content-wrapper";
import styles from "../../styles/Home.module.css";

const KenazHome: FC<PageProps> = ({
  headerProps,
  footerProps,
  pageComponents,
}) => {
  return (
    <>
      <Header {...headerProps}></Header>
      <AppContentWrapper>
        <div className={styles.container}>
          <h1>This is Kenaz HomePage</h1>
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
          </div>
        </div>
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default KenazHome;

export async function getStaticProps() {
  const globalComponents = await fetchGlobalComponents();
  const pageComponents = await fetchXMComponents("/kenaz");
  const headerProps =
    globalComponents.find((item: XMComponent) => item.id === "Header").params ||
    {};
  const footerProps =
    globalComponents.find((item: XMComponent) => item.id === "Footer").params ||
    {};
  return {
    props: {
      headerProps,
      footerProps,
      pageComponents,
    },
  };
}
