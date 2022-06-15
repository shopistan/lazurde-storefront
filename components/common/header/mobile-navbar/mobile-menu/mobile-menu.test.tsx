import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "./mobile-menu";
import { brandSideBarForTesting, menuDataForTesting } from "lib/mock-data/data";
import ContextProvider, { AppContext } from "lib/context";

const closeMenu = jest.fn();

test("Mobile Menu testing", () => {
  const active = false;

  render(
    <ContextProvider>
      <MobileMenu
        headerId={"lazurdeHeader"}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
        closeMenu={closeMenu}
      />
    </ContextProvider>
  );

  // expect(screen.getByTestId("cross-btn")).toBeInTheDocument();
  // fireEvent.click(screen.getByTestId("cross-btn1"));
  // expect(closeMenu).toBeCalled();

  // const lists = screen.getAllByRole("listitem");
  // expect(lists[0]).toBeInTheDocument();
  // fireEvent.click(lists[0]);
  // expect(closeMenu).toBeCalled();

  // expect(active).toBe(false);
});

test("Mobile Menu header id testing", () => {
  render(
    <ContextProvider>
      <MobileMenu
        headerId={"MissL"}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
        closeMenu={closeMenu}
      />
    </ContextProvider>
  );

  expect(screen.getByTestId("site-logo")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("site-logo"));
});

test("mobile menu arabic", () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <MobileMenu
        headerId={"MissL"}
        brandSideBar={brandSideBarForTesting}
        menuData={menuDataForTesting}
        closeMenu={closeMenu}
      />
    </AppContext.Provider>
  );
});
