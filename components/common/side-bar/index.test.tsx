import * as React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import SideBar from ".";

const detailsData = {
  image: { url: "/image", altText: "image text" },
  text: "detail text",
  width: 200,
  height: 200,
  link: "/detail-link",
};

const barCode = { url: "/image", altText: "image text" };
const firstName = "first name";
const lastName = "last name";
const reviewImage = { url: "/image", altText: "image text" };
const reviewText = "review text";
const details = [{ accounts: [detailsData] }];
const setActiveComponent = jest.fn();
const activeComponent = "";

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

jest.mock("lib/identity", () => ({
  getUserInfo: () => {
    return { firstName: "Test Name" };
  },
}));

describe("side bar tests", () => {
  test("render test", async () => {
    await act(async () => {
      render(
        <ContextProvider>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewText={reviewText}
            reviewImage={reviewImage}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </ContextProvider>
      );
    });
  });

  test("render test: mobile", async () => {
    resizeWindow(375, 600);
    await act(async () => {
      render(
        <ContextProvider>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewText={reviewText}
            reviewImage={reviewImage}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </ContextProvider>
      );
    });
  });

  test("render test: empty", async () => {
    const detailsData = {
      image: { url: "", altText: "" },
      text: "",
      width: "",
      height: "",
      link: "",
    };

    const barCode = { url: "", altText: "" };
    const firstName = "";
    const lastName = "";
    const reviewImage = { url: "", altText: "" };
    const reviewText = "";
    const details = [{ accounts: [detailsData] }];
    const setActiveComponent = jest.fn();
    const activeComponent = "";

    await act(async () => {
      render(
        <ContextProvider>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewText={reviewText}
            reviewImage={reviewImage}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </ContextProvider>
      );
    });
  });

  test("render test: mobile", async () => {
    resizeWindow(375, 600);
    await act(async () => {
      render(
        <ContextProvider>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewText={reviewText}
            reviewImage={reviewImage}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </ContextProvider>
      );
    });
  });

  test("render test: arabic", async () => {
    await act(async () => {
      render(
        <AppContext.Provider value={{ appState: { lang: "ar" } }}>
          <SideBar
            barCode={barCode}
            firstName={firstName}
            lastName={lastName}
            reviewText={reviewText}
            reviewImage={reviewImage}
            details={details}
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        </AppContext.Provider>
      );
    });
  });
});
