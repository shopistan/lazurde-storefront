import React, { FC, useState, useContext } from "react";
import { Formik } from "formik";
import Modal from "../ui/modal";
import Label from "../ui/label";
import Button from "components/common/ui/button/index";
import styles from "./feedback-popup.module.scss";
import CrossSmall from "components/icons/CrossSmall";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import * as Yup from "yup";

interface FeedbackPopUpProps {
  open?: boolean;
  heading?: string;
  onClose?: Function;
}

const FeedbackPopUp: FC<FeedbackPopUpProps> = ({
  heading = "",
  open = false,
  onClose,
}) => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const SignupSchema = Yup.object().shape({
    feedback: Yup.string().required(
      appState?.lang === "en" ? "Enter feedback" : "مطلوب"
    ),
    firstName: Yup.string().required(
      appState?.lang === "en" ? "Enter first name" : "مطلوب"
    ),
    lastName: Yup.string().required(
      appState?.lang === "en" ? "Enter last name" : "مطلوب"
    ),
    email: Yup.string()
      .email(appState?.lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ")
      .required(appState?.lang === "en" ? "Enter valid email" : "مطلوب"),
    phoneNumber: Yup.string()
      .required(appState?.lang === "en" ? "Enter phone #" : "مطلوب")
      .matches(
        phoneRegExp,
        appState?.lang === "en"
          ? "Phone number is not valid"
          : "رقم الهاتف غير صالح"
      ),
  });
  return (
    <Modal
      modalBodyClassName={styles["feedback-modalBody"]}
      divModalRight={styles["div-rightModal"]}
      divModalBody={styles["div-feedbackBody"]}
      divTopBar={styles["div-topBar"]}
      isOpened={open}
      onClose={() => {
        onClose();
      }}
      className={styles["feedback-modal"]}
    >
      <div className={styles["feedback-container"]}>
        <div
          className={styles["cross-icon"]}
          onClick={() => {
            onClose();
          }}
        >
          <CrossSmall />
        </div>
        <Label className={styles["heading"]}>
          {appState.lang === "en" ? heading : t("feedbackHeading")}
        </Label>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            feedback: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles["name-section"]}>
                <div
                  className={`${styles["first-name"]} ${styles["input-field"]}`}
                >
                  <Label className={styles["title"]}>
                    {appState.lang === "en" ? "First Name" : t("firstName")}
                  </Label>
                  <input
                    className={`${styles["input"]} ${
                      errors.firstName && touched.firstName && styles["errors"]
                    }`}
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <div className={styles["error-msg"]}>
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className={`${styles["last-name"]}`}>
                  <Label className={styles["title"]}>
                    {appState.lang === "en" ? "Last Name" : t("lastName")}
                  </Label>
                  <input
                    className={`${styles["input"]} ${
                      errors.lastName && touched.lastName && styles["errors"]
                    }`}
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <div className={styles["error-msg"]}>
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Email" : t("email")}
                </Label>
                <input
                  className={`${styles["input"]} ${
                    errors.email && touched.email && styles["errors"]
                  }`}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className={styles["error-msg"]}>
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Phone Number" : t("phoneNumber")}
                </Label>
                <input
                  className={`${styles["input"]} ${
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    styles["errors"]
                  }`}
                  type="number"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                <div className={styles["error-msg"]}>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </div>
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Feedback" : t("feedback")}
                </Label>
                <input
                  className={` ${
                    errors.feedback && touched.feedback && styles["errors"]
                  } ${styles["feedback-input"]}`}
                  type="text"
                  name="feedback"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.feedback}
                />
                <div className={styles["error-msg"]}>
                  {errors.feedback && touched.feedback && errors.feedback}
                </div>
              </div>
              <Button
                onClick={() => {
                  if (
                    errors.firstName &&
                    errors.lastName &&
                    errors.email &&
                    errors.phoneNumber &&
                    errors.feedback
                  ) {
                    console.log("error");
                  } else {
                    onClose();
                  }
                }}
                className={styles["button"]}
                type="submit"
              >
                {appState.lang === "en" ? "Send" : t("send")}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default FeedbackPopUp;
