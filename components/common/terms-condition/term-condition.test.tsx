import React from "react";
import TermCondtion from "./index";
import { render, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const hyperLinkArray = [
  {
    accordion: [
      {
        heading: "heading",
        text: "text",
      },
      {
        heading: "heading",
        text: "text",
      },
    ],
    name: "name" || "",
    content: "content" || "",
    icon: {
      url: "/",
      altText: "alt-text" || "",
    },
    width: "20" || "",
    height: "20" || "",
  },
  {
    name: "name" || "",
    content: "content" || "",
    icon: {
      url: "/",
      altText: "alt-text" || "",
    },
    width: "20" || "",
    height: "20" || "",
  },
];
const sideBarBgcolor = "#fff" || "";
const contentBgcolor = "#f2f2f2" || "";
const title = "title" || "";

const renderComponent = () => {
  render(
    <ContextProvider>
      <TermCondtion
        hyperLinks={hyperLinkArray || []}
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
  expect(hyperLinkArray).toHaveLength(2);
  expect(hyperLinkArray).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "name",
        content: "content",
        icon: {
          url: "/",
          altText: "alt-text",
        },
        width: "20",
        height: "20",
      }),
      expect.objectContaining({
        name: "name",
        content: "content",
        icon: {
          url: "/",
          altText: "alt-text",
        },
        width: "20",
        height: "20",
      }),
    ])
  );
});

test("term condition arabic testing", () => {
  renderComponentAR();
});
