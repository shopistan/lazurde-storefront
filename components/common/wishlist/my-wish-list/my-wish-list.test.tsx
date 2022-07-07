/* eslint-disable react/display-name */
import * as React from "react";
import MyWishList from "./index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

jest.mock("axios");

const renderComponent = async () => {
  await act(async () => {
    render(
      <AppContext.Provider
        value={{
          appState: { lang: "en" },
          allWishListProducts: [236, 118],
          priceListId: "100000",
        }}
      >
        <MyWishList />
      </AppContext.Provider>
    );
  });
};

test("myWishlist testing", async () => {
  await renderComponent();
  const label = screen.getByRole("mywishlist");
  expect(label).toBeInTheDocument();
  const button = screen.getByRole("button");
  fireEvent.click(button);
  const notice = screen.getByRole("wishlist-notice");
  expect(notice).toBeInTheDocument();
  const para = screen.getByRole("para");
  expect(para).toBeInTheDocument();
  const items = screen.getByRole("items");
  expect(items).toBeInTheDocument();
});