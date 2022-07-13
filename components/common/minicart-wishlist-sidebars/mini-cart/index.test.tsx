import * as React from "react";
import { render, act, screen } from "@testing-library/react";
import MiniCart from "./index";
import ContextProvider, { AppContext } from "lib/context";

jest.mock("axios");
const renderComponent = async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <MiniCart />
      </ContextProvider>
    );
  });
};

const renderComponentAR = async () => {
  await act(async () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <MiniCart />
      </AppContext.Provider>
    );
  });
};

test("Mini Cart Test", async () => {
  renderComponent();
});

test("Mini Cart Test arabic version", () => {
  renderComponentAR();
});
