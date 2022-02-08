import Footer from "components/common/footer";
import Header from "components/common/header";
import { PageProps, XMComponent } from "lib/types/common";
import { fetchGlobalComponents, fetchXMComponents } from "lib/xm";
import Link from "next/link";
import React, { FC } from "react";
import AppContentWrapper from "../../components/common/app-content-wrapper";
import styles from "../../styles/Home.module.css";

const MissLHome: FC<PageProps> = ({
  headerProps,
  footerProps,
  pageComponents,
}) => {
  return (
    <>
      <Header {...headerProps}></Header>
      <AppContentWrapper>
        <div className={styles.container}>
          <h1>This is Miss'L HomePage</h1>
          <div className={styles.links}>
            <Link href={"/missl"} locale="en-sa">
              <a>Miss'L en-sa</a>
            </Link>
            <Link href={"/missl"} locale="ar-sa">
              <a>Miss'L ar-sa</a>
            </Link>
            <Link href={"/missl"} locale="en-ae">
              <a>Miss'L en-ae</a>
            </Link>
            <Link href={"/missl"} locale="ar-ae">
              <a>Miss'L ar-ae</a>
            </Link>
            <Link href={"/missl"} locale="en-eg">
              <a>Miss'L en-eg</a>
            </Link>
            <Link href={"/missl"} locale="ar-eg">
              <a>Miss'L ar-eg</a>
            </Link>
          </div>
        </div>
      </AppContentWrapper>
      <Footer {...footerProps}></Footer>
    </>
  );
};

export default MissLHome;

export async function getStaticProps() {
  const globalComponents = await fetchGlobalComponents();
  const pageComponents = await fetchXMComponents("/missl");
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
