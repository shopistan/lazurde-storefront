import React from 'react'
import styles from './spinner.module.scss'

const Spinner = ({width = 20, height = 20, stroke = 3}) => {
  return (
    <div className={styles["div-spinner"]} style={{
      width: `${width}px`,
      height: `${height}px`,
      borderStyle: 'solid',
      borderWidth: `${stroke}px`,
    }}></div>
  )
}

export default Spinner