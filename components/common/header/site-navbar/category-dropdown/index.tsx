import React, { useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

interface DropDownProps {
  title: string,
  catArr: [{ title: string, url: string, isBold: Boolean }],
}

interface CategoryDropDownProps {
  dropdownData: DropDownProps[];
  setIsOpened: Function
}

const CategoryDropDown = ({ dropdownData, setIsOpened }: CategoryDropDownProps): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  return (
    <div className={styles['category-dropdown']}
      onMouseOver={() => {
        setIsOpened((prev: object) => {return {...prev, opened: true}})
      }}
      onMouseLeave={() => {
        setIsOpened((prev: object) => {return {...prev, opened: false}})
      }}
    >
      {dropdownData.map((data, index) => {
        const { title, catArr } = data;
        return (
          <div key={index}>
            <div className={styles['title']}>
              {title}
            </div>
            <div className={styles['links']}>
              {catArr.map((data, index) => {
                return (
                  <Link key={index} href={data.url || ""} >
                    <a data-isBold={data.isBold}>{data.title}</a>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default CategoryDropDown;