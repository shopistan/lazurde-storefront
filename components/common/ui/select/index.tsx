import ArrowDown from "components/icons/ArrowDown";
import React, { useState, useRef, useEffect } from "react";

import styles from "./style.module.scss";

type optionProps = { label: string, img: string, value: string }

interface SelectProps {
  options: optionProps[],
  onChange: Function,
  defaultValue: string,
}

const Select = ({ options = [{ label: 'label', img: '', value: 'value' }], onChange, defaultValue }: SelectProps): JSX.Element => {
  const dropdown = useRef(null)
  const [selectedVal, setSelectedVal] = useState<optionProps>({ label: defaultValue, img: defaultValue, value: defaultValue })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<string>('bottom')

  useEffect(() => {
    setSelectedVal({ label: defaultValue, img: defaultValue, value: defaultValue })
  }, [defaultValue])

  return (
    <div ref={dropdown} tabIndex={0} className={styles["dropdown"]} data-open={isOpen} onBlur={() => setIsOpen(false)}  >
      <span className={styles["select"]} onClick={() => {
        if (window.innerHeight - dropdown.current.getBoundingClientRect().bottom < 100) {
          setPosition('top')
        } else {
          setPosition('bottom')
        }
        setIsOpen(!isOpen)
      }}>
        {selectedVal.label}
        {selectedVal.img && <img src={selectedVal.img} width='16px' alt="image" />}
      </span>
      <ul className={`${styles["options-ul"]}`} data-position={position}>
        {options.map((opData, index) => {
          selectedVal.value === opData.value && selectedVal.label !== opData.label && setSelectedVal(opData)
          return (
            <li key={index} className={`${styles["option"]}`} data-selected={opData.value === selectedVal.value}
              onClick={() => {
                setSelectedVal(opData)
                setIsOpen(false)
                onChange(opData)

              }}>
              <a>{opData.label}

                {opData.img && <img src={opData.img} width='16px' alt="image" />}
              </a>
            </li>)
        })}
      </ul>
      <div className={styles['select-arrow']}>
        <ArrowDown />
      </div>
    </div>
  );
};

export default Select;
