import React from "react";
import CGIR from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const cgirPages = [
  {
    name: "IR Home Page",
    icon: {
      url: "/",
      altText: "alt-text",
    },
    moreContent: [
      {
        text: "Governance and Investor Relations Department aims to achieve effective communication between the company and investors.",
      },
      {
        text: "It also seeks to adhere to governance and enhance the level of disclosure and transparency, which helps shareholders to exercise their rights stipulated by the relevant laws and regulations.",
      },
    ],
  },
  {
    name: "Fact Sheet",
    icon: {
      url: "/",
      altText: "alt-text",
    },
  },
];

const sideBarBgcolor = "#fff";
const contentBgcolor = "#f2f2f2";
const title = "Corporate Governance and Investors Relations";

const renderComponent = () => {
  render(
    <ContextProvider>
      <CGIR
        cgirPages={cgirPages || []}
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
      <CGIR
        cgirPages={cgirPages || []}
        sideBarBgcolor={sideBarBgcolor || ""}
        title={title || ""}
        contentBgcolor={contentBgcolor || ""}
      />
    </AppContext.Provider>
  );
};

describe("CGIR TESTING", () => {
  test("CGIR Page testing", () => {
    renderComponent();

    expect(cgirPages).toHaveLength(2);

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText("Have a question?")).toBeInTheDocument();
  });

  test("iframes", () => {
    renderComponent();
    const iFrame = screen.getByTitle("Euroland Homepage iFrame");
    expect(iFrame).toBeTruthy();

    const factIframe = screen.queryByTitle("Euroland Fact Sheet iFrame");
    expect(factIframe).toBeNull();

    const label = screen.getAllByText("IR Home Page");
    expect(label[0]).toBeInTheDocument();
    expect(label[1]).toBeInTheDocument();
    expect(label).toHaveLength(2);

    const label2 = screen.getAllByText("Fact Sheet");
    expect(label2[0]).toBeInTheDocument();

    fireEvent.click(label2[0]);

    const factIframeScreen = screen.queryByTitle("Euroland Fact Sheet iFrame");
    expect(factIframeScreen).toBeTruthy();

    const factLabels = screen.getAllByText("Fact Sheet");
    expect(factLabels[0]).toBeInTheDocument();
    expect(factLabels[1]).toBeInTheDocument();
    expect(factLabels).toHaveLength(2);

    // const homepageIframe = screen.getByTitle("Euroland Homepage iFrame");
    // expect(homepageIframe).toBeNull();
  });

  test("CGIR arabic testing", () => {
    renderComponentAR();
  });
});
