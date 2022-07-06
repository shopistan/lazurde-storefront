import React, { FC, useState, useContext } from "react";
import { Formik } from "formik";
import Input from "components/common/ui/Input";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import { desktopScreenSize } from "lib/utils/common";
import { AppContext } from "lib/context";
import Button from "components/common/ui/button/index";
import useWindowSize from "lib/utils/useWindowSize";
import Image from "next/image";
import * as Yup from "yup";

type NewsletterSignupTypes = {
  backgroundImage: any;
  bannerBodyText: string;
  bannerText: string;
  heading?: string;
  upperText: string;
  lowerText: string;
};

// interface NewsletterSignupProps {
//   newsletterArray: NewsletterSignupTypes[];
// }

const NewsletterSignup: FC<NewsletterSignupTypes> = ({
  backgroundImage,
  bannerBodyText,
  bannerText,
  heading,
  upperText,
  lowerText,
}): JSX.Element => {
  const { t } = useTranslation("common");
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const mobileRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(
      appState?.lang === "en" ? "Enter first name" : "مطلوب"
    ),
    lastName: Yup.string().required(
      appState?.lang === "en" ? "Enter last name" : "مطلوب"
    ),
    email: Yup.string()
      .email(appState?.lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ")
      .required(appState?.lang === "en" ? "Enter valid email" : "مطلوب"),
    mobileNumber: Yup.string()
      .required(appState?.lang === "en" ? "Enter mobile #" : "مطلوب")
      .matches(
        mobileRegExp,
        appState?.lang === "en"
          ? "mobile number is not valid"
          : "رقم الهاتف غير صالح"
      ),
  });
  const renderValues = (values: any) => {
    const newsletterInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: values.mobileNumber,
      birthDate: values.birthDate,
    };
    console.log("newsletterInfo", newsletterInfo);
  };
  return (
    <>
      <div className={styles["hero-banner-wrapper"]}>
        <div className={styles["hero-banner-container"]}>
          <Image
            src={backgroundImage || "/screenshot-banner.png"}
            layout="fill"
            objectFit="cover"
            quality={100}
            className={`${styles["bg-image"]}`}
            alt=""
          />
          <div className={styles["banner-text-section"]}>
            <h3 className={styles["banner-text"]} data-testid="banner-text">
              {appState?.lang == "en" ? bannerText || "" : t("bannerText")}
            </h3>
            <h5 className={styles["sample-text"]} data-testid="bannerBodyText">
              {appState?.lang == "en"
                ? bannerBodyText || ""
                : t("bannerBodyText")}
            </h5>
          </div>
        </div>
      </div>
      <div className={styles["main-wrapper"]}>
        <div className={styles["heading-wrapper"]}>
          <p>{appState?.lang == "en" ? heading || "" : t("heading")}</p>
        </div>

        <div className={styles["text-wrapper"]}>
          <p>{appState?.lang == "en" ? upperText || "" : t("upperText")} </p>
        </div>

        <div className={styles["form-wrapper"]}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              mobileNumber: "",
              birthDate: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              renderValues(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }: // handleSubmit,
            // isSubmitting,
            any) => (
              <>
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
                      errors.firstName && touched.firstName && errors.firstName
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
                      errors.lastName && touched.lastName && errors.lastName
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className={styles["field-input"]}>
                  <div>
                    <Input
                      label={"Email"}
                      name={"email"}
                      value={values.email}
                      className={styles["address-input"]}
                      error={errors.email && touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className={styles["field-input"]}>
                  <div>
                    <Input
                      label={"Mobile Number"}
                      name={"mobileNumber"}
                      value={values.mobileNumber}
                      className={styles["address-input"]}
                      error={
                        errors.mobileNumber &&
                        touched.mobileNumber &&
                        errors.mobileNumber
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className={styles["field-input"]}>
                  <div>
                    <Input
                      label={"Date of Birth"}
                      name={"birthDate"}
                      type={"date"}
                      value={values.birthDate}
                      className={styles["address-input"]}
                      error={
                        errors.birthDate &&
                        touched.birthDate &&
                        errors.birthDate
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className={styles["signup-btn"]}>
                  <Button
                    type="submit"
                    buttonSize={"lr"}
                    buttonText={t("Sign Up")}
                    onClick={() => {
                      renderValues(values);
                    }}
                  ></Button>
                </div>
              </>
            )}
          </Formik>
        </div>
        <div className={styles["text-wrapper"]}>
          <p>{appState?.lang == "en" ? lowerText || "" : t("lowerText")} </p>
        </div>
      </div>
    </>
  );
};

export default NewsletterSignup;
