import * as React from "react";
import { render, screen } from "@testing-library/react";
import Reviews from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { singleProductData } from "lib/mock-data/data";

jest.mock("axios");
const totalRating = 4;
const renderComponent = () => {
  render(
    <ContextProvider>
      <Reviews
        totalRating={totalRating}
        setTotalRating={jest.fn()}
        productData={singleProductData}
        fetchingReviews={jest.fn()}
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
        fetchingReviews={jest.fn()}
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
