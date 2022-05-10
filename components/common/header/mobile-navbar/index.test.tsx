import * as React from "react";
import { render, screen } from "@testing-library/react";
import MobileNavBar from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { brandSideBarForTesting, menuDataForTesting } from "lib/mock-data/data";

const headerId = "lazurdeHeader";
const siteLogoUrl = "site logo url";
const siteLogo = {
  url: "/img",
  altText: "alt",
};

test("Mobile Header testing", () => {
  jest.mock("next/router");

  render(
    <ContextProvider>
      <MobileNavBar
        headerId={headerId}
        siteLogoUrl={siteLogoUrl}
        siteLogo={siteLogo}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
        setOpenSearchDialog={() => { }}
      />
    </ContextProvider>
  );
});

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <MobileNavBar
        headerId={headerId}
        siteLogoUrl={siteLogoUrl}
        siteLogo={siteLogo}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
        setOpenSearchDialog={() => { }}
      />
    </AppContext.Provider>
  )

  test("render arabic version", () => {
    renderComponentAR();
  });
}
