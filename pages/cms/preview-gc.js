/*
 * This page is used by the CMS to show a preview of a layout.
 */
import React from "react";
import { componentsById } from "components/xm-component-library";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@teamfabric/xpm").then((mod) => mod.Preview),
  { ssr: false }
);

const PreviewPageGC = () => {
  return <DynamicComponentWithNoSSR componentsById={componentsById} />;
};

export default PreviewPageGC;

export async function getServerSideProps({ locale, defaultLocale }) {
    console.log("locale test", locale, defaultLocale)
  if (locale !== defaultLocale) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
}
