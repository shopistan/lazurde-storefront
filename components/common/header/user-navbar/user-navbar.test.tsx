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
        width: '232',
        mobileWidth: '2323',
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

  const objectEmpty = {
    mainImg: {
      url: "",
      altText: "",
    },
    mainTitle: "",
    logoArr: [
      {
        width: '',
        mobileWidth: '',
        logoImg: {
          url: "",
          altText: "",
        },
      },
    ],
    brandArr: [
      {
        url: "",
        altText: "",
        label: "",
        labelUrl: "",
        brandImg: {
          url: "",
          altText: "",
        },
      },
    ],
  };

  const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

  const renderComponentAR = (object: any) => {
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

    const clickableLink = screen.getByTestId("item1");
  });

  test("links", () => {
    render(
      <ContextProvider>
        <UserNavBar brandSideBar={objectEmpty} />
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

    const clickableLink = screen.getByTestId("item1");
    // fireEvent.click(clickableLink);

    resizeWindow(1440, 800)
    resizeWindow(375, 800)

  });

  // test("links", () => {
  //   render(
  //     <ContextProvider>
  //       <UserNavBar brandSideBar={objectEmpty} />
  //     </ContextProvider>
  //   );
  // });

  test("links", () => {
    renderComponentAR(object);
  });
  test("links", () => {
    renderComponentAR(objectEmpty);
  });
});
