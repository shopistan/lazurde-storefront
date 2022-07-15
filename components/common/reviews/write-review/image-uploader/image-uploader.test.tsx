import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUploader from "components/common/reviews/write-review/image-uploader/image-uploader";
import ContextProvider, { AppContext } from "lib/context";

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
});

test("review image uploade section Arabic Version", () => {
  renderComponentAR();
});
