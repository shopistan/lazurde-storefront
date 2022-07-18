import Label from "components/common/ui/label";
import { EditIcon, PaymentMethodIcon } from "components/icons";
import React, { useEffect, useContext, useState, useRef } from "react";
import styles from "./payment-method.module.scss";
import { AppContext } from "lib/context/index";
import Button from "components/common/ui/button";
import { desktopScreenSize } from "lib/utils/common";
import useWindowSize from "lib/utils/useWindowSize";
import useTranslation from "next-translate/useTranslation";
import PaymentModal from "./payment-modal";
import {
  createCheckoutPaymentInstrument,
  createNewCheckoutCustomer,
  getCheckoutCustomerDetails,
  getCheckoutPaymentToken,
} from "lib/api/payment";
import { InstrumentProps, TokenProps } from "lib/types/common";
import { string } from "yup";

type addressPayload = {
  id?: string | number;
  title?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
  isDefault?: boolean;
};

const addressesData: addressPayload[] = [
  {
    id: "1",
    title: "Mr",
    firstName: "person",
    lastName: "one",
    isDefault: false,
  },
  {
    id: "2",
    title: "Mrs",
    firstName: "person",
    lastName: "two",
    isDefault: false,
  },
];

const PaymentMethod = ({
  addresses = addressesData,
}: {
  addresses?: addressPayload[];
}): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [addressData, setAddressData] = useState(addresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const selectedAddress: any = useRef({});
  const [width] = useWindowSize();
  const { t } = useTranslation("common");
  const userInfo: { email: string } = JSON.parse(
    window.localStorage.getItem("user_info")
  );

  const getCustomerData = async () => {
    if (typeof window === undefined) return;

    if (!userInfo) return;

    const customer = await getCheckoutCustomerDetails(userInfo?.email);

    if (!customer) return;

    setCustomerDetails(customer.data);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  useEffect(() => {
    !modalOpen && setEditAddressModal(modalOpen);
  }, [modalOpen]);

  const createAddressPayload = async (values: addressPayload) => {
    const cardNumber = values.cardNumber.replace(/-/g, '')

    let customerId = "";
    if (!customerDetails?.id) {
      const payload = {
        email: userInfo?.email,
        name: `${values.firstName} ${values.lastName}`,
      };
      const response = await createNewCheckoutCustomer(payload);
      customerId = response?.data?.id;
    } else {
      customerId = customerDetails?.id;
    }
    console.log("customerId", customerId, values);
    const expirySplit = values.expDate.split("/");
    const payload: TokenProps = {
      type: "card",
      number: cardNumber,
      expiry_month: Number(expirySplit[0]),
      expiry_year: Number(expirySplit[1]),
      name: `${values.firstName} ${values.lastName}`,
      cvv: values.cvv,
    };

    const response = await getCheckoutPaymentToken(payload);
    const token = response?.data?.token;

    const instrumentApiPayload: InstrumentProps = {
      type: "token",
      token: token,
      customer: {
        id: customerId,
        default: values.isDefault,
      },
    };

    const instrumentResponse = await createCheckoutPaymentInstrument(
      instrumentApiPayload
    );

    if (instrumentResponse) {
      getCustomerData();
    }

    
    // const payload: addressPayload = {
    //   id: Math.random() || "",
    //   name: values.nickName,
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   title: values.title,
    //   address: values.address,
    //   city: values.city,
    //   country: values.country,
    //   postalCode: values.postalCode,
    //   governorate: values.governorate,
    //   phoneNumber: "123123123123",
    //   isDefault: values.checkbox,
    // };

    // addresses.push(payload);
    // setAddressData(addresses);
  };

  const updateAddress = (values: addressPayload) => {
    const cardNumber = values.cardNumber.replace(/-/g, '')
    const payload: addressPayload = {
      id: selectedAddress.current.id,
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      isDefault: values.isDefault,
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
        <div className={styles["reviews-heading"]}>
          <PaymentMethodIcon />
          <Label className={styles["label"]}>{t("PaymentMethods")}</Label>
          {!customerDetails ||
          !customerDetails?.instruments ||
          (customerDetails.instruments.length < 1 &&
            width < desktopScreenSize) ? (
            <div className={styles["div-message-mobile"]}>
              <p>{t("NoMethodMessage")}</p>
            </div>
          ) : null}
          <div className={styles["div-add-address"]}>
            <Button
              buttonSize={"lr"}
              buttonText={t("AddNewMethod")}
              onClick={() => {
                setModalOpen(true);
              }}
            ></Button>
          </div>
        </div>
        {addressData.length < 1 && width > desktopScreenSize ? (
          <div className={styles["div-message"]}>
            <p>{t("NoMethodMessage")}</p>
          </div>
        ) : null}
      </div>

      <div className={styles["wrapper-addresses"]}>
        {customerDetails?.instruments?.length > 0 &&
          customerDetails?.instruments.map((paymentMethod: any, index: any) => {
            return (
              <div key={index} className={styles["div-address-single"]}>
                <div className={styles["div-address-heading"]}>
                  <Label>{paymentMethod?.scheme}</Label>
                </div>
                <div className={styles["div-address-data"]}>
                  <div className={styles["div-left"]}>
                    <Label>{`${paymentMethod?.name}`}</Label>
                    <Label>{`****-****-****-${paymentMethod?.last4}`}</Label>
                    <Label>{`${paymentMethod?.expiry_month}/${paymentMethod?.expiry_year}`}</Label>
                    <Label>{`${paymentMethod?.scheme}`}</Label>
                  </div>
                  <div className={styles["div-right"]}>
                    <div
                      className={styles["div-edit-button"]}
                      onClick={() => {
                        selectedAddress.current = paymentMethod;
                        setEditAddressModal(true);
                        setModalOpen(true);
                      }}
                    >
                      <Button
                        buttonStyle="underline"
                        buttonText={t("Edit")}
                      ></Button>
                      <div>
                        {width > desktopScreenSize ? <EditIcon /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <PaymentModal
        paymentMethod={selectedAddress.current}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        isEditAddress={editAddressModal}
        createAddressPayload={createAddressPayload}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      ></PaymentModal>
    </>
  );
};

export default PaymentMethod;
