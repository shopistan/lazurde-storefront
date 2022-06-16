import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductDetail from "./index";
import ContextProvider, { AppContext } from "lib/context";

const testproductDetail = "product detail";

test("testing product feature", () => {
  render(
    <ContextProvider>
      <ProductDetail productDetail={testproductDetail} />
    </ContextProvider>
  );

  expect(screen.getByText(testproductDetail)).toBeInTheDocument();
});

test("testing product feature arabic feature", () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ProductDetail productDetail={testproductDetail} />
    </AppContext.Provider>
  );
});
