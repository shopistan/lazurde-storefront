import React from "react";
import AccountInformation from "./index";
import { render } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";

const title = "title";
const titleImage = { url: "/", altText: "" };
const barCode = { url: "/", altText: "" };
const firstName = "firstName";
const lastName = "lastName";
const reviewImage = { url: "/", altText: "" };
const reviewText = "reviewText";
const details = [
  {
    accounts: [
      {
        image: { url: "/", altText: "" },
        text: "text",
        width: "30px",
        height: "30px",
      },
    ],
  },
];

const renderComponent = () => {
  render(
    <ContextProvider>
      <AccountInformation
        title={title || ""}
        titleImage={titleImage || { url: "/", altText: "" }}
        barCode={barCode || { url: "/", altText: "" }}
        firstName={firstName || ""}
        lastName={lastName || ""}
        reviewImage={reviewImage || { url: "/", altText: "" }}
        reviewText={reviewText || ""}
        details={details || []}
      />
    </ContextProvider>
  );
};

const renderComponentAR = () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <AccountInformation
        title={title}
        titleImage={titleImage}
        barCode={barCode}
        firstName={firstName}
        lastName={lastName}
        reviewImage={reviewImage}
        reviewText={reviewText}
        details={details}
      />
    </AppContext.Provider>
  );
};

test("Account Page Test", () => {
  renderComponent();
  expect(title).toBe("title");
  expect(titleImage).toStrictEqual({ url: "/", altText: "" });
  expect(barCode).toStrictEqual({ url: "/", altText: "" });
  expect(firstName).toBe("firstName");
  expect(lastName).toBe("lastName");
  expect(reviewImage).toStrictEqual({ url: "/", altText: "" });
  expect(reviewText).toBe("reviewText");
  expect(details).toHaveLength(1);
});

test("render arabic version", () => {
  renderComponentAR();
});
