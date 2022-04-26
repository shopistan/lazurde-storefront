import React, { useState } from "react";

const SortingModal = ({
  sortingDataArray = [],
  defaultValue = "",
  onChange = (value: string) => {},
}): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  return (
    <>
      <div>Sort By: {selectedValue}</div>
      {sortingDataArray.map((data, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setSelectedValue(data.value);
              onChange && onChange(data.value)
            }}
            data-selected={data.value === selectedValue}
          >
            <span>{data.label}</span>
          </div>
        );
      })}
    </>
  );
};

export default SortingModal;
