import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import AddressBook from "./index";

const addressesData = [
  {
    id: "1",
    name: "Home Address",
    title: "Mr",
    firstName: "person",
    lastName: "one",
    address: "address street lane something",
    city: "city",
    governorate: "31324",
    country: "Saudi Arabia",
    postalCode: "11111",
    phoneNumber: "123123123123",
    isDefault: "false",
  },
];

test("test with props", () => {
  render(
    <ContextProvider>
      <AddressBook addresses={addressesData} />
    </ContextProvider>
  );
  expect(screen.getByText(/Home Address/i)).toBeInTheDocument();
  expect(screen.getByText(/person/i)).toBeInTheDocument();
  expect(screen.getByText(/one/i)).toBeInTheDocument();
  expect(
    screen.getByText(/address street lane something/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/city/i)).toBeInTheDocument();
  expect(screen.getByText(/31324/i)).toBeInTheDocument();
  expect(screen.getByText(/Saudi Arabia/i)).toBeInTheDocument();
  expect(screen.getByText(/11111/i)).toBeInTheDocument();
  expect(screen.getByText(/123123123123/i)).toBeInTheDocument();
});

test("add button event test", async () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "en" } }}>
      <AddressBook addresses={addressesData} />
    </AppContext.Provider>
  );

  const editButton = await screen.findByText(/AddNewAddress/i);
  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);
});

test("edit button event test", () => {
  render(
    <ContextProvider>
      <AddressBook addresses={addressesData} />
    </ContextProvider>
  );

  const editButton = screen.getByText(/edit/i).closest("div");
  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);
});

test("test without props", () => {
  render(
    <ContextProvider>
      <AddressBook addresses={[]} />
    </ContextProvider>
  );
  expect(
    screen.getByText(
      /You currently don’t have any saved delivery addresses. Add an address here to be prefilled for quicker checkout./i
    )
  ).toBeInTheDocument();
});

test("render arabic version", () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <AddressBook addresses={addressesData} />
    </AppContext.Provider>
  );
});
