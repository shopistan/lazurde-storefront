import React, { useState } from "react";
import styles from "./style.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Label from "components/common/ui/label";
import { writeReview } from "lib/utils/reviews";
import ImageUploader from "./image-uploader";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignupSchema = Yup.object().shape({
  review: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid"),
});

const ReviewForm = ({
  rating,
  productData = {},
}: any): JSX.Element => {
  const [fileUpload, setFileUpload] = useState<any>([{ fileArray: {} }]);

  const renderReviewApi = async (values: any) => {
    let formData: any = new FormData();
    formData.append("productId", productData && productData["itemId"]);
    formData.append("author", `${values?.firstName} ${values?.lastName}`);
    formData.append("email", values?.email);
    formData.append("location", "KSA");
    formData.append("reviewRating", rating ? rating : null);
    formData.append("reviewTitle", values?.review);
    formData.append("reviewMessage", values?.review);
    formData.append("reviewRecommendProduct", false);
    formData.append("productName", productData && productData["Product Title"]);
    formData.append("productSKU", productData && productData["sku"]);
    formData.append("productImageUrl", productData && productData["Image URL"]);
    formData.append("productUrl", productData && productData["Image URL"]);
    formData.append("reviewSource", "api");
    formData.append("photo0", null);
    formData.append("video0", null);

    const response = await writeReview(formData);
  };

  return (
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
            <div className={`${styles["field"]} ${styles["review-field"]}`}>
              <Label className={styles["field-label"]}>review</Label>
              <textarea
                name="review"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.review}
              />
              <div className={styles["error-msg"]}>
                {errors.review && touched.email && errors.email}
              </div>
            </div>
            <div className={styles["flex"]}>
              <div className={styles["field"]}>
                <Label className={styles["field-label"]}>first name</Label>
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
              <div className={styles["field"]}>
                <Label className={styles["field-label"]}>last name</Label>
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
            <div className={styles["field"]}>
              <Label className={styles["field-label"]}>email</Label>
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
            <div className={styles["field"]}>
              <Label className={styles["field-label"]}>mobile phone</Label>
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

            {/* <ImageUploader
              file={fileUpload?.fileArray}
              setFileUpload={setFileUpload}
            /> */}
            <div className={styles["submit-btn"]}>
              <button type="submit" disabled={isSubmitting}>
                post review
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default ReviewForm;
