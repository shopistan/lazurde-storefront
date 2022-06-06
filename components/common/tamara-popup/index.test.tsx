import { render } from "@testing-library/react";
import React from "react";
import TamaraModal from "./index";
import ContextProvider, { AppContext } from "lib/context";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TamaraModal />
    </ContextProvider>
  );
};

test("tamara modal Testing", () => {
  renderComponent();
});
