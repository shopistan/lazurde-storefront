import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LazurdeHeroBanner from "./index";
import ContextProvider, { AppContext } from "lib/context";

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
const renderComponent = () => {
  render(
    <ContextProvider>
      <LazurdeHeroBanner heroBannerArray={heroBannerArray} />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <LazurdeHeroBanner heroBannerArray={heroBannerArray} />
    </AppContext.Provider>
  )
}

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

test('render array length', () => {
  renderComponent()
  expect(heroBannerArray).toHaveLength(1)
  expect(heroBannerArray).toEqual(
    expect.arrayContaining(
      [
        expect.objectContaining({ bannerText: "Save 50% off", buttonText: "Shop Now", })
      ]
    )
  )
})

test("render arabic version", () => {
  renderComponentAR();
});
