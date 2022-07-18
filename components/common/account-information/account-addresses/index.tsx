import Label from "components/common/ui/label";
import { AddressBookIcon, EditIcon } from "components/icons";
import React, { useEffect, useContext, useState, useRef } from "react";
import styles from "./address.module.scss";
import { AppContext } from "lib/context/index";
import Button from "components/common/ui/button";
import NewAddressModal from "./new-address-modal";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";

type addressPayload = {
  id?: string | number;
  name?: string;
  nickName?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  governorate?: string;
  country?: string;
  postalCode?: string;
  phoneNumber?: string;
  isDefault?: string;
  checkbox?: string;
};

const addressesData: addressPayload[] = [
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
  {
    id: "2",
    name: "Work Address",
    title: "Mrs",
    firstName: "person",
    lastName: "two",
    address: "address street lane something",
    city: "city",
    governorate: "2222",
    country: "Egypt",
    postalCode: "11111",
    phoneNumber: "123123123123",
    isDefault: "false",
  },
];

const AddressBook = ({
  addresses = addressesData,
}: {
  addresses?: addressPayload[];
}): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [addressData, setAddressData] = useState(addresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const selectedAddress: any = useRef({});
  const [width] = useWindowSize();
  const { t } = useTranslation("common");

  const getAddressData = async () => {
    // const addresses = await getAllAddresses('')
  };

  useEffect(() => {
    getAddressData();
  }, []);

  useEffect(() => {
    !modalOpen && setEditAddressModal(modalOpen);
  }, [modalOpen]);

  const createAddressPayload = (values: addressPayload) => {
    const payload: addressPayload = {
      id: Math.random() || "",
      name: values.nickName,
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      address: values.address,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      governorate: values.governorate,
      phoneNumber: "123123123123",
      isDefault: values.checkbox,
    };

    addresses.push(payload);
    setAddressData(addresses);
  };

  const updateAddress = (values: addressPayload) => {
    const payload: addressPayload = {
      id: selectedAddress.current.id,
      name: values.nickName,
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      address: values.address,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      governorate: values.governorate,
      phoneNumber: "123123123123s",
      isDefault: values.checkbox,
    };

    const index = addresses.findIndex(
      (address) => address.id === selectedAddress.current.id
    );
    addresses[index] = payload;
    setAddressData(addresses);
  };

  const deleteAddress = () => {
    const index = addresses.findIndex(
      (address) => address.id === selectedAddress.current.id
    );
    addresses.splice(index, 1);
    setAddressData(addresses);
  };

  return (
    <>
      <div className={styles["wrapper-address-book"]}>
        <div className={styles["address-heading"]}>
          <div className={styles["address-icon"]}>
            <AddressBookIcon />
          </div>
          <Label className={styles["label"]}>{t("AddressBook")}</Label>
          {addressData.length < 1 && width < desktopScreenSize ? (
            <div className={styles["div-message-mobile"]}>
              <p>
                You currently don’t have any saved delivery addresses. Add an
                address here to be prefilled for quicker checkout.
              </p>
            </div>
          ) : null}
          <div className={styles["div-add-address"]}>
            <Button
              buttonSize={"lr"}
              buttonText={t("AddNewAddress")}
              onClick={() => {
                setModalOpen(true);
              }}
            ></Button>
          </div>
        </div>
        {addressData.length < 1 && width > desktopScreenSize ? (
          <div className={styles["div-message"]}>
            <p>
              You currently don’t have any saved delivery addresses. Add an
              address here to be prefilled for quicker checkout.
            </p>
          </div>
        ) : null}
      </div>

      <div className={styles["wrapper-addresses"]}>
        {addressData.map((address, index) => {
          return (
            <div key={index} className={styles["div-address-single"]}>
              <div className={styles["div-address-heading"]}>
                <Label>{address.name}</Label>
              </div>
              <div className={styles["div-address-data"]}>
                <div className={styles["div-left"]}>
                  <Label>{`${address.firstName} ${address.lastName}`}</Label>
                  <Label>{`${address.address}`}</Label>
                  <Label>{`${address.city}, ${address.governorate}, ${address.postalCode}`}</Label>
                  <Label>{`${address.country}`}</Label>
                  <Label>{`T: ${address.phoneNumber}`}</Label>
                </div>
                <div className={styles["div-right"]}>
                  <div
                    className={styles["div-edit-button"]}
                    onClick={() => {
                      selectedAddress.current = address;
                      setEditAddressModal(true);
                      setModalOpen(true);
                    }}
                  >
                    <Button
                      buttonStyle="underline"
                      buttonText={t("Edit")}
                    ></Button>
                    <div>{width > desktopScreenSize ? <EditIcon /> : null}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <NewAddressModal
        address={selectedAddress.current}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        isEditAddress={editAddressModal}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      ></NewAddressModal>
    </>
  );
};

export default AddressBook;
