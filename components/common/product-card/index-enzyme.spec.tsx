import React from "react";
import { mount, shallow } from "enzyme";
import ProductCard from "./index";

const getComponent = (props: Object) => {
  const component = mount(
    <ProductCard title="" description="" price={1.5} {...props} />
  );
  return {
    component: component,
  };
};

describe("Product Cart", () => {
  test("should render the elements", () => {
    const { component } = getComponent({
      title: "Airpods",
      description: "Airpods are used for listening",
      price: 30,
    });

    expect(component.props()).not.toBeNull();
  });

  test("should have the elements", () => {
    const { component } = getComponent({
      title: "Airpods",
      description: "Airpods are used for listening",
      price: 30,
    });

    expect(component.find("div.product-card").exists()).toBe(true);
  });

  it("should get the right porps", () => {
    const { component } = getComponent({
      title: "Airpods",
      description: "Airpods are used for listening",
      price: 30,
    });

    expect(component.prop("title")).toBe("Airpods");
    expect(component.prop("description")).toBe(
      "Airpods are used for listening"
    );
    expect(component.prop("price")).toBe(30);
  });

  it("should not get the null porps", () => {
    const { component } = getComponent({
      title: "Airpods",
      description: "Airpods are used for listening",
      price: 30,
    });

    expect(component.prop("title")).not.toBeNull();
    expect(component.prop("description")).not.toBeNull();
    expect(component.prop("title")).not.toBeNull();
  });
});
