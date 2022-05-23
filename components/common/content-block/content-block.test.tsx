import React from "react";
import ContentBlock from "./index";
import { screen, render } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const content = {
  name: "name" || "",
  content: "content" || "",
  icon: {
    url: "/" || "",
    altText: "alt-text" || "",
  },
};

const renderComponent = () => {
  render(
    <ContextProvider>
      <ContentBlock content={content} />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <ContentBlock content={content} />
    </AppContext.Provider>
  );
};

test("content block testing", () => {
  renderComponent();
  expect(content.name).toBe("name");
  expect(content.content).toBe("content");
  expect(screen.getByAltText("alt-text")).toBeInTheDocument();
});

test("render arabic version", () => {
  renderComponentAR();
});
