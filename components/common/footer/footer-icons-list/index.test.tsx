import React from "react";
import { render, screen } from "@testing-library/react";
import FooterIcons from "./index";
import { socialIconSize } from "lib/mock-data/data";

const testingData = [
  {
    icon: {
      url: "/",
      altText: "alt",
    },
    link: "/",
    width: 90,
    mobileWidth: 24,
  },
  {
    icon: {
      url: "/",
      altText: "alt",
    },
    link: "/",
    width: 90,
    mobileWidth: 24,
  },
];

test("footer icons unit testing", () => {
  render(
    <FooterIcons
      iconsList={testingData}
      iconSize={socialIconSize}
      isFooterIcons={false}
    />
  );
  const icons = screen.getAllByRole("icons");
  expect(icons[0]).toBeInTheDocument();
});

test("else part for boolean", () => {
  render(
    <FooterIcons
      iconsList={testingData}
      iconSize={socialIconSize}
      isFooterIcons={true}
    />
  );
});
