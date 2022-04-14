import React, { FC, useState, useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { LazurdeLogo, Search } from "components/icons";
import {
  BrandSidebarProps,
} from "lib/types/common";
const navArr = [
  {
    title: "category1",
    catArr: [
      {
        title: 'something1'
      }
    ]
  },
  {
    title: "category2",
    catArr: [
      {
        title: 'something2'
      }
    ]
  },
  {
    title: "category3",
    catArr: [
      {
        title: 'something3'
      }
    ]
  },
]

interface DropDownProps {
  title: string,
  catArr: [{ title: string, url: string, isBold: Boolean }],
}

interface CategoryDropDownProp {
  dropdownData: DropDownProps[];
  setIsOpened: Function
  isOpened: Boolean;
}

const CategoryDropDown = ({ dropdownData, setIsOpened, isOpened }: CategoryDropDownProp): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  return (
    <div className={styles['category-dropdown']}
      onMouseOver={() => {
        setIsOpened(true)
      }}
      onMouseLeave={() => {
        setIsOpened(false)
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