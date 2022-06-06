import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ReviewTabs from "./index";
import ContextProvider, { AppContext } from "lib/context";

const className = "testing classname";

const renderComponent = () => {
  render(
    <ContextProvider>
      <ReviewTabs onClick={jest.fn()} className={className} />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ReviewTabs onClick={jest.fn()} className={className} />
    </AppContext.Provider>
  );
};

test("Review Tab Testing", () => {
  renderComponent();
  expect(screen.getByTestId("tab-section")).toBeInTheDocument();
  const btn = screen.getAllByTestId("tab-name");
  fireEvent.click(btn[0]);
});

test("Review Tab Testing Arabic Version", () => {
  renderComponentAR();
  expect(screen.getByTestId("tab-section")).toBeInTheDocument();
  const btn = screen.getAllByTestId("tab-name");
  fireEvent.click(btn[0]);
});
