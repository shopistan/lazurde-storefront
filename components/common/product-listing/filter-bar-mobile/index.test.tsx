import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import React from "react";
import FilterBarMobile from "./index";

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
const applyFunc = jest.fn();
const sortingFunc = jest.fn(); 
const onClear = jest.fn(); 

const renderComponent = (list = filterListData) => {
  render(
    <ContextProvider>
      <FilterBarMobile
        filterList={list}
        onApplyFilters={applyFunc}
        onSortingChange={sortingFunc}
        onClear={onClear}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {

  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <FilterBarMobile
        filterList={filterListData}
        onApplyFilters={applyFunc}
        onSortingChange={sortingFunc}
        onClear={onClear}
      />
    </AppContext.Provider>
  );
};

describe("filter bar mobile tests", () => {
  test("render props tests", () => {
    renderComponent();
    expect(screen.getByText(/Brand/i)).toBeInTheDocument();

    const sortBy = screen.getAllByText(/Sort By:/i)
    expect(sortBy[0]).toBeInTheDocument();
    expect(sortBy[1]).toBeInTheDocument();

    // expect(screen.getAllByText(/Best Sellers/i)[0]).toBeInTheDocument();
    // expect(screen.getAllByText(/Best Sellers/i)[1]).toBeInTheDocument();
    expect(filterListData).toHaveLength(1);

  });

  test("render click events tests", () => {
    renderComponent();
    const button = screen.getAllByText(/Clear All Filters/i);
    const applybutton = screen.getByText(/Apply/i);
    expect(applybutton).toBeInTheDocument();
    expect(button[0]).toBeInTheDocument();
    fireEvent.click(applybutton);
    fireEvent.click(button[0]);
    expect(applyFunc).toBeCalled();
  });

  test("render arabic version", async () => {
    renderComponentAR();
  });

  test("render empty props", async () => {
    renderComponent([]);
  });
});
