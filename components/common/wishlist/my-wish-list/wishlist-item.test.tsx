/* eslint-disable react/display-name */
import * as React from "react";
import WishListItems from "./index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

jest.mock("axios");
const mockChildComponent = jest.fn();
jest.mock("./wishlist-Item.tsx", () => (props: any) => {
  mockChildComponent(props);
  return <div />;
});

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
        <WishListItems />
      </AppContext.Provider>
    );
  });
};

test("wishlist items testing", async () => {
  await renderComponent();
});
