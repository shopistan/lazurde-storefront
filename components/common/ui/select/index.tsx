import React, { useState, useRef } from "react";

import styles from "./style.module.scss";

type optionProps = { label: string, value: string }

interface SelectProps {
  options: optionProps[],
  onChange: Function,
  defaultValue: string,
}



const Select = ({ options = [{ label: 'label', value: 'value' }], onChange, defaultValue }: SelectProps): JSX.Element => {
  const dropdown = useRef(null)
  const [selectedVal, setSelectedVal] = useState<optionProps>({ label: defaultValue, value: defaultValue })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<string>('bottom')

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
              <a>{opData.label}</a>
            </li>)
        })}
      </ul>
    </div>
  );
};

export default Select;
