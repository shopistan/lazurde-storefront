import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";

type SortingDataProps = {
  label: string;
  value: string;
};
interface SortingModalProps {
  sortingDataArray: SortingDataProps[];
  defaultValue?: string;
  selectedVal?: string;
  onChange?: Function;
}

const SortingModal = ({
  sortingDataArray = [],
  defaultValue = "",
  selectedVal = "",
  onChange = (value: string) => {},
}: SortingModalProps): JSX.Element => {
  const { appState } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(
    selectedVal || defaultValue
  );
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    const currentVal: {label: string} =
      sortingDataArray &&
      Array.isArray(sortingDataArray) &&
      sortingDataArray.length > 0
        ? sortingDataArray.find((item) => item.value === selectedValue)
        : { label: selectedLabel };

    setSelectedLabel(currentVal.label);
  }, [selectedValue]);

  return (
    <>
      <div className={styles["filter-heading"]}>
        <span>{appState?.lang === "en" ? "Sort By: " : "بسح فنص:"}</span>
        {selectedLabel}
      </div>
      <div className={styles["sorting-filter-wrapper"]}>
        {Array.isArray(sortingDataArray) &&
          sortingDataArray.length > 0 &&
          sortingDataArray?.map((data, index) => {
            return (
              <div
                className={styles["sorting-filter-item"]}
                key={index}
                onClick={() => {
                  setSelectedValue(data?.value);
                  onChange && onChange(data?.value);
                }}
                data-selected={data?.value === selectedValue}
              >
                <span>{data?.label}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SortingModal;
