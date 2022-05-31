import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductDetail from "./index";
import ContextProvider, { AppContext } from "lib/context";

const testproductDetail = "product detail";
const testmetal = "18K White Golds";
const testdiamond = "19K White Goldss";
const teststone = "20K White Golds";
const testpendantSize = "21K White Gold";
const testcharmSize = "22K White Golds";
const testchainLength = "23cm";
const testrignSize = "9 mm";
const testearringSize = "18K";
const testankletSize = "testing tanklet size";
const testbraceletSize = "test braceletSize";
const teststyleNumber = "KP701276SB";
const testbrand = `L'azurde`;
const testcollection = "testing colection";

test("testing product feature", () => {
  render(
    <ContextProvider>
      <ProductDetail
        productDetail={testproductDetail}
        metal={testmetal}
        diamond={testdiamond}
        stone={teststone}
        pendantSize={testpendantSize}
        charmSize={testcharmSize}
        chainLength={testchainLength}
        rignSize={testrignSize}
        earringSize={testearringSize}
        ankletSize={testankletSize}
        braceletSize={testbraceletSize}
        styleNumber={teststyleNumber}
        brand={testbrand}
        collection={testcollection}
      />
    </ContextProvider>
  );

  expect(screen.getByText(testproductDetail)).toBeInTheDocument();
  expect(screen.getByText(testmetal)).toBeInTheDocument();
  expect(screen.getByText(testdiamond)).toBeInTheDocument();
  expect(screen.getByText(teststone)).toBeInTheDocument();
  expect(screen.getByText(testpendantSize)).toBeInTheDocument();
  expect(screen.getByText(testcharmSize)).toBeInTheDocument();
  expect(screen.getByText(testchainLength)).toBeInTheDocument();
  expect(screen.getByText(testrignSize)).toBeInTheDocument();
  expect(screen.getByText(testearringSize)).toBeInTheDocument();
  expect(screen.getByText(testankletSize)).toBeInTheDocument();
  expect(screen.getByText(testbraceletSize)).toBeInTheDocument();
  expect(screen.getByText(testbrand)).toBeInTheDocument();
  expect(screen.getByText(testcollection)).toBeInTheDocument();
});
