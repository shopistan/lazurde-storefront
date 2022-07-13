import * as React from "react";
import { render } from "@testing-library/react";
import ExponeaHomepageRecommendationsTrending from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <ExponeaHomepageRecommendationsTrending />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ExponeaHomepageRecommendationsTrending />
    </AppContext.Provider>
  );
};

describe("exponea homepage ", () => {
  test("exponea homepage testing", () => {
    renderComponent();
  });

  test("exponea homepage arabic version", () => {
    renderComponentAR();
  });
});
