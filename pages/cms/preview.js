/*
 * This page is used by the CMS to show a preview of a layout.
 */
import React from "react";
import { Preview } from "@teamfabric/xpm";
import { componentsById } from "components/xm-component-library"

const PreviewPage = () => {
  console.log("componentsById", componentsById);
  return (
    <>
      <Preview componentsById={componentsById} />
    </>
  );
};

export default PreviewPage;
