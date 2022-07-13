import * as React from "react";
import { render, screen } from "@testing-library/react";
import CartItem from "./index";
import ContextProvider, { AppContext } from "lib/context";

const itemObj = {
  title: "title",
  ["Product Title"]: "product title",
  ["Image URL"]: "/imageurl.png",
  ["Brand"]: "brand",
  quantity: "12",
  lineItemId: 12,
  itemId: "itemId",
  cartId: "cart id",
  totalPrice: {
    amount: 1200,
    sale: 12,
    currency: "$",
  },
  attributes: [
    {
      mapping: "string",
      name: "string",
      value: "string",
    },
  ],
};
const inventoryToken = "inventoryToken";

const renderComponent = () => {
  render(
    <ContextProvider>
      <CartItem
        item={itemObj}
        handleChange={jest.fn()}
        updatingCartItem={false}
        removeItem={jest.fn()}
        getCartData={jest.fn()}
        inventoryToken={inventoryToken}
        wishListItem={false}
        className="classname"
        productImgWidth="38px"
        productImgHeight="38px"
        renderComponent={false}
        miniCartItem={false}
        wishListSideBarItem={false}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <CartItem
        item={itemObj}
        handleChange={jest.fn()}
        updatingCartItem={false}
        removeItem={jest.fn()}
        getCartData={jest.fn()}
        inventoryToken={inventoryToken}
        wishListItem={false}
        className="classname"
        productImgWidth="38px"
        productImgHeight="38px"
        renderComponent={false}
        miniCartItem={false}
        wishListSideBarItem={false}
      />
    </AppContext.Provider>
  );
};

describe("Cart page ", () => {
  test("cart item testing", () => {
    renderComponent();
  });

  test("cart item arabic version", () => {
    renderComponentAR();
  });
});
