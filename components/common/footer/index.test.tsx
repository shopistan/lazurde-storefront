import * as React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { footerLinks, socialLinks } from "lib/mock-data/data";

const heading = "main heading";
const subHeading = "sub heading";
const subscriptionText = "subscription Text";
const socialIconText = "social Icon Text";
const footerLogo = {
  url: "/img",
  altText: "alt",
};

const footerLinksTest = [
  {
    linkHeading: "link heading",
    links: [
      {
        url: "/",
        text: "text 1",
      },
      {
        url: "/",
        text: "text 2",
      },
      {
        url: "/",
        text: "text 3",
      },
    ],
  },
  {
    linkHeading: "link heading",
    links: [
      {
        url: "/",
        text: "text 1",
      },
      {
        url: "/",
        text: "text 2",
      },
      {
        url: "/",
        text: "text 3",
      },
    ],
  },
];

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

const renderComponentAR = () => {
  <AppContext.Provider value={{ appState: { lang: "ar" } }}>
    <Footer
      heading={heading}
      subHeading={subHeading}
      subscriptionText={subscriptionText}
      socialIconText={socialIconText}
      footerLogo={footerLogo}
      footerLinks={footerLinks}
      socialLinks={socialLinks}
      paymentLinks={socialLinks}
    />
  </AppContext.Provider>;
};

test("Footer testing", () => {
  jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "/",
        pathname: "/",
        query: "/",
        asPath: "/",
      };
    },
  }));

  render(
    <ContextProvider>
      <Footer
        heading={heading}
        subHeading={subHeading}
        subscriptionText={subscriptionText}
        socialIconText={socialIconText}
        footerLogo={footerLogo}
        footerLinks={footerLinksTest}
        socialLinks={socialLinks}
        paymentLinks={socialLinks}
      />
    </ContextProvider>
  );

  expect(screen.getByText(heading)).toBeInTheDocument();
  expect(screen.getByText(subHeading)).toBeInTheDocument();
  expect(screen.getByText(subscriptionText)).toBeInTheDocument();
  expect(screen.getByText(socialIconText)).toBeInTheDocument();

  const footerLink = screen.getAllByRole("footerLinks");
  expect(footerLink[0]).toBeInTheDocument();
  const icons = screen.getAllByRole("socialicons");
  expect(icons[0]).toBeInTheDocument();
  resizeWindow(375, 600);
});

test("render arabic version", () => {
  renderComponentAR();
});
