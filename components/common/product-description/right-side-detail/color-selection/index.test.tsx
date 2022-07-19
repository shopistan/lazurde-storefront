import * as React from "react";
import { render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import ColorSelection from "./index";

const onColorChange = jest.fn();
const setSelectedColor = jest.fn();

test("prop test", () => {
  const productSizeArray = [
    {
      Color: "red",
    },
    {
      Color: "yellow",
    },
  ];
  const productData = {
    Color: "green",
  };
  render(
    <ContextProvider>
      <ColorSelection
        productData={productData}
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
        setSelectedColor={setSelectedColor}
        selectedSize={{ size: -1, index: 0 }}
        selectedColor={{ color: "", index: 0 }}
      />
    </ContextProvider>
  );

  screen.findByRole(/closeButton/i)
});

test("prop test: product with size", () => {
  const productSizeArray = [
    {
      Color: "red",
    },
    {
      Color: "yellow",
    },
  ];
  const productData = {
    Size: 4,
    Color: "green",
  };
  render(
    <ContextProvider>
      <ColorSelection
        productData={productData}
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
        setSelectedColor={setSelectedColor}
        selectedSize={{ size: -1, index: 0 }}
        selectedColor={{ color: "", index: 0 }}
      />
    </ContextProvider>
  );

  screen.findByRole(/closeButton/i)
});

test("empty prop test", () => {
  const productSizeArray: any = [];
  const productData = {};

  render(
    <ContextProvider>
      <ColorSelection
        productData={productData}
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
        setSelectedColor={setSelectedColor}
        selectedSize={{ size: -1, index: 0 }}
        selectedColor={{ color: "", index: 0 }}
      />
    </ContextProvider>
  );
});

test("arbaic version test", () => {
  const productSizeArray: any = [];
  const productData = {};

  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ColorSelection
        productData={productData}
        productSizeArray={productSizeArray}
        onColorChange={onColorChange}
        setSelectedColor={setSelectedColor}
        selectedSize={{ size: -1, index: 0 }}
        selectedColor={{ color: "", index: 0 }}
      />
     </AppContext.Provider>
  );
});
