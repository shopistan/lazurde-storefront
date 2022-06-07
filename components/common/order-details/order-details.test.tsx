import React from "react";
import OrderDetails from "./index";
import { screen, render } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  <ContextProvider>
    <OrderDetails />
  </ContextProvider>;
};

const renderComponentAR = () => {
  <AppContext.Provider value={{ appState: { lang: "ar" } }}>
    <OrderDetails />
  </AppContext.Provider>;
};

test("Order Details Testing", () => {
  renderComponent();
});

test("", () => {
  renderComponentAR();
});
