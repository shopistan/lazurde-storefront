import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LazurdeHeroBanner from "./index";
import ContextProvider from "lib/context";

const renderComponent = () => {
  const heroBannerArray = [
    {
      bannerText: "Save 50% off",
      bannerBodyText:
        "The greatest selection of sale pieces from the world’s best designers — only on L’AZURDE",
      buttonText: "Shop Now",
      buttonLink: "",
      backgroundImage: {
        url: "	http://localhost:3000/_next/image?url=https%3A%2F%…01_07_at_13.22.png%3Fauto%3Dcompress&w=2048&q=100",
        altText: "",
      },
    },
  ];
  const appState = { lang: "en" };
  render(
    <ContextProvider>
      <LazurdeHeroBanner heroBannerArray={heroBannerArray} />
    </ContextProvider>
  );
};

describe("Hero Banner Tests", () => {
  test("prop test: banner text", () => {
    renderComponent();

    const title = screen.getByTestId("banner-text");
    expect(title).toBeInTheDocument();
  });

  test("prop test: banner body text text", () => {
    renderComponent();

    const title = screen.getByTestId("bannerBodyText");
    expect(title).toBeInTheDocument();
  });

  test("prop test: button text", () => {
    renderComponent();

    const title = screen.getByTestId("button");
    expect(title).toBeInTheDocument();
  });
});
