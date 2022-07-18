import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./index";
import ContextProvider, { AppContext } from "lib/context";
import { act } from "react-dom/test-utils";

const selectorOption = [
  {
    label: "label",
    img: "",
    value: "value",
    langTitle: "lang title",
  },
  {
    label: "label two",
    img: "",
    value: "value two",
    langTitle: "lang title",
  },
];
const onChange = jest.fn();
const defaultValue = "default value";

const renderComponent = async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <LanguageSelector
          options={selectorOption}
          onChange={onChange}
          defaultValue={defaultValue}
          iconWidth={32}
        />
      </ContextProvider>
    );
  });
};

const renderComponentAR = async () => {
  await act(async () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "ar" } }}>
        <LanguageSelector
          options={selectorOption}
          onChange={onChange}
          defaultValue={defaultValue}
          iconWidth={32}
        />
      </AppContext.Provider>
    );
  });
};

test("language selector Testing", () => {
  renderComponent();

  expect(selectorOption).toHaveLength(2);
  expect(selectorOption).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        label: "label",
        img: "",
        value: "value",
        langTitle: "lang title",
      }),
      expect.objectContaining({
        label: "label two",
        img: "",
        value: "value two",
        langTitle: "lang title",
      }),
    ])
  );
  const mainWrapper = screen.getByRole("main-wrapper");
  expect(mainWrapper).toBeInTheDocument();
  fireEvent.click(mainWrapper);
  const wrapper = screen.getByRole("wrapper");
  expect(wrapper).toBeInTheDocument();
  fireEvent.blur(wrapper);
  const listItem = screen.getAllByRole("list-item");
  expect(listItem[0]).toBeInTheDocument();
  fireEvent.click(listItem[0]);
  const optionLabel = screen.getAllByRole("option-label");
  expect(optionLabel[0]).toBeInTheDocument();
  const optionTitle = screen.getAllByRole("option-title");
  expect(optionTitle[0]).toBeInTheDocument();
});

test("language selector arabic version Testing", () => {
  renderComponentAR();
});
