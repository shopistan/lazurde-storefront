import * as React from "react";
import { render, screen } from "@testing-library/react";
import MobileNavBar from "./index";
import ContextProvider from "lib/context";
import { brandSideBarForTesting, menuDataForTesting } from "lib/mock-data/data";

test("Mobile Header testing", () => {
  jest.mock("next/router");
  const headerId = "lazurdeHeader";
  const siteLogoUrl = "site logo url";
  const siteLogo = {
    url: "/img",
    altText: "alt",
  };

  render(
    <ContextProvider>
      <MobileNavBar
        headerId={headerId}
        siteLogoUrl={siteLogoUrl}
        siteLogo={siteLogo}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
      />
    </ContextProvider>
  );
});
