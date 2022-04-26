/* eslint-disable @next/next/no-img-element */
import ChevronDown from "components/icons/ChevronDown";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Accordion from "../accordion2/Accordion";
import Modal from "../modal";

import styles from "./style.module.scss";

type optionProps = { label: string; img?: string; value: string };

const linksData = [
  {
    heading: "heading",
    links: [
      {
        url: "/",
        text: "Heading",
      },
    ],
  },
  {
    heading: "heading",
    links: [
      {
        url: "/",
        text: "Heading",
      },
    ],
  },
  {
    heading: "heading",
    links: [
      {
        url: "/",
        text: "Heading",
      },
    ],
  },
  {
    heading: "heading",
    links: [
      {
        url: "/",
        text: "Heading",
      },
    ],
  },
];

interface SelectProps {
  options: optionProps[];
  onChange: Function;
  defaultValue: string;
  className?: string;
  optionClassName?: string;
  selectedLabel?: string;
  showInModal?: Boolean;
  modalChildren?: string | JSX.Element
}

const BorderlessSelect = ({
  options = [{ label: "label", img: "", value: "value" }],
  onChange,
  defaultValue,
  className = "",
  optionClassName = "",
  selectedLabel = "",
  showInModal = false,
  modalChildren = "",
}: SelectProps): JSX.Element => {
  const dropdown = useRef(null);
  const [selectedVal, setSelectedVal] = useState<optionProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("bottom");

  useEffect(() => {
    defaultValue &&
      options.find((currentOption) => {
        defaultValue === currentOption.value &&
          setSelectedVal({ ...currentOption });
      });
  }, [defaultValue]);

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
          window.innerHeight -
          dropdown.current.getBoundingClientRect().bottom <
          100
        ) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
        setIsOpen(!isOpen);
      }}
    >
      <div
        className={`${styles["select"]} ${optionClassName}`}

      >
        <span>{selectedLabel}</span>
        <span className={styles["selected-text"]}>{selectedVal?.label}</span>
        {selectedVal?.img && (
          <img
            src={selectedVal?.img || "/flag-uae.svg"}
            width={16}
            alt="image"
          />
        )}
      </div>
      {showInModal ? (
        <Modal
          className=""
          isOpened={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {modalChildren}
        </Modal>
      ) : (
        <ul className={`${styles["options-ul"]}`} data-position={position}>
          {options.map((opData, index) => {
            return (
              <li
                key={`${selectedVal?.value}-${index}`}
                className={`${styles["option"]}`}
                data-selected={selectedVal?.value === opData.value}
                onClick={() => {
                  setSelectedVal(opData);
                  setIsOpen(false);
                  onChange(opData);
                }}
              >
                <a>
                  {opData.label}
                  {opData.img && (
                    <img
                      src={opData.img || "/flag-uae.svg"}
                      width={16}
                      alt="image"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles["select-arrow"]}>
        <ChevronDown />
      </div>
    </div>
  );
};

export default BorderlessSelect;
