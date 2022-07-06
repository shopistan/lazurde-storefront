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

const financialInfo = [
  {
    label: "Quarterly Financial Statements",
    value: "Quarterly Financial Statements",
  },
  {
    label: "Annual Report",
    value: "Annual Report",
  },
  {
    label: "Annual Key Figures",
    value: "Annual Key Figures",
  },
  {
    label: "Quarterly Key Figures",
    value: "Quarterly Key Figures",
  },
  {
    label: "Share Price Look-Up",
    value: "Share Price Look-Up",
  },
  {
    label: "Minutes of General Assembly Meetings",
    value: "Minutes of General Assembly Meetings",
  },
];

const financialInfoArabic = [
  {
    label: "البيانات المالية ربع السنوية",
    value: "البيانات المالية ربع السنوية",
  },
  {
    label: "تقرير سنوي",
    value: "تقرير سنوي",
  },
  {
    label: "الأرقام السنوية الرئيسية",
    value: "الأرقام السنوية الرئيسية",
  },
  {
    label: "الأرقام الفصلية الرئيسية",
    value: "الأرقام الفصلية الرئيسية",
  },
  {
    label: "البحث عن سعر السهم",
    value: "البحث عن سعر السهم",
  },
  {
    label: "محاضر اجتماعات الجمعية العمومية",
    value: "محاضر اجتماعات الجمعية العمومية",
  },
];
const InfoSelector = ({
  className = "",
  mainWrapperClass = "",
  optionClassName = "",
  setSelectedVal = () => {},
  setSelectVal = () => {},
  currentObject = "",
}: {
  className?: string;
  mainWrapperClass?: string;
  optionClassName?: string;
  setSelectedVal: Function;
  setSelectVal: Function;
  currentObject: any;
}): JSX.Element => {
  const onStockChange = (selectedData: optionProps) => {
    setSelectedVal(selectedData?.value);
  };

  useEffect(() => {
    currentObject?.name === "Stock Information" &&
      setSelectedVal("Share Overview");

    currentObject?.name === "Financial Information" &&
      setSelectVal("Quarterly Financial Statements");
  }, [currentObject?.name]);

  const onInfoChange = (selectedData: optionProps) => {
    setSelectVal(selectedData?.value);
  };
  const { appState } = useContext(AppContext);
  return (
    <div
      data-testid={"main-wrapper"}
      className={`${styles["info-selector"]} ${mainWrapperClass}`}
    >
      {currentObject?.name === "Stock Information" && (
        <Select
          options={stockInfo}
          onChange={onStockChange}
          defaultValue={stockInfo[0]?.value}
          optionClassName={className}
        ></Select>
      )}

      {currentObject?.name === "معلومات المخزون" && (
        <Select
          options={stockInfoArabic}
          onChange={onStockChange}
          defaultValue={stockInfoArabic[0]?.value}
          optionClassName={className}
        ></Select>
      )}

      {currentObject?.name === "Financial Information" && (
        <Select
          options={financialInfo}
          onChange={onInfoChange}
          defaultValue={financialInfo[0]?.value}
          optionClassName={className}
        ></Select>
      )}

      {currentObject?.name === "معلومات مالية" && (
        <Select
          options={financialInfoArabic}
          onChange={onInfoChange}
          defaultValue={financialInfoArabic[0]?.value}
          optionClassName={className}
        ></Select>
      )}
    </div>
  );
};
export default InfoSelector;
