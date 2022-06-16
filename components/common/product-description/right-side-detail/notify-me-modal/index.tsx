import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import Modal from "components/common/ui/modal";
import Label from "components/common/ui/label";
import { IconTick } from "components/icons";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

interface NotifyMeModalProps {
  isOpened?: boolean;
  onClose?: Function;
}

interface arabicLabelTypes {
  heading?: string;
  subHeading?: string;
  inputLabel?: string;
  checkboxLabel?: string;
  required?: string;
  submitbtn?: string;
}

const NotifyMeModal = ({
  isOpened = false,
  onClose = () => {},
}: NotifyMeModalProps): JSX.Element => {
  const [inputVal, setInputVal] = useState("");
  const [isNewsLetterSubscribe, setIsNewsLetterSubscribe] = useState(true);
  const [error, setError] = useState(false);
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const arabicData: arabicLabelTypes = t(
    "notifyModal",
    {},
    { returnObjects: true }
  );

  let isValidNum = false;
  let isValidEmail = false;

  const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    isValidNum = /^\d+$/.test(inputVal);
    isValidEmail = validateEmail(inputVal);
    if (isValidNum && !isValidEmail) {
      setError(false);
    } else if (!isValidNum && isValidEmail) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles["notifyme-modal_wrapper"]}>
      <Modal
        isOpened={isOpened}
        onClose={onClose}
        className={styles["notifyme-modal"]}
        modalBodyClassName={styles["notifyme-modal-content"]}
        bgBluryModal={true}
        modalWidth="562px"
        modalHeight="381px"
      >
        <div className={styles["notifyme-modal-body"]}>
          <Label className={styles["heading"]}>
            {appState?.lang === "en"
              ? "Product Not Available"
              : arabicData.heading}
          </Label>
          <Label className={styles["sub-heading"]}>
            {appState?.lang === "en"
              ? "We will notify you when this product becomes available."
              : arabicData.subHeading}
          </Label>
          <div className={styles["form-wrapper"]}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles["form-input"]}>
                <Label className={styles["input-label"]}>
                  {appState?.lang === "en"
                    ? "Email or Phone"
                    : arabicData.inputLabel}
                </Label>
                <input
                  type="text"
                  name="emailNumber"
                  placeholder="jane@gmail.com"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                  }}
                />
                {error && (
                  <span className={styles["error-msg"]}>
                    {appState?.lang === "en" ? "required" : arabicData.required}
                  </span>
                )}
              </div>
              <div className={styles["checkbox-wrapper"]}>
                <input
                  defaultChecked={isNewsLetterSubscribe}
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                  onChange={() => {
                    setIsNewsLetterSubscribe(!isNewsLetterSubscribe);
                  }}
                />
                <label
                  htmlFor="newsletter"
                  className={styles["checkbox-label"]}
                >
                  <span className={styles["checkbox-icon"]}>
                    <IconTick stroke="#fff" />
                  </span>
                  {appState?.lang === "en"
                    ? "Register to our newsletter"
                    : arabicData.checkboxLabel}
                </label>
              </div>
              <div className={styles["submit-btn"]}>
                <button type="submit">
                  {appState?.lang === "en" ? "notify me" : arabicData.submitbtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NotifyMeModal;
