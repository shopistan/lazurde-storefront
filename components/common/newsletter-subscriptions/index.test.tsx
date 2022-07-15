import { render, screen } from "@testing-library/react";
import ContextProvider from "lib/context";
import React from "react";
import NewsSubscriptions from "./index";

const renderComponent = () => {
  render(
    <ContextProvider>
      <NewsSubscriptions />
    </ContextProvider>
  );
};

describe("NewsSubscriptions", () => {
  test("NewsSubscriptions props", () => {
    renderComponent();
  });
});
