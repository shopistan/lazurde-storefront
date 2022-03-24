import React from "react";
import LazurdeHeroBanner from "./index";
import { screen, render } from "@testing-library/react";

let products = [
  {
    title: "Apple",
    description: "Good for health",
    price: 10,
  },
  {
    title: "Airpods",
    description: "Good for hearing",
    price: 10,
  },
  {
    title: "Laptop",
    description: "Good for education",
    price: 10,
  },
  {
    title: "Laptop",
    description: "Good for education",
    price: 10,
  },
];

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
      products={products}
      {...props}
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
      bannerText: "Welcome",
      buttonText: "Get Started",
      buttonLink: "Link",
    }
    const { component } = getComponent(props);
    // screen.debug();
    // console.log(component.debug());
    expect(screen.getByRole("heading", {name: `${props.bannerText}`})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: `${props.buttonText}`})).toBeInTheDocument();
  });

  it("should get the props", () => {
    const props = {
      backgroundImage: {
        url: "",
        altText: "",
      },
      bannerText: "Welcome",
      buttonText: "Get Started",
      buttonLink: "Link",
    }
    const { component } = getComponent(props);
    // console.log(component.debug());
    expect(screen.getByText(props.bannerText)).toBeInTheDocument();
    expect(screen.getByText(props.buttonText)).toBeInTheDocument();
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
