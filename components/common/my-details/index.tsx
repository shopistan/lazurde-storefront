import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { AppContext } from "lib/context/index";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { UMS_IDENTITY_URL } from "general-config";
import ENDPOINTS from "lib/api/endpoints";
import { resetUserPassword } from "lib/identity";
import useWindowSize from "lib/utils/useWindowSize";

const MyDetails = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [size] = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [passwordShownFirst, setPasswordShownFirst] = useState(false);
  const [passwordShownSecond, setPasswordShownSecond] = useState(false);
  const [passwordShownThird, setPasswordShownThird] = useState(false);
  const [postFormData, setPostFormData] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formData, setFormData] = useState<any>({
    title: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    city: "",
    governorate: "",
    country: "",
    postalCode: "",
  });
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const authTokens = JSON.parse(window.localStorage.getItem("auth_tokens"));
      const { access_token = "" } = authTokens;

      const userInfoRes = await axios.get(
        `${UMS_IDENTITY_URL}${ENDPOINTS.IDENTITY.GET_USER_INFO}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("userInfoRes", userInfoRes.data);
      let userInfo = {
        email: userInfoRes.data.email,
        firstName: userInfoRes.data.firstName,
        lastName: userInfoRes.data.lastName,
        title: userInfoRes.data.meta.fabricCustomerTitle,
      };
      setFormData(userInfo);
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalPhone = () => {
    setIsOpenModal(true);
  };
  const closeModalPhone = () => {
    setIsOpenModal(false);
  };

  const togglePasswordFirst = () => {
    setPasswordShownFirst(!passwordShownFirst);
  };
  const togglePasswordSecond = () => {
    setPasswordShownSecond(!passwordShownSecond);
  };
  const togglePasswordThird = () => {
    setPasswordShownThird(!passwordShownThird);
  };
  const handleChangePassword = (e: any) => {
    setPostFormData({ ...postFormData, [e.target.name]: e.target.value });
  };
  const handleChangeFieldData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit--->>", postFormData);
    let res = await resetUserPassword(
      postFormData.oldPassword,
      postFormData.newPassword
    );
    // closeModal();
  };
  return (
    <>
      <div className={styles["account-mydetails-container"]}>
        <div className={styles["account-mydetails-heading-section"]}>
          <div className={styles["account-mydetails-icon"]}>
            <Image
              alt="icon"
              src={"/details.png"}
              width={20}
              height={20}
              layout="fixed"
            />
          </div>
          <div className={styles["account-mydetails-heading"]}>
            {appState?.lang == "en" ? "My Details" : t("تفاصيلي")}
          </div>
        </div>
        <div className={styles["account-mydetails-content-section"]}>
          <form className={styles["container-form"]}>
            <div className={styles["dropdown"]}>
              <label>{appState?.lang == "en" ? "Title" : t("عنوان")}</label>
              <br />
              <div
                className={
                  styles[
                    `${
                      appState?.lang == "en" ? "dropdownn1" : "arabicdropdownn1"
                    }`
                  ]
                }
              >
                <select
                  name="title"
                  value={formData.title}
                  className={styles["dropdownn"]}
                  onChange={(e) => handleChangePassword(e)}
                >
                  <option value={"Mrs."}>Mrs.</option>
                  <option value={"Mr."}>Mr.</option>
                </select>
                <Image
                  alt="icon"
                  src={"/dropdownIcon.png"}
                  width={20}
                  height={20}
                  layout="fixed"
                />
              </div>
            </div>

            <label>{appState?.lang == "en" ? "Email" : t("عنوان")}</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />

            <label>{appState?.lang == "en" ? "First Name" : t("عنوان")}</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />

            <label>{appState?.lang == "en" ? "Last Name" : t("عنوان")}</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />
            <div className={styles["Password"]}>
              <label>{appState?.lang == "en" ? "Password" : t("عنوان")}</label>
              <br />
              <div className={styles["password_flex"]}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChangePassword(e)}
                />
                <div className={styles["edit_div"]}>
                  <button type="button" onClick={openModal}>
                    {appState?.lang == "en" ? "Edit" : t("يحرر")}
                  </button>
                </div>
                <div className={styles["account-edit-icon"]}>
                  <Image
                    alt="icon"
                    src={"/pencil.png"}
                    width={20}
                    height={20}
                    layout="fixed"
                  />
                </div>
              </div>
            </div>
            <div className={styles["phone_number"]}>
              <label>
                {appState?.lang == "en" ? "Phone Number" : t("عنوان")}
              </label>
              <br />
              <div className={styles["phone_flex"]}>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChangePassword(e)}
                />
                <div className={styles["edit_div"]}>
                  <button type="button" onClick={openModalPhone}>
                    {appState?.lang == "en" ? "Edit" : t("يحرر")}
                  </button>
                </div>
                <div className={styles["account-edit-icon"]}>
                  <Image
                    alt="icon"
                    src={"/pencil.png"}
                    width={20}
                    height={20}
                    layout="fixed"
                  />
                </div>
              </div>
            </div>
            <label>
              {appState?.lang == "en" ? "Date of Birth" : t("عنوان")}
            </label>
            <br />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />

            <label>{appState?.lang == "en" ? "City" : t("عنوان")}</label>
            <br />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />

            <div>
              <label>
                {appState?.lang == "en" ? "Governorate" : t("عنوان")}
              </label>
              <br />
              <div
                className={
                  styles[
                    `${
                      appState?.lang == "en" ? "dropdownn2" : "arabicdropdownn2"
                    }`
                  ]
                }
              >
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={(e) => handleChangePassword(e)}
                >
                  <option value={"New York"}>New York</option>
                  <option value={"Dubai"}>Dubai</option>
                </select>
                <Image
                  alt="icon"
                  src={"/dropdownIcon.png"}
                  width={20}
                  height={20}
                  layout="fixed"
                />
              </div>
            </div>
            <div>
              <label>{appState?.lang == "en" ? "Country" : t("عنوان")}</label>
              <br />
              <div
                className={
                  styles[
                    `${
                      appState?.lang == "en" ? "dropdownn3" : "arabicdropdownn3"
                    }`
                  ]
                }
              >
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleChangePassword(e)}
                >
                  <option value={"Saudi Arabia"}>Saudi Arabia</option>
                  <option value={"UAE"}>UAE</option>
                  <option value={"Egypt"}>Egypt</option>
                </select>
                <Image
                  alt="icon"
                  src={"/dropdownIcon.png"}
                  width={20}
                  height={20}
                  layout="fixed"
                />
              </div>
            </div>

            <label>{appState?.lang == "en" ? "Postal Code" : t("عنوان")}</label>
            <br />
            <input
              type="number"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleChangePassword(e)}
            />
            <br />

            <div className={styles["button-dev"]}>
              <input
                className={styles["button"]}
                type="submit"
                value={appState?.lang == "en" ? "Save" : t("يحفظ")}
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        {isOpen && (
          <>
            <div className={styles["overlay"]}></div>
            <div className={styles["modal"]}>
              <header className={styles["modal__header"]}>
                <button onClick={closeModal} className={styles["close-button"]}>
                  <Image
                    alt="icon"
                    src={"/crossicon.png"}
                    width={12}
                    height={12}
                    layout="fixed"
                  />
                </button>
              </header>
              <div className={styles["main"]}>
                <div className={styles["main_section"]}>
                  <div>
                    <p className={styles["reset"]}>
                      {appState?.lang == "en" ? "Edit Password" : t("تفاصيلي")}
                    </p>
                  </div>
                  <div>
                    <form className={styles["signIn_form"]}>
                      <div
                        className={
                          styles[
                            `${
                              appState?.lang == "en" ? "input1" : "arabicInput1"
                            }`
                          ]
                        }
                      >
                        <label className={styles["signIn_Label"]}>
                          {appState?.lang == "en"
                            ? "Current Password"
                            : t("تفاصيلي")}
                        </label>
                        <br />
                        <input
                          className={styles["signIn_Input"]}
                          placeholder={
                            appState?.lang == "en" ? "Input" : t("تفاصيلي")
                          }
                          type={passwordShownFirst ? "text" : "password"}
                          name="oldPassword"
                          value={postFormData.oldPassword}
                          onChange={(e) => handleChangePassword(e)}
                          required
                        />

                        <Image
                          alt="icon"
                          src={"/passwordicon.png"}
                          width={20}
                          height={10}
                          layout="fixed"
                          onClick={togglePasswordFirst}
                        />

                        <br />
                        <br />
                      </div>
                      <div
                        className={
                          styles[
                            `${
                              appState?.lang == "en" ? "input2" : "arabicInput2"
                            }`
                          ]
                        }
                      >
                        <label className={styles["signIn_Label"]}>
                          {appState?.lang == "en"
                            ? "New Password"
                            : t("تفاصيلي")}
                        </label>
                        <br />
                        <input
                          className={styles["signIn_Input"]}
                          placeholder={
                            appState?.lang == "en" ? "Input" : t("تفاصيلي")
                          }
                          type={passwordShownSecond ? "text" : "password"}
                          value={postFormData.newPassword}
                          onChange={(e) => handleChangePassword(e)}
                          name="newPassword"
                          required
                        />

                        <Image
                          alt="icon"
                          src={"/passwordicon.png"}
                          width={20}
                          height={10}
                          layout="fixed"
                          onClick={togglePasswordSecond}
                        />

                        <br />
                        <br />
                      </div>
                      <div
                        className={
                          styles[
                            `${
                              appState?.lang == "en" ? "input3" : "arabicInput3"
                            }`
                          ]
                        }
                      >
                        <label className={styles["signIn_Label"]}>
                          {appState?.lang == "en"
                            ? "Confirm New Password"
                            : t("تفاصيلي")}
                        </label>
                        <br />
                        <input
                          className={styles["signIn_Input"]}
                          placeholder={
                            appState?.lang == "en" ? "Input" : t("تفاصيلي")
                          }
                          type={passwordShownThird ? "text" : "password"}
                          value={postFormData.confirmNewPassword}
                          onChange={(e) => handleChangePassword(e)}
                          name="confirmNewPassword"
                          required
                        />

                        <Image
                          alt="icon"
                          src={"/passwordicon.png"}
                          width={20}
                          height={10}
                          layout="fixed"
                          onClick={togglePasswordThird}
                        />
                      </div>
                      <div className={styles["password_req"]}>
                        <p>
                          {appState?.lang == "en"
                            ? "Password requirements:"
                            : t("تفاصيلي")}
                        </p>
                        <p>
                          {appState?.lang == "en"
                            ? "Minimum of 8 characters"
                            : t("8 أحرف على الأقل")}
                        </p>
                        <p>
                          {appState?.lang == "en"
                            ? "Uppercase, lowercase letters, and one number"
                            : t("الأحرف الكبيرة والصغيرة ورقم واحد")}
                        </p>
                      </div>
                      <div className={styles["signIn_button_div"]}>
                        <input
                          className={styles["signIn_button"]}
                          type="submit"
                          value={appState?.lang == "en" ? "Save" : t("يحفظ")}
                          onClick={() => handleSubmit()}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {isOpenModal && (
          <>
            <div className={styles["phone_overlay"]}></div>
            <div className={styles["phone_modal"]}>
              <header className={styles["phone_modal__header"]}>
                <button
                  onClick={closeModalPhone}
                  className={styles["phone_close-button"]}
                >
                  <Image
                    alt="icon"
                    src={"/crossicon.png"}
                    width={12}
                    height={12}
                    layout="fixed"
                  />
                </button>
              </header>
              <div className={styles["phone_main"]}>
                <div className={styles["phone_main_section"]}>
                  <div>
                    <p className={styles["phone_reset"]}>
                      {appState?.lang == "en"
                        ? "Verify Your Mobile Number "
                        : t("تحقق من رقم هاتفك المحمول")}
                    </p>
                    <p className={styles["phone_reset_para"]}>
                      {appState?.lang == "en"
                        ? "For added security, we need to send you a one-time verification code to better ensure our product lands in the hands of our consumers."
                        : t(
                            "لمزيد من الأمان ، نحتاج إلى إرسال رمز تحقق لمرة واحدة لك لضمان وصول منتجاتنا إلى أيدي عملائنا بشكل أفضل."
                          )}
                    </p>
                  </div>
                  <form className={styles["phone_signIn_form"]}>
                    <div className={styles["phone_input1"]}>
                      <label className={styles["phone_signIn_Label"]}>
                        {appState?.lang == "en"
                          ? "Mobile Number"
                          : t("تفاصيلي")}
                      </label>
                      <br />
                      <div className={styles["phone_Input1_dev"]}>
                        <input
                          className={styles["phone_signIn_Input"]}
                          placeholder={
                            appState?.lang == "en" ? "Input" : t("تفاصيلي")
                          }
                          type="tel"
                          name="phoneNumber"
                          value={"+96 123456789"}
                          onChange={() => {}}
                          required
                        />
                        <button
                          className={
                            styles[
                              `${
                                appState?.lang == "en"
                                  ? "send_code_button"
                                  : "arabicsend_code_button"
                              }`
                            ]
                          }
                        >
                          {size > 768
                            ? appState?.lang == "en"
                              ? "Send Code"
                              : t("تفاصيلي")
                            : appState?.lang == "en"
                            ? "Send"
                            : t("تفاصيلي")}
                        </button>
                      </div>
                    </div>
                    <div className={styles["phone_input2"]}>
                      <label className={styles["phone_signIn_Label"]}>
                        {appState?.lang == "en" ? "Enter Code" : t("تفاصيلي")}
                      </label>
                      <br />
                      <input
                        className={styles["phone_signIn_Input"]}
                        placeholder={
                          appState?.lang == "en" ? "Enter Code" : t("تفاصيلي")
                        }
                        type="text"
                        value={""}
                        onChange={() => {}}
                        name="code"
                        required
                      />
                    </div>
                    <p className={styles["information_para"]}>
                      {appState?.lang == "en"
                        ? "You will receive your code momentarily. You may experience a delay if there are issues with your wireless provider. Msg&Data rates may apply. If you’ve previously unsubscribed, reply START to 73067 to opt back in to mobile verification."
                        : t(
                            "تفسوف تتلقى الرمز الخاص بك على الفور. قد تواجه تأخيرًا إذا كانت هناك مشكلات مع مزود الخدمة اللاسلكية. قد يتم تطبيق معدلات الرسائل والبيانات. إذا كنت قد ألغيت الاشتراك من قبل ، فأرسل START إلى 73067 لإعادة الاشتراك في التحقق عبر الهاتف المحمول.اصيلي"
                          )}
                    </p>
                    <div className={styles["Checkbox"]}>
                      <input type="checkbox" name="agreeCheckbox" value="" />
                      <p>
                        {appState?.lang == "en"
                          ? "I agree to receive one SMS message to verify my device, and to L’azurde"
                          : t(
                              "أوافق على تلقي رسالة واحدة للتحقق من جهازي ، وعلى L’azurde"
                            )}
                      </p>
                    </div>
                    <div className={styles["phone_signIn_button_div"]}>
                      <input
                        className={styles["phone_signIn_button"]}
                        type="submit"
                        value={appState?.lang == "en" ? "Continue" : t("يكمل")}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyDetails;
