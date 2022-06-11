import { render } from "@testing-library/react";
import React from "react";
import TamaraModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TamaraModal productPricing={{finalPrice: 0, currency: 'AED'}} />
    </ContextProvider>
  );
};

test("tamara modal Testing", () => {
  renderComponent();
});
