import Label from "components/common/ui/label";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { reviewFilters } from "lib/mock-data/data";

interface ReviewTabsProps {
  onClick?: Function;
  className?: string;
}

const ReviewTabs = ({
  onClick = () => {},
  className = "",
}: ReviewTabsProps): JSX.Element => {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className={`${styles["tab-wrapper"]} ${className}`}>
        {reviewFilters &&
          reviewFilters.length > 0 &&
          reviewFilters?.map((data, index) => {
            return (
              <div
                key={index}
                className={`${styles["tab-item"]} ${
                  active === index ? styles["active"] : ""
                }`}
                onClick={() => {
                  onClick && onClick(data);
                  setActive(index);
                }}
              >
                <Label>{data?.label}</Label>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ReviewTabs;
