import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import WriteAReview from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { singleProductData } from "lib/mock-data/data";

const isOpened = true;

const renderComponent = () => {
  render(
    <ContextProvider>
      <WriteAReview
        isOpened={isOpened}
        onClose={jest.fn()}
        productData={singleProductData}
        setIsRatingError={jest.fn()}
        isRatingError={"testing"}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <WriteAReview
        isOpened={isOpened}
        onClose={jest.fn()}
        productData={singleProductData}
        setIsRatingError={jest.fn()}
        isRatingError={"testing"}
      />
    </AppContext.Provider>
  );
};

test("Write a Review section Testing", () => {
  renderComponent();
  expect(isOpened).toBe(true);
  const btn = screen.getByTestId("review-modal");
  fireEvent.click(btn);
});

test("Write a Review section Arabic Version", () => {
  renderComponentAR();
  expect(isOpened).toBe(true);
  const btn = screen.getByTestId("review-modal");
  fireEvent.click(btn);
});
