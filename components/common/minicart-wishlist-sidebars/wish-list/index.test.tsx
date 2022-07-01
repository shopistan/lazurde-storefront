import { render } from "@testing-library/react";
import React from "react";
import WhishListSidebar from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <WhishListSidebar />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <WhishListSidebar />
    </AppContext.Provider>
  );
};

test("wish list Test", () => {
  renderComponent();
});

test("wish list arabic version", () => {
  renderComponentAR();
});
