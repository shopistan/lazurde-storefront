import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSideBar from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <LanguageSideBar />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <LanguageSideBar />
    </AppContext.Provider>
  );
};

test("account sidebar Testing", () => {
  renderComponent();
});

test("account sidebar arabic version Testing", () => {
  renderComponentAR();
});
