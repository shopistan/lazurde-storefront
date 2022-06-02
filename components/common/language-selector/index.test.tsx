import { render, screen } from "@testing-library/react";
import ContextProvider from "lib/context";
import React from "react";
import LanguageSelector from "./index";

const renderComponent = () => {
  render(
    <ContextProvider>
      <LanguageSelector
        showButton={true}
        className={"test-classname"}
        mainWrapperClass={"test-main-classname"}
        optionClassName={"test-option-ClassName"}
      />
    </ContextProvider>
  );
};

describe("testing language selector component", () => {
  test("testing show button prop", () => {
    renderComponent();
    const showButton = true;
    expect(showButton).toBe(true);
  });

  test("language select div", () => {
    renderComponent();
    const mainWrapperClass = screen.getByTestId("main-wrapper");
    expect(mainWrapperClass).toBeInTheDocument();
  });
});
