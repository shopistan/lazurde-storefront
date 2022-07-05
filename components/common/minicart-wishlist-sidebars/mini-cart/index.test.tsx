import { render } from "@testing-library/react";
import React from "react";
import MiniCart from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <MiniCart />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <MiniCart />
    </AppContext.Provider>
  );
};

test("Mini Cart Test", () => {
  renderComponent();
});

test("Mini Cart Test arabic version", () => {
  renderComponentAR();
});
