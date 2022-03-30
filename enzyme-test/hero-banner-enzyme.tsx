// import React from "react";
// import { mount, shallow } from "enzyme";
// import LazurdeHeroBanner from "./index";
// import { screen, render } from "@testing-library/react";

// let products = [
//   {
//     title: "Apple",
//     description: "Good for health",
//     price: 10,
//   },
//   {
//     title: "Airpods",
//     description: "Good for hearing",
//     price: 10,
//   },
//   {
//     title: "Laptop",
//     description: "Good for education",
//     price: 10,
//   },
//   {
//     title: "Laptop",
//     description: "Good for education",
//     price: 10,
//   },
// ];

// const getComponent = (props: Object) => {
//   const component = mount(
//     <LazurdeHeroBanner
//       backgroundImage={{
//         url: "",
//         altText: "",
//       }}
//       bannerText={""}
//       buttonText={""}
//       buttonLink={""}
//       products={products}
//       {...props}
//     />
//   );
//   return {
//     component: component,
//   };
// };

// describe("Hero Banner", () => {
//   test("if component exists", () => {
//     const { component } = getComponent({
//       backgroundImage: {
//         url: "",
//         altText: "",
//       },
//       bannerText: "Welcome",
//       buttonText: "Get Started",
//       buttonLink: "Link",
//     });
//     // screen.debug();
//     // console.log(component.debug());
//     expect(component.find("h3").exists()).toBe(true);
//     expect(component.find("button").exists()).toBe(true);
//   });

//   it("should get the props", () => {
//     const { component } = getComponent({
//       backgroundImage: {
//         url: "",
//         altText: "Image",
//       },
//       bannerText: "Welcome to Lazurde",
//       buttonText: "Get Started",
//       buttonLink: "Link",
//     });
//     // console.log(component.debug());
//     expect(component.prop("bannerText")).toBe("Welcome to Lazurde");
//     expect(component.prop("buttonText")).toBe("Get Started");
//   });

//   it("should not be null in the props", () => {
//     const { component } = getComponent({
//       backgroundImage: {
//         url: "",
//         altText: "Image",
//       },
//       bannerText: "Welcome to Lazurde",
//       buttonText: "Get Started",
//       buttonLink: "Link",
//     });
//     // console.log(component.debug());
//     expect(component.props()).not.toBeNull();
//     expect(component.prop("bannerText")).not.toBeNull();
//     expect(component.prop("buttonText")).not.toBeNull();
//   });

//   it("should get the Object props", () => {
//     const { component } = getComponent({
//       backgroundImage: {
//         url: "",
//         altText: "Image",
//       },
//       bannerText: "Welcome to Lazurde",
//       buttonText: "Get Started",
//       buttonLink: "Link",
//     });
//     // console.log(component.debug());
//     expect(component.prop("backgroundImage")).toMatchObject({
//       url: "",
//       altText: "Image",
//     });
//   });

//   it("should render the right number of product cards", () => {
//     const { component } = getComponent({
//       backgroundImage: {
//         url: "",
//         altText: "Image",
//       },
//       bannerText: "Welcome to Lazurde",
//       buttonText: "Get Started",
//       buttonLink: "Link",
//     });
//     const children = component.find("div.product-card");
//     // console.log('children', children.debug())
//     expect(children).toHaveLength(products.length);
//   });
// });
