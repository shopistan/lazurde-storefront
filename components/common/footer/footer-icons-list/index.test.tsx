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
    },
    {
      icon: {
        url: "/",
        altText: "alt",
      },
      link: "/",
    },
  ];
  render(<FooterIcons iconsList={testingData} />);
});
