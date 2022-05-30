import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import React from "react";
import DropDown from "./index";

const filterListData = {
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
};
const applyFunc = jest.fn();
const isOpenedFunc = jest.fn();
const selectedFunc = jest.fn();

const renderComponent = (list: any = filterListData) => {
  render(
    <ContextProvider>
      <DropDown
        categoryData={list}
        onApplyFilters={applyFunc}
        selectedFilters={{
          0: {
            name: "title one",
            selectedOptions: { 0: { selected: true, name: "option 1" } },
          },
          1: {
            name: "title two",
            selectedOptions: { 0: { selected: true, name: "option 2" } },
          },
        }}
        setIsOpened={isOpenedFunc}
        setSelectedFilters={selectedFunc}
        hasFilteredData={true}
      />
    </ContextProvider>
  );
};

const renderComponentAR = (list: any = filterListData) => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <DropDown
        categoryData={list}
        onApplyFilters={applyFunc}
        selectedFilters={{
          0: {
            name: "title one",
            selectedOptions: { 0: { selected: true, name: "option 1" } },
          },
          1: {
            name: "title two",
            selectedOptions: { 0: { selected: true, name: "option 2" } },
          },
        }}
        setIsOpened={isOpenedFunc}
        setSelectedFilters={selectedFunc}
        hasFilteredData={true}
      />
    </AppContext.Provider>
  );
};

describe("filter bar dropdown tests", () => {
  test("render prop tests", () => {
    renderComponent(filterListData);
    expect(screen.getByText(/Two headed/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Two headed/i));
    expect(selectedFunc).toBeCalled();
    fireEvent.click(screen.getByText(/Two headed/i));
    expect(selectedFunc).toBeCalled();
  });

  test("click event tests", () => {
    renderComponent();
    const button = screen.getByText(/Clear All Filters/i);
    const applybutton = screen.getByText(/Apply/i);
    expect(applybutton).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.click(applybutton);
    fireEvent.click(button);
    expect(applyFunc).toBeCalled();
    expect(selectedFunc).toBeCalled();

    const dropDownDiv = screen.getByTestId("dropdown-div");
    expect(screen.getByTestId("dropdown-div")).toBeInTheDocument();
    fireEvent.mouseOver(dropDownDiv);
    expect(isOpenedFunc).toBeTruthy();
    expect(isOpenedFunc).toBeCalled();
    fireEvent.mouseLeave(dropDownDiv);
    expect(isOpenedFunc).toBeCalled();

  });

  test("render empty props", () => {
    renderComponent({});
  });

  test("render arabic verion", () => {
    renderComponentAR();
  });

  test("render arabic version with empty propss", () => {
    renderComponentAR({});
  });
});
