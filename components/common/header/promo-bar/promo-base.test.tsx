import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PromoBar from "./index";
import ContextProvider from 'lib/context';

const renderComponent = () => {
  const appState = { lang: 'en' };
  render(
    <ContextProvider>
      <PromoBar
        title={"Promo Bar Title"}
        linkText={"Promo Link Text"}
        link={"./page-change"}
        mobileLinkText={"mobile text"}
      bgColor={'#fff'}
      />
    </ContextProvider>
  );
};

describe("Promo Bar Tests", () => {
  test("prop test: title", () => {
    renderComponent()

    const title = screen.getByText(/Promo Bar Title/i)
    expect(title).toBeInTheDocument();

  })

  test("prop test: link text", () => {
    renderComponent()

    const title = screen.getByText(/Promo Link Text/i)
    expect(title).toBeInTheDocument();

  })

  // test("prop test: link", () => {
  //   renderComponent()

  //   const title = screen.getByText(/Promo Bar Title/i)
  //   expect(title).toBeInTheDocument();

  // })


})