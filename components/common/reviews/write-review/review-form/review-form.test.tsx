import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewForm from "components/common/reviews/write-review/review-form/review-form";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <ReviewForm />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ReviewForm />
    </AppContext.Provider>
  );
};

test("review form Testing", () => {
  renderComponent();
});

test("review form Arabic Version", () => {
  renderComponentAR();
});
