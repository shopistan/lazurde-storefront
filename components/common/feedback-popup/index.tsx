import React, { FC, useState, useContext } from "react";
import { Formik } from "formik";
import Modal from "../ui/modal";
import Label from "../ui/label";
import Button from "components/common/ui/button/index";
import styles from "./feedback-popup.module.scss";
import CrossSmall from "components/icons/CrossSmall";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
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
                    className={styles["input"]}
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
                <div className={`${styles["last-name"]}`}>
                  <Label className={styles["title"]}>
                    {appState.lang === "en" ? "Last Name" : t("lastName")}
                  </Label>
                  <input
                    className={styles["input"]}
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Email" : t("email")}
                </Label>
                <input
                  className={styles["input"]}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Phone Number" : t("phoneNumber")}
                </Label>
                <input
                  className={styles["input"]}
                  type="number"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </div>
              <div className={styles["input-field"]}>
                <Label className={styles["title"]}>
                  {appState.lang === "en" ? "Feedback" : t("feedback")}
                </Label>
                <input
                  className={styles["input"]}
                  type="text"
                  name="feedback"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.feedback}
                />
                {errors.feedback && touched.feedback && errors.feedback}
              </div>
              <Button className={styles["button"]} type="submit">
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
