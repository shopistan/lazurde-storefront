import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "lib/context";
import styles from "./style.module.scss";
import Select from "../ui/select";

type optionProps = { label: string; value: string };
const stockInfo = [
  {
    label: "Share Overview",
    value: "Share Overview",
  },
  {
    label: "Share Alerts",
    value: "Share Alerts",
  },
  {
    label: "Share Graph",
    value: "Share Graph",
  },
  {
    label: "Investment Calculator",
    value: "Investment Calculator",
  },
  {
    label: "Share Price Look-Up",
    value: "Share Price Look-Up",
  },
];

const stockInfoArabic = [
  {
    label: "نظرة عامة على حصة",
    value: "نظرة عامة على حصة",
  },
  {
    label: "تنبيهات المشاركة",
    value: "تنبيهات المشاركة",
  },
  {
    label: "مشاركة الرسم البياني",
    value: "مشاركة الرسم البياني",
  },
  {
    label: "حاسبة الاستثمار",
    value: "حاسبة الاستثمار",
  },
  {
    label: "البحث عن سعر السهم",
    value: "البحث عن سعر السهم",
  },
];

const InfoSelector = ({
  className = "",
  mainWrapperClass = "",
  optionClassName = "",
  setSelectedVal = () => {},
}: {
  className?: string;
  mainWrapperClass?: string;
  optionClassName?: string;
  setSelectedVal: Function;
}): JSX.Element => {
  
  const onStockChange = (selectedData: optionProps) => {
    setSelectedVal(selectedData.value);
  };
  const { appState } = useContext(AppContext);
  return (
    <div
      data-testid={"main-wrapper"}
      className={`${styles["info-selector"]} ${mainWrapperClass}`}
    >
      <Select
        options={appState.lang === "en" ? stockInfo : stockInfoArabic}
        onChange={onStockChange}
        defaultValue={
          appState.lang === "en" ? stockInfo[0].value : stockInfoArabic[0].value
        }
        className={className}
        optionClassName={optionClassName}
      ></Select>
    </div>
  );
};
export default InfoSelector;
