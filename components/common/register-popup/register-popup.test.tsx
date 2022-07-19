import React from "react";
import RegisterModal from "components/common/register-popup/index";
import { screen, render, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const title = "Register Title";
const text = "Register Text";
const buttonText = "Register Button Text";
const image = {
  url: "/",
  altText: "Image",
};

const renderComponent = () => {
  render(
    <ContextProvider>
      <RegisterModal
        modalTitle={title}
        modalText={text}
        modalButton={buttonText}
        isOpen={true}
        modalImage={image}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <RegisterModal
        modalTitle={title}
        modalText={text}
        modalButton={buttonText}
        isOpen={true}
        modalImage={image}
      />
    </AppContext.Provider>
  );
};

test("Register modal testing", () => {
  renderComponent();
  expect(screen.getByText("Register Title")).toBeInTheDocument();
  expect(screen.getByText("Register Text")).toBeInTheDocument();
  expect(screen.getByText("Register Button Text")).toBeInTheDocument();
  expect(screen.getByAltText("Image")).toBeInTheDocument();
});

test("render arabic version", () => {
  renderComponentAR();
});
