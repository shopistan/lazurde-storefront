import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "./mobile-menu";
import ContextProvider from "lib/context";
import { brandSideBarForTesting, menuDataForTesting } from "lib/mock-data/data";

test("Mobile Menu testing", () => {
  const active = false;

  render(
    <ContextProvider>
      <MobileMenu
        headerId={"lazurdeHeader"}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
      />
    </ContextProvider>
  );

  expect(active).toBe(false);
});
