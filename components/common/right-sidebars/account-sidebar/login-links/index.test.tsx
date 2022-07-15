import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoggedInlinks from "./index";
import ContextProvider, { AppContext } from "lib/context";

const userName = "john";
const arabicUserName = "name in arabic";
const renderComponent = () => {
  render(
    <ContextProvider>
      <LoggedInlinks userName={userName} arabicUserName={arabicUserName} />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <LoggedInlinks userName={userName} arabicUserName={arabicUserName} />
    </AppContext.Provider>
  );
};

test("account sidebar inner sec Testing", () => {
  renderComponent();
  const username = screen.getByTestId("username");
  expect(username).toBeInTheDocument();
});

test("account sidebar inner sec arabic version Testing", () => {
  renderComponentAR();
});
