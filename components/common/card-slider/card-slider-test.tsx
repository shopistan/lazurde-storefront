import React from "react";
import { render, screen } from "@testing-library/react";
import CardSlider from "./index";

test("Card slider testing", () => {
  const sectionHeading = "testing section heading";
  const className = "testing-className";
  const bgColor = "#fff";
  const cardArr = [
    {
      image: {
        url: "/Bracelets.svg",
        altText: "Bracelets",
      },
      heading: "Bracelets",
    },
    {
      image: {
        url: "/Rings.svg",
        altText: "Rings",
      },
      heading: "Rings",
    },
  ];

  render(
    <CardSlider
      cards={cardArr}
      className={className}
      sectionHeading={sectionHeading}
      bgColor={bgColor}
    />
  );

  expect(screen.getByText(sectionHeading));
  expect(sectionHeading).toBeInTheDocument();
  expect(screen.getByText(className)).toBeInTheDocument();
  expect(screen.getByText(bgColor)).toBeInTheDocument();
});
