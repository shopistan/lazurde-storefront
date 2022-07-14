/* eslint-disable react/display-name */
import * as React from "react";
import AccountOverView from "./index";
import { render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

jest.mock("axios");
const renderComponent = () => {
  render(
    <ContextProvider>
      <AccountOverView />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <AccountOverView />
    </AppContext.Provider>
  );
};

test("account overview testing", () => {
  renderComponent();
  const heading = screen.getByTestId("heading");
  expect(heading).toBeInTheDocument();
  const image = screen.getByAltText("main-image");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("alt", "main-image");
});

test("account overview arabic testing", () => {
  renderComponentAR();
});
