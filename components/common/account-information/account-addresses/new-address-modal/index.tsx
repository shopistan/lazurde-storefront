import React, { useState, FC, useContext, useEffect } from "react";
import Image from "next/image";
import Label from "components/common/ui/label/index";
import Button from "components/common/ui/button/index";
import Modal from "components/common/ui/modal/index";
import styles from "./new-address-modal.module.scss";
import { ImageType } from "lib/types/common";
import CrossSmall from "components/icons/CrossSmall";
import Input from "components/common/ui/Input";
import Select from "components/common/ui/select";
import CheckBox from "components/common/ui/checkbox";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { AppContext } from "lib/context";

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

interface NewAddressModalProps {
  address: addressPayload;
  isOpen?: boolean;
  setIsOpen? : Function,
  isEditAddress: boolean,
  createAddressPayload: Function,
  updateAddress: Function,
  deleteAddress: Function,
}

const titleOptions = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Mrs",
    value: "Mrs",
  },
];

const governorateOptions = [
  {
    label: "31324",
    value: "31324",
  },
  {
    label: "1111",
    value: "2222",
  },
];

const CountryOptions = [
  {
    label: "Saudi Arabia",
    value: "Saudi Arabia",
  },
  {
    label: "UAE",
    value: "UAE",
  },
  {
    label: "Egypt",
    value: "Egypt",
  },
];

const NewAddressModal: FC<NewAddressModalProps> = ({
  address = {},
  isOpen = false,
  setIsOpen = () => {},
  isEditAddress = false,
  createAddressPayload = () => {},
  updateAddress = () => {},
  deleteAddress = () => {},
}) => {
  const [width] = useWindowSize();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { appState } = useContext(AppContext);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    nickName: Yup.string().required(
      appState?.lang === "en" ? "Enter nick name" : "مطلوب"
    ),
    firstName: Yup.string().required(
      appState?.lang === "en" ? "Enter first name" : "مطلوب"
    ),
    lastName: Yup.string().required(
      appState?.lang === "en" ? "Enter last name" : "مطلوب"
    ),
    address: Yup.string().required(
      appState?.lang === "en" ? "Enter address" : "مطلوب"
    ),
    title: Yup.string().required(
      appState?.lang === "en" ? "Select title" : "مطلوب"
    ),
    city: Yup.string().required(
      appState?.lang === "en" ? "Enter city" : "مطلوب"
    ),
    governorate: Yup.string().required(
      appState?.lang === "en" ? "Select governorate" : "مطلوب"
    ),
    country: Yup.string().required(
      appState?.lang === "en" ? "Select country" : "مطلوب"
    ),
    postalCode: Yup.string().required(
      appState?.lang === "en" ? "Enter postal code" : "مطلوب"
    ),
    // email: Yup.string()
    //   .email(appState?.lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ")
    //   .required(appState?.lang === "en" ? "Enter valid email" : "مطلوب"),
    // phoneNumber: Yup.string()
    //   .required(appState?.lang === "en" ? "Enter phone #" : "مطلوب")
    //   .matches(
    //     phoneRegExp,
    //     appState?.lang === "en"
    //       ? "Phone number is not valid"
    //       : "رقم الهاتف غير صالح"
    //   ),
  });

  useEffect(() => {
    isOpen && setShowDeleteDialog(false)
  }, [isOpen])

  return (
    <Modal
      modalBodyClassName={`${styles["new-address-modal"]} ${
        showDeleteDialog ? styles["delete-modal"] : ""
      }`}
      modalWidth={"562px"}
      modalHeight={showDeleteDialog ? "253px" : "619px"}
      isOpened={isOpen}
      onClose={() => {
        if (showDeleteDialog) {
          setShowDeleteDialog(false);
        } else {
          setIsOpen(false);
        }
      }}
      bgBluryModal={true}
    >
      <>
        <div
          className={styles["wrapper-new-address-form"]}
          data-show-data={!showDeleteDialog}
        >
          <div className={styles["div-form-heading"]}>
            <h2>{isEditAddress ? "Edit Address" : "Add New Address"}</h2>
          </div>
          {isOpen ? (
            <Formik
              enableReinitialize
              initialValues={{
                nickName: isEditAddress ? address.name : "",
                firstName: isEditAddress ? address.firstName : "",
                lastName: isEditAddress ? address.lastName : "",
                title: isEditAddress ? address.title : titleOptions[0].value,
                city: isEditAddress ? address.city : "",
                country: isEditAddress
                  ? address.country
                  : CountryOptions[0].value,
                postalCode: isEditAddress ? address.postalCode : "",
                governorate: isEditAddress
                  ? address.governorate
                  : governorateOptions[0].value,
                address: isEditAddress ? address.address : "",
                checkbox: isEditAddress ? address.isDefault : false,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (isEditAddress) {
                  updateAddress && updateAddress(values);
                } else {
                  createAddressPayload && createAddressPayload(values);
                }
                setSubmitting(false);
                setIsOpen(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }: any) => (
                <form onSubmit={handleSubmit}>
                  {/* <>{console.log("SOMETHING", errors, touched)}</> */}
                  <div className={styles["container-form"]}>
                    <div className={styles["div-top"]}>
                      <div>
                        <Input
                          label={"Nick Name"}
                          name={"nickName"}
                          value={values.nickName}
                          className={styles["address-input"]}
                          error={
                            errors.nickName &&
                            touched.nickName &&
                            errors.nickName
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <Select
                          showLabel={true}
                          label={"Title"}
                          name={"title"}
                          options={titleOptions}
                          defaultValue={values.title}
                          error={errors.title}
                          onChange={(value: {value: string}) => {
                            setFieldValue("title", value.value);
                          }}
                        ></Select>
                      </div>
                      <div
                        className={
                          width > desktopScreenSize
                            ? styles["div-two-columns"]
                            : styles["div-gap"]
                        }
                      >
                        <Input
                          label={"First Name"}
                          name={"firstName"}
                          value={values.firstName}
                          className={styles["address-input"]}
                          error={
                            errors.firstName &&
                            touched.firstName &&
                            errors.firstName
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Input
                          label={"Last Name"}
                          name={"lastName"}
                          value={values.lastName}
                          className={styles["address-input"]}
                          error={
                            errors.lastName &&
                            touched.lastName &&
                            errors.lastName
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <Input
                          label={"Street Address"}
                          name={"address"}
                          value={values.address}
                          className={styles["address-input"]}
                          error={
                            errors.address && touched.address && errors.address
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className={styles["div-two-columns"]}>
                        <Input
                          label={"City"}
                          name={"city"}
                          value={values.city}
                          className={styles["address-input"]}
                          error={errors.city && touched.city && errors.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Select
                          showLabel={true}
                          label={"Governorate"}
                          name={"governorate"}
                          options={governorateOptions}
                          defaultValue={values.governorate}
                          error={errors.governorate}
                          onChange={(value: {value: string}) => {
                            setFieldValue("governorate", value.value);
                          }}
                        ></Select>
                      </div>
                      <div>
                        <Select
                          showLabel={true}
                          label={"Country"}
                          name={"country"}
                          options={CountryOptions}
                          defaultValue={values.country}
                          error={errors.country}
                          onChange={(value: {value: string}) => {
                            setFieldValue("country", value.value);
                          }}
                        ></Select>
                      </div>
                      <div>
                        <Input
                          label={"Postal Code"}
                          name={"postalCode"}
                          value={values.postalCode}
                          className={styles["address-input"]}
                          error={
                            errors.postalCode &&
                            touched.postalCode &&
                            errors.postalCode
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className={styles["div-bottom"]}>
                      <div className={styles["div-checkbox"]}>
                        <CheckBox
                          className={styles["main-checkbox"]}
                          name={"checkbox"}
                          defaultChecked={values.checkbox}
                          label={"Make this my default shipping address"}
                          onChange={(value) => {
                            setFieldValue("checkbox", value);
                          }}
                        ></CheckBox>
                      </div>
                      <div className={styles["div-button"]}>
                        {isEditAddress ? (
                          <>
                            <Button
                              buttonSize={"xsm"}
                              buttonStyle="underline"
                              buttonText={"Delete"}
                              onClick={() => {
                                setShowDeleteDialog(true);
                              }}
                            ></Button>
                            <Button
                              type="submit"
                              buttonSize={"lr"}
                              buttonText={"Save"}
                            ></Button>
                          </>
                        ) : (
                          <Button
                            type="submit"
                            buttonSize={"lr"}
                            buttonText={"Add"}
                          ></Button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          ) : null}
        </div>

        {/* DELETE POPUP  */}
        <div
          className={`${styles["wrapper-new-address-form"]} ${styles["delete-popup"]}`}
          data-show-data={showDeleteDialog}
        >
          <div className={styles["div-form-heading"]}>
            <h2>Delete Delivery Address</h2>
          </div>
          <div className={styles["container-form"]}>
            <div className={styles["div-top"]}>
              <div className={styles["message-text"]}>
                Are you sure you want to delete this address? This action cannot
                be undone.
              </div>
            </div>
            <div className={styles["div-bottom"]}>
              <div className={styles["div-button"]}>
                <>
                  <Button
                    buttonSize={"xsm"}
                    buttonStyle="underline"
                    buttonText={"Cancel"}
                    onClick={() => {
                      setShowDeleteDialog(false);
                    }}
                  ></Button>
                  <Button
                    buttonSize={"lr"}
                    buttonText={"Delete"}
                    onClick={() => {
                      deleteAddress && deleteAddress();
                      setIsOpen(false);
                    }}
                  ></Button>
                </>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default NewAddressModal;
