/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import { SelectProps, OptionProps } from "lib/types/mobile-header";
import styles from "../style.module.scss";
import { AppContext } from "lib/context";
import Image from "next/image";

const LanguageSelector = ({
  options = [{ label: "label", img: "", value: "value", langTitle: "" }],
  onChange,
  defaultValue,
  iconWidth = "32",
}: SelectProps): JSX.Element => {
  const dropdown = useRef(null);
  const { appState } = useContext(AppContext);
  const [selectedVal, setSelectedVal] = useState<OptionProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("bottom");

  useEffect(() => {
    setSelectedVal({ label: "", img: "", value: defaultValue, langTitle: "" });
  }, [defaultValue]);

  useEffect(() => {}, [selectedVal]);

  return (
    <div
      key={selectedVal?.value}
      ref={dropdown}
      tabIndex={0}
      className={styles["sidebar__lang-dropdown"]}
      onBlur={() => setIsOpen(false)}
      role="wrapper"
    >
      <span
        className={`${styles["sidebar__lang-selected"]} ${
          isOpen === true ? styles["margin"] : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        role="main-wrapper"
      >
        <div className={styles["sidebar__lang-left-side"]}>
          {selectedVal?.img && (
            <Image
              src={selectedVal?.img || "/ksa.svg"}
              width={iconWidth || 16}
              height={iconWidth || 16}
              alt="selected-image"
              layout="fixed"
            />
          )}
          <span>{selectedVal?.label}</span>
        </div>
        <div className={styles["sidebar__lang-right-side"]}>
          {selectedVal?.langTitle && <span>{selectedVal?.langTitle}</span>}
        </div>
      </span>
      <ul className={styles["sidebar__lang-options"]} data-position={position}>
        {options?.map((opData, index) => {
          selectedVal?.value === opData.value &&
            selectedVal?.label === "" &&
            setSelectedVal({ ...opData });
          return (
            <li
              role="list-item"
              key={`${selectedVal?.value}-${index}`}
              className={`${
                opData.langTitle == "english" ? "" : styles["ar-style"]
              }`}
              data-selected={selectedVal?.value === opData.value}
              onClick={() => {
                if (selectedVal?.value === opData.value) {
                  setIsOpen(false);
                } else {
                  setSelectedVal(opData);
                  setIsOpen(false);
                  onChange(opData);
                }
              }}
            >
              <a>
                <span>
                  {opData?.img && (
                    <span className={styles["country-icon"]}>
                      <Image
                        src={opData?.img || "/flag-uae.svg"}
                        width={iconWidth || 16}
                        height={iconWidth || 16}
                        alt="image"
                        layout="fixed"
                      />
                    </span>
                  )}
                  <span role="option-label">{opData?.label}</span>
                </span>
                <span role="option-title">{opData?.langTitle}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
