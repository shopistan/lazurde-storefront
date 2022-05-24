import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import React from "react";
import FilterBar from "./index";

const filterListData = [
  {
    filterName: "Brand",
    filterOptions: [
      {
        optionName: "Brand 1",
      },
      {
        optionName: "Brand 2",
      },
    ],
  },
];
const applyFunc = jest.fn();
const sortingFunc = jest.fn();
const setTotalSelectedFilterCount = jest.fn()

const renderComponent = (list = filterListData) => {
  render(
    <ContextProvider>
      <FilterBar
        filterList={list}
        onApplyFilters={applyFunc}
        onSortingChange={sortingFunc}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider
      value={{ appState: { lang: "ar" }, setTotalSelectedFilterCount }}
    >
      <FilterBar
        filterList={filterListData}
        onApplyFilters={applyFunc}
        onSortingChange={sortingFunc}
      />
    </AppContext.Provider>
  );
};

describe("filter sortin bar tests", () => {
  test("render tests", () => {
    renderComponent();
    expect(screen.getByText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort By:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Best Sellers/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Best Sellers/i)[1]).toBeInTheDocument();
    expect(filterListData).toHaveLength(1);

    expect(screen.getByRole("overlay")).toBeInTheDocument();
    const overlay = screen.getByRole("overlay");
    fireEvent.click(overlay);

    expect(screen.getByRole("links")).toBeInTheDocument();
    const links = screen.getByRole("links");

    fireEvent.mouseOver(links);
    fireEvent.mouseLeave(links);
  });

  test("button click tests", () => {
    renderComponent();
    const button = screen.getAllByText(/Clear All Filters/i);
    const applybutton = screen.getByText(/Apply/i);
    expect(applybutton).toBeInTheDocument();
    expect(button[0]).toBeInTheDocument();
    expect(button[1]).toBeInTheDocument();
    fireEvent.click(applybutton);
    fireEvent.click(button[0]);
    fireEvent.click(button[1]);
    expect(applyFunc).toBeCalled();
  });

  test("render arabic version", async () => {
    renderComponentAR();
    // const list = screen.getAllByRole("listitem");
    // expect(list[0]).toBeInTheDocument();
    // fireEvent.click(list[0]);
  });

  test("render empty props", async () => {
    renderComponent([]);
  });
});
