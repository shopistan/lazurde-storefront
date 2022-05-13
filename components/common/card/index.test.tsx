import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cards from "./index";

const cardImage = {
  url: "/",
  altText: "alt text",
};
const cardTitle = "card title";
const description = "card description";
const className = "card-class-name";
const width = 10;
const height = 10;
const color = "#000000";
const favIconSrc = {
  url: "/",
  altText: "alt text",
};
const bambuserBtnBody = <div className="test-bambuser-body">bambuser-body</div>;
const onClick = jest.fn();

test("card component", () => {
  render(
    <Cards
      cardImage={cardImage}
      cardTitle={cardTitle}
      description={description}
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      color={color}
      favIconSrc={favIconSrc}
      bambuserBtn={true}
      bambuserBtnBody={bambuserBtnBody}
    />
  );

  expect(screen.getByText(cardTitle)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByTestId("click-div")).toBeInTheDocument();
  expect(screen.getByTestId("bambuser-body")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("click-div"));
  expect(onClick).toBeCalled();
});

test("empty card", () => {
  const cardImage = {
    url: "",
    altText: "",
  };
  const cardTitle = "";
  const description = "";
  const className = "";

  const color = "";
  const favIconSrc = {
    url: "",
    altText: "",
  };

  <Cards
    cardImage={cardImage}
    cardTitle={cardTitle}
    description={description}
    className={className}
    width={width}
    height={height}
    color={color}
    favIconSrc={favIconSrc}
    bambuserBtn={false}
    bambuserBtnBody={null}
  />;
});
