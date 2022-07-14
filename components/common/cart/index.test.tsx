/* eslint-disable react/display-name */
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    const freeShipping = screen.getByRole("free-shipping");
    expect(freeShipping).toBeInTheDocument();
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
    const subHeading = screen.getByRole("subHeading");
    expect(subHeading).toBeInTheDocument();
    const shppingText = screen.getByRole("shpping-text");
    expect(shppingText).toBeInTheDocument();
    const tax = screen.getByRole("tax");
    expect(tax).toBeInTheDocument();
    const totalPay = screen.getByRole("totalPay");
    expect(totalPay).toBeInTheDocument();
    const checkoutBtn = screen.getByRole("checkoutBtn");
    expect(checkoutBtn).toBeInTheDocument();
    const continueText = screen.getByRole("continueText");
    expect(continueText).toBeInTheDocument();
    const image = screen.getByAltText("paypal-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "paypal-image");
    const crossBtn = screen.getByRole("crossBtn");
    expect(crossBtn).toBeInTheDocument();
    fireEvent.click(crossBtn);
  });

  test("cart page arabic version", () => {
    renderComponentAR();
  });
});
