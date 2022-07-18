import React from "react";
import { screen, render, fireEvent, act } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import NewAddressModal from "./index";

const addressesData = {
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
  checkbox: "false",
};

const setIsOpen = jest.fn();
const updateAddress = jest.fn();
const createAddressPayload = jest.fn();
const deleteAddress = jest.fn();

test("test with props", () => {
  render(
    <ContextProvider>
      <NewAddressModal
        address={addressesData}
        isOpen={true}
        setIsOpen={setIsOpen}
        isEditAddress={false}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      />
    </ContextProvider>
  );
});

test("add button event test", async () => {
  await act(async () => {
    render(
      <AppContext.Provider value={{ appState: { lang: "en" } }}>
        <NewAddressModal
          address={addressesData}
          isOpen={true}
          setIsOpen={setIsOpen}
          isEditAddress={false}
          createAddressPayload={createAddressPayload}
          updateAddress={updateAddress}
          deleteAddress={deleteAddress}
        />
      </AppContext.Provider>
    );

    const addButton = await screen.findByText("Add");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
  });
});

test("delete form button event test", () => {
  render(
    <ContextProvider>
      <NewAddressModal
        address={addressesData}
        isOpen={true}
        setIsOpen={setIsOpen}
        isEditAddress={false}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      />
    </ContextProvider>
  );

  const deleteButton = screen.getByText("Delete");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);
  const cancelButton = screen.getByText("Cancel");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
});

test("edit form button event test", async () => {
  await act(async () => {
    render(
      <ContextProvider>
        <NewAddressModal
          address={addressesData}
          isOpen={true}
          setIsOpen={setIsOpen}
          isEditAddress={true}
          createAddressPayload={createAddressPayload}
          updateAddress={updateAddress}
          deleteAddress={deleteAddress}
        />
      </ContextProvider>
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    const cancelButton = screen.getByText("Save");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
  });
});

test("render arabic version", () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <NewAddressModal
        address={addressesData}
        isOpen={true}
        setIsOpen={setIsOpen}
        isEditAddress={false}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      />
    </AppContext.Provider>
  );
});

test("render arabic version", () => {
  render(
    <AppContext.Provider value={{ appState: { lang: "ar" } }}>
      <NewAddressModal
        address={addressesData}
        isOpen={true}
        setIsOpen={setIsOpen}
        isEditAddress={true}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      />
    </AppContext.Provider>
  );
});
