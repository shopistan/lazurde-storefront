import { act, render } from "@testing-library/react";
import React from "react";
import TabbyModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <TabbyModal productPricing={{ finalPrice: 100 }} />
      </ContextProvider>
    );
  });
};

test("tabby modal Testing", async () => {
  await renderComponent();
});
