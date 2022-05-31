import * as React from "react";
import { render } from "@testing-library/react";
import ProductDescription from "./index";
import ContextProvider from "lib/context";

test("product detail page testing", () => {
  render(
    <ContextProvider>
      {/* <ProductDescription /> */}
    </ContextProvider>
  );
});
