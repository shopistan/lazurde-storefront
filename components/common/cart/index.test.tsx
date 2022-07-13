/* eslint-disable react/display-name */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const renderComponent = async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <Cart />
      </ContextProvider>
    );
  });
};

const renderComponentAR = async () => {
  await act(async () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <Cart />
      </AppContext.Provider>
    );
  });
};

describe("Cart page ", () => {
  test("cart page testing", () => {
    renderComponent();
    const needhelpLabel = screen.getByRole("needhelp");
    expect(needhelpLabel).toBeInTheDocument();
    const points = screen.getAllByRole("points");
    expect(points[0]).toBeInTheDocument();
    const mainHeading = screen.getByRole("main-heading");
    expect(mainHeading).toBeInTheDocument();
    const bagHeading = screen.getByRole("bag-heading");
    expect(bagHeading).toBeInTheDocument();
    const summaryHeading = screen.getByRole("summary-heading");
    expect(summaryHeading).toBeInTheDocument();
    const helpCenterLink = screen.getByRole("help-center-link");
    expect(helpCenterLink).toBeInTheDocument();
  });

  test("cart page arabic version", () => {
    renderComponentAR();
  });
});
