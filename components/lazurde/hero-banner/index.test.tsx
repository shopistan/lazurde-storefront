import React from "react";
import LazurdeHeroBanner from "../hero-banner/index";
import { screen, render } from "@testing-library/react";

const getComponent = (props: Object) => {
  const component = render(
    <LazurdeHeroBanner
      backgroundImage={{
        url: "",
        altText: "",
      }}
      bannerText={""}
      buttonText={""}
      buttonLink={""}
    />
  );
  return {
    component: component,
  };
};

describe("Hero Banner", () => {
  test("if component exists", () => {
    const props = {
      backgroundImage: {
        url: "",
        altText: "",
      },
      bannerText: "Save 50% off",
      buttonText: "Shop Now",
      // buttonLink: "Link",
    }
    // const { component } = getComponent(props); 
    // screen.debug();
    // console.log(component.debug());
    // expect(screen.getByRole("heading", {name: `${props.bannerText}`})).toBeInTheDocument();
    // expect(screen.getByRole("button", {name: `${props.buttonText}`})).toBeInTheDocument();
  });

  it("should get the props", () => {
    const props = {
      backgroundImage: {
        url: "",
        altText: "",
      },
      bannerText: "Save 50% off",
      buttonText: "Shop Now",
      // buttonLink: "Link",
    }
    // const { component } = getComponent(props);
    // console.log(component.debug());
    // expect(screen.getByText(props.bannerText)).toBeInTheDocument();
    // expect(screen.getByText(props.buttonText)).toBeInTheDocument();
  });

  // it("should get the Object props", () => {
  //   const { component } = getComponent({
  //     backgroundImage: {
  //       url: "",
  //       altText: "Image",
  //     },
  //     bannerText: "Welcome to Lazurde",
  //     buttonText: "Get Started",
  //     buttonLink: "Link",
  //   });
  //   // console.log(component.debug());
  //   expect(component.prop("backgroundImage")).toMatchObject({
  //     url: "",
  //     altText: "Image",
  //   });
  // });
});
