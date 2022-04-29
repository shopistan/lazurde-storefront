import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import React from "react";
import DropDown from "./index";

const filterListData =
  {
    filterName: "Type",
    dropdownData: [
      {
        optionName: "Two headed",
      },
      {
        optionName: "Solitaire",
      },
      {
        optionName: "Twins",
      },
      {
        optionName: "Bands",
      },
      {
        optionName: "Eternity",
      },
    ],
  } || {};
const isOpenedFunc = jest.fn();
const selectedFunc = jest.fn();
const countFunc = jest.fn();

const renderComponent = (list: any = filterListData) => {
  render(
    <ContextProvider>
      <DropDown
        categoryData={list}
        setIsOpened={isOpenedFunc}
        selectedFilters={{
          "title one": { option: "true" },
          "title two": { option: "true" },
        }}
        setSelectedFilters={selectedFunc}
        setTotalSelectedFilterCount={countFunc}
      />
    </ContextProvider>
  );
};

const renderComponentAR = (list: any = filterListData) => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <DropDown
        categoryData={list}
        setIsOpened={isOpenedFunc}
        selectedFilters={{
          "title one": { option: "true" },
          "title two": { option: "true" },
        }}
        setSelectedFilters={selectedFunc}
        setTotalSelectedFilterCount={countFunc}
      />
    </AppContext.Provider>
  );
};

describe("filter bar mobile dropdown tests", () => {
  test("render props tests", () => {
    renderComponent(filterListData);
    expect(screen.getByText(/Two headed/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Two headed/i));
    fireEvent.click(screen.getByText(/Two headed/i));
    expect(selectedFunc).toBeCalled();
    expect(countFunc).toBeCalled();
  });

  test("click event tests", () => {
    renderComponent();

    const dropDownDiv = screen.getByTestId("dropdown-div");
    expect(screen.getByTestId("dropdown-div")).toBeInTheDocument();
    fireEvent.mouseOver(dropDownDiv);
    expect(isOpenedFunc).toBeTruthy();
    expect(isOpenedFunc).toBeCalled();
    fireEvent.mouseLeave(dropDownDiv);
    expect(isOpenedFunc).toBeCalled();
  });

  test("render empty props test", () => {
    renderComponent({ filterName: "", dropdownData: [{ optionName: "" }] });
  });

  test("render arabic verion", () => {
    renderComponentAR();
  });

  test("render arabic version with empty props", () => {
    renderComponentAR({});
  });
});
