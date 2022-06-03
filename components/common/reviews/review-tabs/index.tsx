import React, { useContext, useState } from "react";
import Label from "components/common/ui/label";
import styles from "./style.module.scss";
import { reviewFilters } from "lib/mock-data/data";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context/index";

interface ReviewTabsProps {
  onClick?: Function;
  className?: string;
}

interface ReviewsTabs {
  label?: string | "";
}

const ReviewTabs = ({
  onClick = () => {},
  className = "",
}: ReviewTabsProps): JSX.Element => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const arabicReviewTabs: ReviewsTabs[] = t(
    "reviewtabs",
    {},
    { returnObjects: true }
  );
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
                <Label>
                  {appState.lang == "en"
                    ? data?.label
                    : arabicReviewTabs[index].label}
                </Label>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ReviewTabs;
