import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import UserNavBar from "./index";
import ContextProvider, { AppContext } from "lib/context";

describe("", () => {
  const object = {
    mainImg: {
      url: "/",
      altText: "altText",
    },
    mainTitle: "mainTitle",
    logoArr: [
      {
        logoImg: {
          url: "/",
          altText: "altText",
        },
      },
    ],
    brandArr: [
      {
        url: "/",
        altText: "altText",
        label: "",
        labelUrl: "",
        brandImg: {
          url: "/",
          altText: "",
        },
      },
    ],
  };


  const renderComponentAR = () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <UserNavBar brandSideBar={object} />
      </AppContext.Provider>
    );
  };

  test("links", () => {
    render(
        <ContextProvider>
          <UserNavBar brandSideBar={object} />
        </ContextProvider>
      );
    const links = document.querySelector("a").getAttribute("href");
    expect(links).toBe("/");
    const button = screen.getByRole('button')
    fireEvent.click(button)
  });

  test("links", () => {
    renderComponentAR()
  });
});
