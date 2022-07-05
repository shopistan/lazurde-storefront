import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import UserNavBar from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { act } from "react-dom/test-utils";

describe("", () => {
  const object = {
    mainImg: {
      url: "/",
      altText: "altText",
    },
    mainTitle: "mainTitle",
    logoArr: [
      {
        width: "232",
        mobileWidth: "2323",
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
        width: "",
        mobileWidth: "",
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
    act(() => {
      render(
        <AppContext.Provider
          value={{ appState: { lang: "ar" }, allWishListProducts: [100, 200] }}
        >
          <UserNavBar brandSideBar={object} />
        </AppContext.Provider>
      );
    });
  };

  test("links", () => {
    act(() => {
      render(
        <AppContext.Provider
          value={{ appState: { lang: "en" }, allWishListProducts: [100, 200] }}
        >
          <UserNavBar brandSideBar={object} />
          </AppContext.Provider>
      );
      const links = document.querySelector("a").getAttribute("href");
      expect(links).toBe("/");

      const button = screen.getAllByRole("button");
      fireEvent.click(button[0]);

      // expect(screen.getByRole("overlay")).toBeInTheDocument();
      // const overlay = screen.getByRole("overlay");
      // fireEvent.click(overlay);

      expect(screen.getByRole("brandSideBarDiv")).toBeInTheDocument();
      const brandSideBarDiv = screen.getByRole("brandSideBarDiv");
      fireEvent.click(brandSideBarDiv);

      expect(screen.getByRole("brandSideBarMain")).toBeInTheDocument();
      const brandSideBarMain = screen.getByRole("brandSideBarMain");
      fireEvent.click(brandSideBarMain);

      const clickableLink = screen.getByTestId("item1");
    });
  });

  test("links", () => {
    act(() => {
      render(
        <ContextProvider>
          <UserNavBar brandSideBar={objectEmpty} />
        </ContextProvider>
      );
      const links = document.querySelector("a").getAttribute("href");
      expect(links).toBe("/");

      const button = screen.getAllByRole("button");
      fireEvent.click(button[0]);

      // expect(screen.getByRole("overlay")).toBeInTheDocument();
      // const overlay = screen.getByRole("overlay");
      // fireEvent.click(overlay);

      expect(screen.getByRole("brandSideBarDiv")).toBeInTheDocument();
      const brandSideBarDiv = screen.getByRole("brandSideBarDiv");
      fireEvent.click(brandSideBarDiv);

      expect(screen.getByRole("brandSideBarMain")).toBeInTheDocument();
      const brandSideBarMain = screen.getByRole("brandSideBarMain");
      fireEvent.click(brandSideBarMain);

      const clickableLink = screen.getByTestId("item1");
      // fireEvent.click(clickableLink);

      resizeWindow(1440, 800);
      resizeWindow(375, 800);
    });
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
