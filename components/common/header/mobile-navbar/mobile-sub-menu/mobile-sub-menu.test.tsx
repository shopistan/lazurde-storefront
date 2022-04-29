import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileSubMenu from "./mobile-sub-menu";
import ContextProvider from "lib/context";

test("Mobile Sub Menu testing", () => {
  const active = false;

  const subMenuDataMobile: any = [
    {
      title: "Shop By Category",
      catArr: [
        {
          title: "Diamond Necklaces & Pendants",
          url: "/",
          isBold: false,
        },
        {
          title: "Diamond Rings",
          url: "",
          isBold: false,
        },
      ],
    },
    {
      title: "Curated Shops",
      catArr: [
        {
          title: "Best Selling Diamonds",
          url: "",
          isBold: false,
        },
        {
          title: "New Diamonds",
          url: "",
          isBold: false,
        },
      ],
    },
  ];

  render(
    <ContextProvider>
      <MobileSubMenu
        active={true}
        menuTitle={"menu title"}
        subMenuData={subMenuDataMobile}
      />
    </ContextProvider>
  );

  expect(active).toBe(false);
  expect(screen.getByText("menu title")).toBeInTheDocument();
  expect(screen.getByTestId("submenu")).toBeInTheDocument();
  expect(screen.getByTestId("close-sub-menu")).toBeInTheDocument();
  expect(screen.getByTestId("sub-links")).toBeInTheDocument();
  expect(subMenuDataMobile).toHaveLength(2);
});
