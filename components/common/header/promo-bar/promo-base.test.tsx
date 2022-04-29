import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PromoBar from "./index";
import ContextProvider from "lib/context";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

const renderComponent = () => {
  render(
    <ContextProvider>
      <PromoBar
        title={"Promo Bar Title"}
        linkText={"Promo Link Text"}
        link={"/page-change"}
        mobileLinkText={"mobile text"}
        bgColor={"#fff"}
      />
    </ContextProvider>
  );
};

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

describe("Promo Bar Tests", () => {
  test("prop test: title", () => {
    renderComponent();

    const title = screen.getByText(/Promo Bar Title/i);
    expect(title).toBeInTheDocument();
  });

  test("prop test: link text", () => {
    renderComponent();

    const title = screen.getByText(/Promo Link Text/i);
    expect(title).toBeInTheDocument();
  });

  test("prop test: link", () => {
    renderComponent();

    expect(document.querySelector("a").getAttribute("href")).toBe(
      "/page-change"
    );
  });

  test("button test", () => {
    renderComponent();
    const promobar = screen.getByTestId("promo-div");
    expect(promobar).toHaveAttribute("data-visible", "false");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(promobar).toHaveAttribute("data-visible", "true");
  });

  test("prop test: title", () => {
    act(() => {
      renderComponent();
      resizeWindow(375, 600);
      const title = screen.getByText(/mobile text/i);
      expect(title).toBeInTheDocument();
    });
  });
});
