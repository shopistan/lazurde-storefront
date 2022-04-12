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

const CategoryDropDown: FC = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={styles['category-dropdown']}>
      {navArr.map((data, index) => {
        const { title, catArr } = data;
        return (
          <div key={index}>
            <div>
              {title}
            </div>
            <div>
              {catArr.map((data, index) => {
                return (
                  <div key={index}>{data.title}</div>
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