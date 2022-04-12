import React, { FC, useState, useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { LazurdeLogo, Search } from "components/icons";
import {
  BrandSidebarProps,
} from "lib/types/common";
import CategoryDropDown from "./category-dropdown";

const sidebarData = [
  {
    title: 'something1',
    navArr: [
      {
        title: "category1",
      }
    ]
  },
  {
    title: 'something2',
    navArr: [
      {
        title: "catagory2",
      }
    ]
  },
  {
    title: 'something3',
    navArr: [
      {
        title: "category3",
      }
    ]
  },

]

const SiteNavBar: FC = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState(true)

  return (
    <div className={styles['site-navbar']}>
      <div>
        <Link href="/">
          <a >
            <LazurdeLogo width={100} height={50} />
          </a>
        </Link>
      </div>
      <div>
        <ul>
          {sidebarData.map((data, index) => {
            return (
              <li key={index} onMouseOver={() => {
                setIsOpened(true)
              }}
              onMouseLeave={() => {
                setIsOpened(false)
              }}
              >
                {data.title}
              </li>
            )
          })}
        </ul>

      </div>
      <div><Search></Search></div>
      {isOpened && <CategoryDropDown></CategoryDropDown>}
    </div>
  );
};

export default SiteNavBar;