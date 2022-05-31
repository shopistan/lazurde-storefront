import React, { useState } from "react";
import styles from "./style.module.scss";
import Modal from "components/common/ui/modal";
import Label from "components/common/ui/label";
import { IconTick } from "components/icons";

interface NotifyMeModalProps {
  isOpened?: boolean;
  onClose?: Function;
}

const NotifyMeModal = ({
  isOpened = false,
  onClose = () => {},
}: NotifyMeModalProps): JSX.Element => {
  const [inputVal, setInputVal] = useState("");
  const [isNewsLetterSubscribe, setIsNewsLetterSubscribe] = useState(true);
  const [error, setError] = useState(false);

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
        bgBluryModal={true}
      >
        <div className={styles["notifyme-modal-body"]}>
          <Label className={styles["heading"]}>Product Not Available</Label>
          <Label className={styles["sub-heading"]}>
            We will notify you when this product becomes available.
          </Label>
          <div className={styles["form-wrapper"]}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles["form-input"]}>
                <Label className={styles["input-label"]}>Email or Phone</Label>
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
                  <span className={styles["error-msg"]}>{"required"}</span>
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
                  Register to our newsletter
                </label>
              </div>
              <div className={styles["submit-btn"]}>
                <button type="submit">notify me</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NotifyMeModal;
