import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import React from "react";
import FilterBarMain from ".";

const filterListData = [
  {
    filterName: "Brand",
    filterOptions: [
      {
        optionName: "Item 1",
      },
      {
        optionName: "Item 2",
      },
    ],
  },
];

const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

const applyFunc = jest.fn();

describe("filter sortin bar tests", () => {
  test("render test: filteredData - true", () => {
    render(
      <ContextProvider>
        <FilterBarMain
          updateProductArray={applyFunc}
          filterList={filterListData}
          hasFilteredData={true}
        />
      </ContextProvider>
    );
  });

  test("render test: filteredData - false", () => {
    render(
      <ContextProvider>
        <FilterBarMain
          updateProductArray={applyFunc}
          filterList={filterListData}
          hasFilteredData={false}
        />
      </ContextProvider>
    );
  });

  test("render test: mobile", () => {
    resizeWindow(375, 600);

    render(
      <ContextProvider>
        <FilterBarMain
          updateProductArray={applyFunc}
          filterList={filterListData}
          hasFilteredData={true}
        />
      </ContextProvider>
    );
  });
});
