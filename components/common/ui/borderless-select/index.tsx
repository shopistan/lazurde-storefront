/* eslint-disable @next/next/no-img-element */
import ChevronDown from "components/icons/ChevronDown";
import Image from "next/image";
import React, { useState, useRef, useEffect, useContext } from "react";
import Modal from "../modal";

import styles from "./style.module.scss";

type optionProps = { label?: string; img?: string; value?: string };

interface SelectProps {
  options?: optionProps[];
  onChange: Function;
  defaultValue?: string;
  selectedValue?: string;
  className?: string;
  optionClassName?: string;
  selectedLabel?: string | JSX.Element;
  showInModal?: Boolean;
  modalChildren?: string | JSX.Element;
  visible?: boolean;
  onOpen?: Function;
}

const BorderlessSelect = ({
  options = [{ label: "label", img: "", value: "value" }],
  onChange = () => {},
  defaultValue = "",
  selectedValue = "",
  className = "",
  optionClassName = "",
  selectedLabel = "",
  showInModal = false,
  modalChildren = "",
  visible = false,
  onOpen = () => {},
}: SelectProps): JSX.Element => {
  const dropdown = useRef(null);
  const [selectedVal, setSelectedVal] = useState<optionProps>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("bottom");

  useEffect(() => {
    defaultValue &&
      Array.isArray(options) &&
      options.length > 0 &&
      options.find((currentOption) => {
        defaultValue === currentOption.value &&
          setSelectedVal({ ...currentOption });
      });
  }, [defaultValue]);

  useEffect(() => {
    selectedValue &&
      Array.isArray(options) &&
      options.length > 0 &&
      options.find((currentOption) => {
        selectedValue === currentOption.value &&
          setSelectedVal({ ...currentOption });
      });
  }, [selectedValue]);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  useEffect(() => {
    isOpen && onOpen && onOpen(true);
  }, [isOpen]);

  return (
    <div
      key={selectedVal?.value}
      ref={dropdown}
      tabIndex={0}
      className={`${className} ${styles["dropdown"]}`}
      data-open={isOpen}
      onBlur={() => !showInModal && setIsOpen(false)}
      onClick={() => {
        if (
          window?.innerHeight -
            dropdown?.current?.getBoundingClientRect().bottom <
          100
        ) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
        setIsOpen(!isOpen);
      }}
    >
      <div className={`${styles["select"]} ${optionClassName}`}>
        <span>{selectedLabel}</span>
        <span className={styles["selected-text"]}>{selectedVal?.label}</span>
        {selectedVal?.img && (
          <Image
            src={selectedVal?.img || "/flag-uae.svg"}
            width={16}
            height={16}
            alt="image"
            layout="fixed"
          />
        )}
      </div>
      {showInModal ? (
        <Modal
          className={styles["select-modal"]}
          isOpened={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {modalChildren}
        </Modal>
      ) : (
        <ul className={`${styles["options-ul"]}`} data-position={position}>
          {Array.isArray(options) &&
            options.length > 0 &&
            options?.map((opData, index) => {
              return (
                <li
                  key={`${selectedVal?.value}-${index}`}
                  className={`${styles["option"]}`}
                  data-selected={selectedVal?.value === opData?.value}
                  onClick={() => {
                    setSelectedVal(opData);
                    setIsOpen(false);
                    onChange(opData);
                  }}
                >
                  <a>
                    {opData?.label}
                    {opData?.img && (
                      <Image
                        src={opData?.img || "/flag-uae.svg"}
                        width={16}
                        height={16}
                        alt="image"
                        layout="fixed"
                      />
                    )}
                  </a>
                </li>
              );
            })}
        </ul>
      )}

      <div className={styles["select-arrow"]}>
        <ChevronDown color="#000000" width="10px" height="7px" />
      </div>
    </div>
  );
};

export default BorderlessSelect;
