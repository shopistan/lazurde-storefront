import { render } from "@testing-library/react";
import React from "react";
import Reviews from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { singleProductData } from "lib/mock-data/data";

const totalRating = 4;

const renderComponent = () => {
  render(
    <ContextProvider>
      <Reviews
        totalRating={totalRating}
        setTotalRating={jest.fn()}
        productData={singleProductData}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <Reviews
        totalRating={totalRating}
        setTotalRating={jest.fn()}
        productData={singleProductData}
      />
    </AppContext.Provider>
  );
};

test("Review Section Testing", () => {
  renderComponent();
  expect(totalRating).toBe(4);
});

test("Review Section Testing Arabic Version", () => {
  renderComponentAR();
  expect(totalRating).toBe(4);
});