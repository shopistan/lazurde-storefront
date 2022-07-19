import { render, screen } from "@testing-library/react";
import React from "react";
import ContextProvider, { AppContext } from "lib/context";
import InThePress from ".";

const storyData = [
  {
    storyImage: { url: "/something", altText: "altText" },
    storyTitle: "story title",
    storyHeading: "story heading",
    storyDescriptin: "story description",
  },
];

const bImage = { url: "/something", altText: "altText" };

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

describe("in the press tests", () => {
  test("render test: english", () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "en" } }}>
        <InThePress
          bannerImage={bImage}
          heading={"test heading"}
          stories={storyData}
        />
      </AppContext.Provider>
    );
  });

  test("render test: empty props", () => {
    const storyData = [
      {
        storyImage: { url: "", altText: "" },
        storyTitle: "",
        storyHeading: "",
        storyDescriptin: "",
      },
    ];

    const bImage = { url: "", altText: "" };
    render(
      <AppContext.Provider value={{ appState: { lang: "en" } }}>
        <InThePress
          bannerImage={bImage}
          heading={"test heading"}
          stories={storyData}
        />
      </AppContext.Provider>
    );
  });

  test("render test: arabic", () => {

    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <InThePress
          bannerImage={bImage}
          heading={"test heading"}
          stories={storyData}
        />
      </AppContext.Provider>
    );
  });

  test("render test: mobile", () => {
    resizeWindow(375, 600);
    render(
      <AppContext.Provider value={{ appState: { lang: "en" } }}>
        <InThePress
          bannerImage={bImage}
          heading={"test heading"}
          stories={storyData}
        />
      </AppContext.Provider>
    );
  });
});
