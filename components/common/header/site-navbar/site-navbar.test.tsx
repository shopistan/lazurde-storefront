import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import SiteNavBar from "./index";
import ContextProvider, { AppContext } from "lib/context";

describe("", () => {
  const siteUrl = "/modal.png";
  const id = "1122";
  const image = {
    url: "/",
    altText: "alt-image",
  };

  const array: any = [
    {
      navTitle: "navTitle1",
      titleUrl: "/",
      navArr: [
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
    },
    {
      navTitle: "navTitle2",
      titleUrl: "/",
      navArr: [
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
    },
  ];

  const searchFunc = jest.fn();

  const renderComponentAR = () => {
    act(() => {
      render(
        <AppContext.Provider value={{ appState: { lang: "ar" } }}>
          <SiteNavBar
            headerId={id}
            siteLogoUrl={siteUrl}
            siteLogo={image}
            siteNavBar={array}
            setOpenSearchDialog={searchFunc}
          />
        </AppContext.Provider>
      );
    });
  };

  test("Site navbar", () => {
    act(() => {
      render(
        <SiteNavBar
          headerId={id}
          siteLogoUrl={siteUrl}
          siteLogo={image}
          siteNavBar={array}
          setOpenSearchDialog={searchFunc}
        />
      );
      expect(screen.getByAltText("alt-image")).toBeInTheDocument();
      expect(screen.getByTestId("id")).toBeInTheDocument();
      expect(document.querySelector("a").getAttribute("href")).toBe("/");
      expect(array).toHaveLength(2);
      expect(array).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ navTitle: "navTitle1" }),
          expect.objectContaining({ navTitle: "navTitle2" }),
        ])
      );

      expect(screen.getByRole("overlay")).toBeInTheDocument();
      const overlay = screen.getByRole("overlay");
      fireEvent.click(overlay);

      const search = screen.getByRole("search");
      expect(search).toBeInTheDocument();
      fireEvent.click(search);
      expect(searchFunc).toBeCalled();

      const links = screen.getAllByRole("links");
      expect(links[0]).toBeInTheDocument();

      fireEvent.mouseOver(links[0]);
      fireEvent.mouseLeave(links[0]);

      const dropDownDiv = screen.getByTestId("dropdown-div");
      expect(screen.getByTestId("dropdown-div")).toBeInTheDocument();
      fireEvent.mouseOver(dropDownDiv);
      fireEvent.mouseLeave(dropDownDiv);
    });
  });

  test("render arabic version", () => {
    renderComponentAR();
  });
});
