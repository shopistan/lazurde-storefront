import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../style.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Label from "components/common/ui/label";
import { writeReview } from "lib/utils/reviews";
import ImageUploader from "components/common/reviews/write-review/image-uploader/image-uploader";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface arabicLabelTypes {
  reviewLabel?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  submitBtnText?: string;
  reviewImagesRef?: any;
}

const ReviewForm = ({
  rating,
  productData = {},
  onClose,
  setIsRatingError,
  reviewImagesRef,
}: any): JSX.Element => {
  const [fileUpload, setFileUpload] = useState<any>([{ fileArray: {} }]);
  const [fileName, setFileName] = useState<any>([]);
  const { appState, setIsFetchingReview } = useContext(AppContext);
  const { t } = useTranslation("common");
  const arabicLabels: arabicLabelTypes = t(
    "reviewFormData",
    {},
    { returnObjects: true }
  );

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const SignupSchema = Yup.object().shape({
    review: Yup.string().required(
      appState?.lang === "en" ? "Enter reviews" : "مطلوب"
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

  const renderReviewApi = async (values: any) => {
    let formData: any = new FormData();
    formData.append("productId", productData && productData["itemId"]);
    formData.append("author", `${values?.firstName} ${values?.lastName}`);
    formData.append("email", values?.email);
    formData.append("location", appState?.region);
    formData.append("reviewRating", rating ? rating : null);
    formData.append("reviewTitle", values?.review);
    formData.append("reviewMessage", values?.review);
    formData.append("reviewRecommendProduct", false);
    formData.append("productName", productData && productData["Product Title"]);
    formData.append("productSKU", productData && productData["sku"]);
    formData.append("productImageUrl", productData && productData["Image URL"]);
    formData.append("productUrl", productData && productData["Image URL"]);
    formData.append("reviewSource", "api");
    fileName.forEach((fileName: any, index: number) => {
      formData.append(`photo${index}`, fileName);
    });
    formData.append("video0", null);

    const id = Math.floor(Math.random() * 100 + 1);
    if (rating === 0) {
      setIsRatingError && setIsRatingError("Please Add Rating");
      document
        ?.getElementById("rating-stars")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsRatingError && setIsRatingError("");
      const response = await writeReview(formData);
      if (response?.hasError === false) {
        setIsRatingError && setIsRatingError("");
        setIsFetchingReview(true);
        setTimeout(() => {
          onClose && onClose();
        }, 2000);
      } else {
        setIsRatingError && setIsRatingError("Network Error");
      }
    }
  };

  return (
    <>
      <div className={styles["form-wrapper"]}>
        <Formik
          initialValues={{
            review: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            renderReviewApi(values);
            setSubmitting(false);
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
          }: any) => (
            <form onSubmit={handleSubmit}>
              <div
                className={`${styles["field"]} ${styles["review-field"]}  ${
                  errors.review && touched.review && styles["errors"]
                }`}
              >
                <Label className={styles["field-label"]}>
                  {appState?.lang === "en"
                    ? "review"
                    : arabicLabels?.reviewLabel}
                </Label>
                <textarea
                  name="review"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.review}
                />
                <div className={`${styles["error-msg"]}`}>
                  {errors.review && touched.review && errors.review}
                </div>
              </div>
              <div className={styles["flex"]}>
                <div
                  className={`${styles["field"]} ${
                    errors.firstName && touched.firstName && styles["errors"]
                  }`}
                >
                  <Label className={styles["field-label"]}>
                    {appState?.lang === "en"
                      ? "first name"
                      : arabicLabels?.firstName}
                  </Label>
                  <input
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
                <div
                  className={`${styles["field"]} ${
                    errors.lastName && touched.lastName && styles["errors"]
                  }`}
                >
                  <Label className={styles["field-label"]}>
                    {appState?.lang === "en"
                      ? "last name"
                      : arabicLabels?.lastName}
                  </Label>
                  <input
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
              <div
                className={`${styles["field"]} ${
                  errors.email && touched.email && styles["errors"]
                }`}
              >
                <Label className={styles["field-label"]}>
                  {appState?.lang === "en" ? "email" : arabicLabels?.email}
                </Label>
                <input
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
              <div
                className={`${styles["field"]} ${
                  errors.phoneNumber && touched.phoneNumber && styles["errors"]
                }`}
              >
                <Label className={styles["field-label"]}>
                  {appState?.lang === "en"
                    ? "mobile phone"
                    : arabicLabels?.phoneNumber}
                </Label>
                <input
                  type="string"
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

              <ImageUploader
                file={fileUpload?.fileArray}
                setFileUpload={setFileUpload}
                setFileName={setFileName}
                uploadedFiles={fileName}
                imageUploadRef={reviewImagesRef}
              />
              <div className={styles["submit-btn"]}>
                <button type="submit" disabled={isSubmitting}>
                  {appState?.lang === "en"
                    ? "post review"
                    : arabicLabels?.submitBtnText}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default ReviewForm;
