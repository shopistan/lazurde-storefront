import { render, screen } from "@testing-library/react";
import ContextProvider from "lib/context";
import React from "react";
import LangSelector from "./index";

const renderComponent = () => {
  render(
    <ContextProvider>
      <LangSelector />
    </ContextProvider>
  );
};

describe("testing header", () => {
  test("testing language selector component", () => {
    renderComponent();
  });
});
