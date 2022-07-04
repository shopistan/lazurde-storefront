import { render } from "@testing-library/react";
import React from "react";
import WishListSidebar from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <WishListSidebar />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <WishListSidebar />
    </AppContext.Provider>
  );
};

test("wish list Test", () => {
  renderComponent();
});

test("wish list arabic version", () => {
  renderComponentAR();
});
