import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import ContextProvider from "lib/context";
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

const renderComponent = () => {
  render(
    <ContextProvider>
      <FilterBar
        filterList={filterListData}
        onApplyFilters={applyFunc}
        onSortingChange={sortingFunc}
      />
    </ContextProvider>
  );
};

describe("testing language selector component", () => {
  test("testing show button prop", () => {
    renderComponent();
    expect(screen.getByText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort By:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Best Sellers/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Best Sellers/i)[1]).toBeInTheDocument();
    expect(filterListData).toHaveLength(1);

    expect(screen.getByRole("overlay")).toBeInTheDocument();
    const overlay = screen.getByRole("overlay")
    fireEvent.click(overlay);

    expect(screen.getByRole("links")).toBeInTheDocument();
    const links = screen.getByRole("links")

    fireEvent.mouseOver(links);
    fireEvent.mouseLeave(links);

  });

  test("testing show button prop", () => {
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

});
