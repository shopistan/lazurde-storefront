import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "./index";

const getComponent = (props: Object) => {
  const component = render(
    <ProductCard title="" description="" price={"1.5"} {...props} image={ {url: '', altText: ''}}/>
  );
  return {
    component: component,
  };
};

describe("Product Cart", () => {
  test("should render the elements", () => {
    const props = {
      title: "Airpods",
      description: "Airpods are used for listening",
      price: "30",
    }
    const { component } = getComponent(props);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  test("should have the elements", () => {
    const { component } = getComponent({
      title: "Airpods",
      description: "Airpods are used for listening",
      price: "30",
    });

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  test("should get the right porps", () => {
    const props = {
      title: "Airpods",
      description: "Airpods are used for listening",
      price: "30",
    }
    const { component } = getComponent(props);

    expect(screen.getByTestId('test-title')).toHaveTextContent(props.title);
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(props.price, {exact: false})).toBeInTheDocument();
  });

  test("should not get the null porps", () => {
    const props = {
      title: "",
      description: "",
      price: "30",
    }
    const { component } = getComponent(props);

    expect(screen.getByTestId('test-title')).toHaveTextContent('Title Here')
    expect(screen.getByText('Description Here')).toBeInTheDocument()
    expect(screen.getByText(0, {exact: false})).toBeInTheDocument()
  });
});
