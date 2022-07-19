import * as React from "react";
import { render, screen } from "@testing-library/react";
import CustomerService from "./index";
import ContextProvider, { AppContext } from "lib/context";

const servicesArr: any = [
  {
    icon: { url: "/", altText: "altText" },
    iconTitle: "icon title",
    iconText: "icon text",
    url: "/",
    width: "16px",
    height: "16px",
  },
  {
    icon: { url: "/", altText: "altText" },
    iconTitle: "icon title 2",
    iconText: "icon text 2",
    url: "/",
    width: "18px",
    height: "18px",
  },
];

const renderComponent = () => {
  render(
    <ContextProvider>
      <CustomerService
        title={"banner title"}
        heading={"banner text"}
        services={servicesArr}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <CustomerService
        title={"banner title"}
        heading={"banner text"}
        services={servicesArr}
      />
    </AppContext.Provider>
  );
};

describe("Customer Service ", () => {
  test("Customer Service testing", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    const title = screen.getByRole("title");
    expect(title).toBeInTheDocument();
    expect(servicesArr).toHaveLength(2);
    expect(servicesArr).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          icon: { url: "/", altText: "altText" },
          iconTitle: "icon title",
          iconText: "icon text",
          url: "/",
          width: "16px",
          height: "16px",
        }),
        expect.objectContaining({
          icon: { url: "/", altText: "altText" },
          iconTitle: "icon title 2",
          iconText: "icon text 2",
          url: "/",
          width: "18px",
          height: "18px",
        }),
      ])
    );
    const iconText = screen.getAllByRole("iconText");
    expect(iconText[0]).toBeInTheDocument();
    const iconTitle = screen.getAllByRole("iconTitle");
    expect(iconTitle[0]).toBeInTheDocument();
  });

  test("render arabic version", () => {
    renderComponentAR();
  });
});
