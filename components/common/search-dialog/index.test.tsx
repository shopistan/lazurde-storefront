import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import PromoBar from "./index";
import ContextProvider from "lib/context";
import { screen } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import SearchDialog from "./index";
import { popularProductCardData } from "lib/mock-data/data";
import { within } from "@testing-library/react";

const renderComponent = () => {
  render(
    <ContextProvider>
      <SearchDialog
        siteLogo={{ url: "/img", altText: "alt" }}
        siteLogoUrl="/url"
        setOpenSearchDialog={() => {}}
        openSearchDialog={false}
      />
    </ContextProvider>
  );
};

describe("test fields in the document", () => {
  test("document should have these values", () => {
    renderComponent();
    const title = screen.getByText(/Popular Search Terms/i);
    expect(title).toBeInTheDocument();

    const productsTitle = screen.getByText(/Popular Search Products/i);
    expect(productsTitle).toBeInTheDocument();

    const jewelry = screen.getByText(/Jewelry/i);
    expect(jewelry).toBeInTheDocument();

    const rings = screen.getByText(/Rings/i);
    expect(rings).toBeInTheDocument();

    const gold = screen.getByText(/Gold/i);
    expect(gold).toBeInTheDocument();
  });

  test("document should have the exact number of divs", () => {
    renderComponent();
    const element = screen.getByTestId("product-card");
    expect(within(element).queryByTestId("card")).toHaveLength(
      popularProductCardData.length
    );
  });
});
