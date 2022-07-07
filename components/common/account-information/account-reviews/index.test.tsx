/* eslint-disable react/display-name */
import * as React from "react";
import UserReviews from "./index";
import { render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const mockChildComponent = jest.fn();
jest.mock("./product-without-reviews", () => (props: any) => {
  mockChildComponent(props);
  return <div />;
});

const renderComponent = () => {
  render(
    <ContextProvider>
      <UserReviews />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <UserReviews />
    </AppContext.Provider>
  );
};

test("term condition testing", () => {
  renderComponent();
});

test("term condition arabic testing", () => {
  renderComponentAR();
});
