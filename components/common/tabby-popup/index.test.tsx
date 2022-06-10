import { render } from "@testing-library/react";
import React from "react";
import TabbyModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TabbyModal productPricing={{finalPrice: 0}}/>
    </ContextProvider>
  );
};

test("tabby modal Testing", () => {
  renderComponent();
});
