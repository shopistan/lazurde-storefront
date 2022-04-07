import styles from "./style.module.scss";

const LanguageSelector = () => {
  return (
    <div className={styles["language-selector__wrapper"]}>
      <div className={styles["language-selector__dropdown"]}>
        <select name="" id="">
          <option value="">ksa</option>
          <option value="">uae</option>
          <option value="">ksa</option>
        </select>
      </div>
      <div className={styles["language-selector__dropdown"]}>
        <select name="" id="">
          <option value="">ksa</option>
          <option value="">uae</option>
          <option value="">ksa</option>
        </select>
      </div>
    </div>
  );
};
export default LanguageSelector;
