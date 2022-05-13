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
        label: "main label",
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
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("overlay")).toBeInTheDocument();
    const overlay = screen.getByRole("overlay");
    fireEvent.click(overlay);
    expect(screen.getByRole("brandSideBarDiv")).toBeInTheDocument();
    const brandSideBarDiv = screen.getByRole("brandSideBarDiv");
    fireEvent.click(brandSideBarDiv);
    expect(screen.getByRole("brandSideBarMain")).toBeInTheDocument();
    const brandSideBarMain = screen.getByRole("brandSideBarMain");
    fireEvent.click(brandSideBarMain);
  });

  test("links", () => {
    render(
      <ContextProvider>
        <UserNavBar brandSideBar={object} />
      </ContextProvider>
    );
    const clickableLink = screen.getByTestId("item1");
    // fireEvent.click(clickableLink);
  });

  test("links", () => {
    renderComponentAR();
    screen.debug();
  });
});
