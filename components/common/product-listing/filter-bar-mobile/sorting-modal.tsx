import React, { useState } from "react";
import styles from "./style.module.scss";

const SortingModal = ({
  sortingDataArray = [],
  defaultValue = "",
  onChange = (value: string) => {},
}): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  return (
    <>
      <div className={styles["filter-heading"]}>
        <span>Sort By:</span>
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
