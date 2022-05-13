import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ContextProvider, { AppContext } from "lib/context";
import CategoryDropDown from "./index";

describe("", () => {
  const siteUrl = "/modal.png";
  const id = "1122";
  const image = {
    url: "/",
    altText: "alt-image",
  };

  const catObject: any = {
    dropdownData: [
      {
        title: "title",
        catArr: [
          {
            title: "title",
            url: "/",
            isBold: false,
          },
        ],
        categoryLinks: [
          {
            linkHeading: "heading",
            linkTitle: [
              {
                title: "heading",
              },
            ],
          },
        ],
      },
    ],
  };

  const openFunc = jest.fn();

  const renderComponentAR = () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <CategoryDropDown categoryData={catObject} setIsOpened={openFunc} />
      </AppContext.Provider>
    );
  };

  test("Site navbar", () => {
    render(<CategoryDropDown categoryData={catObject} setIsOpened={openFunc} />);
    const dropDownDiv = screen.getByTestId("dropdown-div");
    expect(screen.getByTestId("dropdown-div")).toBeInTheDocument();
    fireEvent.mouseOver(dropDownDiv);
    fireEvent.mouseLeave(dropDownDiv);
    // screen.debug()
  });

  test("render arabic version", () => {
    renderComponentAR();

    // screen.debug()
  });
});
