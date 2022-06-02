import * as React from "react";
import { render, screen } from "@testing-library/react";
import SizeChart from "./index";
import ContextProvider from "lib/context";

const sizeChartUrl = "/url";
const onSizeChange = jest.fn();
const productSizeArray = [
  {
    Size: "4.5",
  },
  {
    Size: "5",
  },
];

test("product size component testing", () => {
  render(
    <ContextProvider>
      <SizeChart
        sizeChartUrl={sizeChartUrl}
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
    </ContextProvider>
  );
  expect(productSizeArray).toHaveLength(2);
  expect(productSizeArray).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ Size: "4.5" }),
      expect.objectContaining({ Size: "5" }),
    ])
  );
});

test("product size empty component testing", () => {
  const sizeChartUrl = "";
  const onSizeChange = jest.fn();
  const productSizeArray = [
    {
      Size: "",
    },
    {
      Size: "",
    },
  ];

  render(
    <ContextProvider>
      <SizeChart
        sizeChartUrl={sizeChartUrl}
        productSizeArray={productSizeArray}
        onSizeChange={onSizeChange}
      />
    </ContextProvider>
  );
  expect(productSizeArray).toHaveLength(2);
  expect(productSizeArray).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ Size: "" }),
      expect.objectContaining({ Size: "" }),
    ])
  );
});