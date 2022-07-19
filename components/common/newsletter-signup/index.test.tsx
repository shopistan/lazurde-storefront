import { render, screen } from "@testing-library/react";
import ContextProvider from "lib/context";
import React from "react";
import NewsletterSignup from "./index";

const imageProps = {
  url: "/",
  altText: "image",
};
const renderComponent = () => {
  render(
    <ContextProvider>
      <NewsletterSignup
        backgroundImage={imageProps}
        bannerBodyText={"Banner Body Text"}
        bannerText={"Banner Text"}
        heading={"Heading"}
        upperText={"Upper Text"}
        lowerText={"Lower Text"}
      />
    </ContextProvider>
  );
};

describe("Newsletter Signup ", () => {
  test("Newsletter Banner input props", () => {
    renderComponent();
  });
});
