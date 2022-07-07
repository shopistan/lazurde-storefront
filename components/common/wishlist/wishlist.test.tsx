import React from "react";
import WishList from "./index";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = async () => {
    await act(async() => {
        
  render(
    <AppContext.Provider
    value={{ appState: { lang: "en" }, allWishListProducts: [236, 118]}}
  >
      <WishList authToken={"12345"} itemId={"70"} />
    </AppContext.Provider>
  );
})

};

// const renderComp = () => {
//   render(
//     <ContextProvider>
//       <WishList />
//     </ContextProvider>
//   );
// };

test("wishlist testing", () => {
  renderComponent();
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
});