import React from "react";
import TermCondtion from "./index";
import { render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const accordionArray = [
  {
    heading: "heading",
    text: "text",
  },
];

const hyperLinkArray = [
  {
    name: "",
    content: "",
    icon: {
      url: "/",
      altText: "alt-text",
    },
    width: "",
    height: "",
  },
];
const sideBarBgcolor = "#fff";
const contentBgcolor = "#f2f2f2";
const title = "title";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TermCondtion
        hyperLinks={hyperLinkArray || []}
        accordion={accordionArray || []}
        sideBarBgcolor={sideBarBgcolor || ""}
        title={title || ""}
        contentBgcolor={contentBgcolor || ""}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <TermCondtion
        hyperLinks={hyperLinkArray}
        accordion={accordionArray}
        sideBarBgcolor={sideBarBgcolor}
        title={title}
        contentBgcolor={contentBgcolor}
      />
    </AppContext.Provider>
  );
};

test("term condition testing", () => {
  renderComponent();
  expect(title).toBe("title");
  expect(sideBarBgcolor).toBe("#fff");
  expect(contentBgcolor).toBe("#f2f2f2");
  expect(hyperLinkArray).toHaveLength(1);
  expect(accordionArray).toHaveLength(1);
  expect(accordionArray).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ heading: "heading", text: "text" }),
    ])
  );
});

test("term condition arabic testing", () => {
  renderComponentAR();
});
