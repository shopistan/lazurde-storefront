import { render } from "@testing-library/react";
import React from "react";
import TabbyModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TabbyModal />
    </ContextProvider>
  );
};

test("tabby modal Testing", () => {
  renderComponent();
});
