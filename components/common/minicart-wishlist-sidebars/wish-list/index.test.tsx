import * as React from "react";
import { render, act } from "@testing-library/react";
import WishListSidebar from "./index";
import ContextProvider, { AppContext } from "lib/context";

jest.mock("axios");
const renderComponent = async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <WishListSidebar />
      </ContextProvider>
    );
  });
};

const renderComponentAR = async () => {
  await act(async () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <WishListSidebar />
      </AppContext.Provider>
    );
  });
};

test("wish list Test", async () => {
  renderComponent();
});

test("wish list arabic version", async () => {
  renderComponentAR();
});
