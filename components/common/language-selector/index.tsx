import Head from "next/head";
import Script from "next/script";
import React, { useState } from "react";
import BambuserPopup from "../bambuser-popup";

import styles from "./style.module.scss";

const optionArr = [
  {
    label: 'option 1',
    value: 'op1'
  },
  {
    label: 'option 2',
    value: 'op2'
  },
  {
    label: 'option 3',
    value: 'op3'
  }
]

const LanguageSelector = ({ options = optionArr }): JSX.Element => {
  const [selectedVal, setSelectedVal] = useState<string | number | object>("default")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div>
        <span></span>
      </div>
      {/* <div className={styles["dropdown"]} data-open={isOpen} onBlur={() => setIsOpen(false)}  >
        <span tabIndex={0} className="btn m-1" onClick={() => setIsOpen(!isOpen)}>{selectedVal.label}</span>
        <ul tabIndex={0} className={`${styles["dropdown-content"]} menu p-2 shadow bg-base-100 rounded-box w-52`}>
          {options.map((opData, index) => {
            selectedVal === 'default' && index === 0 && setSelectedVal(opData)
            return (
              <li key={index} onClick={() => {
                setSelectedVal(opData)
                setIsOpen(false)
              }}>
                <a>{opData.label}</a>
              </li>)
          })}
        </ul>

      </div> */}
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
    </>

  );
};
export default LanguageSelector;
