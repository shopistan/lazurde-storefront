import React from "react";
import { render } from "@testing-library/react";
import FooterIcons from "./index";

test("footer icons unit testing", () => {
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
  render(<FooterIcons iconsList={testingData} />);
});
