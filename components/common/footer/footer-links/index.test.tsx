import React from "react";
import { render, screen } from "@testing-library/react";
import FooterLinks from "./index";

test("footer links unit testing", () => {
  const heading = "testing heading props";
  const testingData = [
    {
      url: "/",
      text: "alt",
    },
    {
      url: "/",
      text: "alt",
    },
  ];
  render(<FooterLinks heading={heading} links={testingData} index={0} />);
  expect(screen.getByText(heading)).toBeInTheDocument();
});
