import React, { useState, FC, useContext, useEffect } from "react";
import Button from "components/common/ui/button/index";
import Modal from "components/common/ui/modal/index";
import styles from "./payment-modal.module.scss";
import Input from "components/common/ui/Input";
import Select from "components/common/ui/select";
import CheckBox from "components/common/ui/checkbox";
import useWindowSize from "lib/utils/useWindowSize";
import { desktopScreenSize } from "lib/utils/common";

import { Formik } from "formik";
import * as Yup from "yup";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import CvvIcon from "components/icons/CvvIcon";

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

type formHeadingPayload = {
  title?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
  isDefault?: boolean;
};

type paymentModalHeadingProps = {
  add: string;
  edit: string;
  delete: string;
};

interface NewAddressModalProps {
  paymentMethod: formHeadingPayload;
  isOpen?: boolean;
  setIsOpen?: Function;
  isEditAddress: boolean;
  createAddressPayload: Function;
  updateAddress: Function;
  deleteAddress: Function;
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

const PaymentModal: FC<NewAddressModalProps> = ({
  paymentMethod = {},
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
  const { t } = useTranslation("common");

  const paymentModalHeading: paymentModalHeadingProps = t(
    "paymentModalHeading",
    {},
    { returnObjects: true }
  );
  const paymentFormHeadings: formHeadingPayload = t(
    "paymentFormHeadings",
    {},
    { returnObjects: true }
  );

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(
      appState?.lang === "en" ? "Enter first name" : "مطلوب"
    ),
    lastName: Yup.string().required(
      appState?.lang === "en" ? "Enter last name" : "مطلوب"
    ),
    title: Yup.string().required(
      appState?.lang === "en" ? "Select title" : "مطلوب"
    ),
    cardNumber: Yup.string().required(
      appState?.lang === "en" ? "Enter card number" : "مطلوب"
    ),
    expDate: Yup.string().required(
      appState?.lang === "en" ? "Enter expiration date" : "مطلوب"
    ),
    cvv: Yup.string().required(appState?.lang === "en" ? "Enter cvv" : "مطلوب"),
  });

  useEffect(() => {
    isOpen && setShowDeleteDialog(false);
  }, [isOpen]);

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
            <h2>
              {isEditAddress
                ? paymentModalHeading.edit
                : paymentModalHeading.add}
            </h2>
          </div>
          {isOpen ? (
            <Formik
              enableReinitialize
              initialValues={{
                title: isEditAddress ? paymentMethod.title : titleOptions[0].value,
                firstName: isEditAddress ? paymentMethod.firstName : "",
                lastName: isEditAddress ? paymentMethod.lastName : "",
                cardNumber: isEditAddress ? paymentMethod.cardNumber : "",
                expDate: isEditAddress ? paymentMethod.expDate : "",
                cvv: isEditAddress ? paymentMethod.cvv : "",
                checkbox: isEditAddress ? paymentMethod.isDefault : false,
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
                setFieldValue,
              }: any) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles["container-form"]}>
                    <div className={styles["div-top"]}>
                      <div>
                        <Select
                          showLabel={true}
                          label={t(paymentFormHeadings.title)}
                          name={"title"}
                          options={titleOptions}
                          defaultValue={values.title}
                          error={errors.title}
                          onChange={(value: { value: string }) => {
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
                          label={t(paymentFormHeadings.firstName)}
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
                          label={t(paymentFormHeadings.lastName)}
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
                          label={t(paymentFormHeadings.cardNumber)}
                          name={"cardNumber"}
                          value={values.cardNumber}
                          className={styles["address-input"]}
                          placeHolder={"****-****-****-****"}
                          error={
                            errors.cardNumber &&
                            touched.cardNumber &&
                            errors.cardNumber
                          }
                          onChange={(e) => {
                            let newVal = e.target.value.replace(/[^0-9-]/g, "");

                             let changedVal = newVal
                            if (newVal.length === 4) {
                              changedVal = `${newVal.substring(0, 4)}-`;
                            }
                            if (newVal.length === 9) {
                              changedVal = `${newVal.substring(0, 4)}-${newVal.substring(5, 9)}-`;
                            }
                            if (newVal.length === 14) {
                              changedVal = `${newVal.substring(0, 4)}-${newVal.substring(5, 9)}-${newVal.substring(10, 14)}-`;
                            }
                            if (newVal.length >= 18) {
                              changedVal = `${newVal.substring(0, 4)}-${newVal.substring(5, 9)}-${newVal.substring(10, 14)}-${newVal.substring(15, 19)}`;
                             
                            }

                            setFieldValue("cardNumber", changedVal);
                            // handleChange(e);
                           
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className={styles["div-two-columns"]}>
                        <Input
                          label={t(paymentFormHeadings.expDate)}
                          name={"expDate"}
                          value={values.expDate}
                          placeHolder={"MM/YYYY"}
                          className={styles["address-input"]}
                          error={
                            errors.expDate && touched.expDate && errors.expDate
                          }
                          onChange={(e) => {
                            const newVal = e.target.value
                              .replace(/[^0-9]/g, "")
                              .replace(/(\d{2})(\d)/, "$1/$2")
                              .substring(0, 7);

                            e.target.value = newVal;
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        <Input
                          label={t(paymentFormHeadings.cvv)}
                          name={"cvv"}
                          value={values.cvv}
                          placeHolder={"***"}
                          className={styles["address-input"]}
                          error={errors.cvv && touched.cvv && errors.cvv}
                          onChange={(e) => {
                            const newVal = e.target.value
                              .replace(/[^0-9]/g, "")
                              .substring(0, 3);

                            e.target.value = newVal;
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          inputIcon={<CvvIcon />}
                        />
                      </div>
                    </div>
                    <div className={styles["div-bottom"]}>
                      <div className={styles["div-checkbox"]}>
                        <CheckBox
                          className={styles["main-checkbox"]}
                          name={"checkbox"}
                          defaultChecked={values.checkbox}
                          label={t("CheckBoxPayment")}
                          onChange={(value) => {
                            setFieldValue("checkbox", value);
                          }}
                        />
                      </div>
                      <div className={styles["div-button"]}>
                        {isEditAddress ? (
                          <>
                            <Button
                              buttonSize={"xsm"}
                              buttonStyle="underline"
                              buttonText={t("Delete")}
                              onClick={() => {
                                setShowDeleteDialog(true);
                              }}
                            ></Button>
                            <Button
                              type="submit"
                              buttonSize={"lr"}
                              buttonText={t("Save")}
                            ></Button>
                          </>
                        ) : (
                          <Button
                            type="submit"
                            buttonSize={"lr"}
                            buttonText={t("Add")}
                            onClick={() => {
                              setTimeout(() => {
                                const errorList =
                                  document.getElementsByClassName(
                                    "div-error-msg"
                                  );

                                errorList &&
                                  errorList.length > 0 &&
                                  errorList[0].parentElement.scrollIntoView({
                                    behavior: "smooth",
                                  });
                              }, 300);
                            }}
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
            <h2>{paymentModalHeading.delete}</h2>
          </div>
          <div className={styles["container-form"]}>
            <div className={`${styles["div-top"]} ${styles["delete-form"]}`}>
              <div className={styles["message-text"]}>
                {t("DeleteAddressMessage")}
              </div>
            </div>
            <div className={`${styles["div-bottom"]} ${styles["delete-form"]}`}>
              <div className={styles["div-button"]}>
                <>
                  <Button
                    buttonSize={"xsm"}
                    buttonStyle="underline"
                    buttonText={t("Cancel")}
                    onClick={() => {
                      setShowDeleteDialog(false);
                    }}
                  ></Button>
                  <Button
                    buttonSize={"lr"}
                    buttonText={t("Delete")}
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

export default PaymentModal;
