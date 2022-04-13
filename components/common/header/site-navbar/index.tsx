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

type objectData = {
  title: string, url: string
}
interface siteNavBarProps {
  navTitle: string,
  titleUrl: string,
  navArr: [{ title: string, catArr: [objectData] }],
}

interface dataProps {
  title: string, catArr: [objectData]
}


const SiteNavBar = ({ siteNavBar }: { siteNavBar: siteNavBarProps[] }): JSX.Element => {

  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState(false)
  const [dropdownData, setDropdownData] = useState<dataProps[]>([])

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
          {siteNavBar.map((data, index) => {
            return (
              <Link key={index} href={data.titleUrl || ''}>
                <a onMouseOver={() => {
                  const categoryData = data.navArr[0]
                  if (categoryData.catArr.length > 0 && categoryData.title) {
                    setIsOpened(true)
                    setDropdownData(data.navArr)
                  }
                }}
                  onMouseLeave={() => {
                    setIsOpened(false)
                  }}>
                  {data.navTitle}
                </a>
              </Link>
            )
          })}
        </ul>

      </div>
      <div><Search></Search></div>
      {isOpened && <CategoryDropDown dropdownData={dropdownData}></CategoryDropDown>}
    </div>
  );
};

export default SiteNavBar;