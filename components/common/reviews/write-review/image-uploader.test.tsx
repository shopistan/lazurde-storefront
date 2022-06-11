import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ImageUploader from "./image-uploader";
import ContextProvider, { AppContext } from "lib/context";

const fileArray = ["obj one"];

const renderComponent = () => {
  render(
    <ContextProvider>
      <ImageUploader />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ImageUploader />
    </AppContext.Provider>
  );
};

test("review image uploade section Testing", () => {
  renderComponent();
  expect(fileArray).toHaveLength(1);
});

test("review image uploade section Arabic Version", () => {
  renderComponentAR();
  expect(fileArray).toHaveLength(1);
});
