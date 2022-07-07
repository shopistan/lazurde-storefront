import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountSidebar from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <AccountSidebar />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <AccountSidebar />
    </AppContext.Provider>
  );
};

test("account sidebar Testing", () => {
  renderComponent();
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  const subheading = screen.getByTestId("subheading");
  expect(subheading).toBeInTheDocument();
});

test("account sidebar arabic version Testing", () => {
  renderComponentAR();
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  const subheading = screen.getByTestId("subheading");
  expect(subheading).toBeInTheDocument();
});
