import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import SubDetail from "./index";

test("with stock and price", async () => {
  const productPricing = {
    finalPrice: 100,
    currency: "SAR",
  };

  render(
    <ContextProvider>
      <SubDetail isStockAvailable={true} productPricing={productPricing} />
    </ContextProvider>
  );
});

test("without stock", () => {
  const productPricing = {
    finalPrice: 100,
    currency: "SAR",
  };
  render(
    <ContextProvider>
      <SubDetail isStockAvailable={false} productPricing={productPricing} />
    </ContextProvider>
  );
});

test("arabic version", () => {
  const productPricing = {
    finalPrice: 100,
    currency: "SAR",
  };
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <SubDetail isStockAvailable={true} productPricing={productPricing} />
    </AppContext.Provider>
  );
});
