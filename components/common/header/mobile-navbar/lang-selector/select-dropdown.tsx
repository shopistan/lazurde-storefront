/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect, useContext } from "react";
import { ArrowRight } from "components/icons";
import { SelectProps, OptionProps } from "lib/types/mobile-header";
import styles from "../style.module.scss";
import { AppContext } from "lib/context";
import Image from "next/image";

const LanguageSelector = ({
  options = [{ label: "label", img: "", value: "value", langTitle: "" }],
  onChange,
  defaultValue,
  iconWidth = "16",
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
      className={styles["mobile-header__lang-dropdown"]}
      data-open={isOpen}
      onBlur={() => setIsOpen(false)}
    >
      <span
        className={styles["mobile-header__lang-selected"]}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={styles["mobile-header__lang-left-side"]}>
          {selectedVal?.img && (
            <Image
              src={selectedVal?.img || "/flag-uae.svg"}
              width={iconWidth || 16}
              height={16}
              alt="image"
              layout="fixed"
            />
          )}
          <span>
            {selectedVal?.label}
            {appState?.lang === "ar" && selectedVal?.langTitle && (
              <span>{`(${selectedVal?.langTitle})`}</span>
            )}
          </span>
        </div>
        <div className={styles["mobile-header__lang-right-side"]}>
          {appState?.lang === "en" && selectedVal?.langTitle && (
            <span>{selectedVal?.langTitle}</span>
          )}
          <ArrowRight className={styles["dropdown-arrow"]} />
        </div>
      </span>
      <ul
        className={styles["mobile-header__lang-options"]}
        data-position={position}
      >
        {options?.map((opData, index) => {
          selectedVal?.value === opData.value &&
            selectedVal?.label === "" &&
            setSelectedVal({ ...opData });
          return (
            <li
              key={`${selectedVal?.value}-${index}`}
              className={`${styles["option"]}`}
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
                    <Image
                      src={opData?.img || "/flag-uae.svg"}
                      width={iconWidth || 16}
                      height={16}
                      alt="image"
                      layout="fixed"
                    />
                  )}
                  <span>{opData?.label}</span>
                </span>
                <span>{opData?.langTitle}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
