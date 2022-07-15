import * as React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import CelebrityChoice from ".";

const bannerImage = { url: "/image", altText: "" };
const heading = "test heading";
const celebrities = {
  celebrityImage: { url: "/image", altText: "" },
  celebritySign: { url: "/image", altText: "" },
};
const detailsHeading = "";
const detailsDescription = "";

describe("celebrity choice tests", () => {
  test("render test", () => {
    render(
      <ContextProvider>
        <CelebrityChoice
          bannerImage={bannerImage}
          heading={heading}
          celebrities={[celebrities]}
          detailsHeading={detailsHeading}
          detailsDescription={detailsDescription}
        />
      </ContextProvider>
    );
  });

  test("render test: empty props", () => {
    const bannerImage = { url: "", altText: "" };
    const heading = "";
    const celebrities = {
      celebrityImage: { url: "", altText: "" },
      celebritySign: { url: "", altText: "" },
    };
    const detailsHeading = "";
    const detailsDescription = "";

    render(
      <ContextProvider>
        <CelebrityChoice
          bannerImage={bannerImage}
          heading={heading}
          celebrities={[celebrities]}
          detailsHeading={detailsHeading}
          detailsDescription={detailsDescription}
        />
      </ContextProvider>
    );
  });
  test("render test: arabic", () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <CelebrityChoice
          bannerImage={bannerImage}
          heading={heading}
          celebrities={[celebrities]}
          detailsHeading={detailsHeading}
          detailsDescription={detailsDescription}
        />
      </AppContext.Provider>
    );
  });
});
