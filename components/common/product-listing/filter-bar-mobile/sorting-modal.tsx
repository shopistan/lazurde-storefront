import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

const SortingModal = ({
  sortingDataArray = [],
  defaultValue = "",
  onChange = (value: string) => {},
}): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  return (
    <>
      <div className={styles["filter-heading"]}>
        <span>{appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}</span>
        {selectedValue}
      </div>
      <div className={styles["sorting-filter-wrapper"]}>
        {sortingDataArray.map((data, index) => {
          return (
            <div
              className={styles["sorting-filter-item"]}
              key={index}
              onClick={() => {
                setSelectedValue(data.value);
                onChange && onChange(data.value);
              }}
              data-selected={data.value === selectedValue}
            >
              <span>{data.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SortingModal;
