import React, { FC, useState, useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { BackArrow, LazurdeLogo, Search } from "components/icons";
import { BrandSidebarProps, ImageType } from "lib/types/common";
import CategoryDropDown from "./category-dropdown";
import Image from "next/image";

const sidebarData = [
  {
    title: "something1",
    navArr: [
      {
        title: "category1",
      },
    ],
  },
  {
    title: "something2",
    navArr: [
      {
        title: "catagory2",
      },
    ],
  },
  {
    title: "something3",
    navArr: [
      {
        title: "category3",
      },
    ],
  },
];

type objectData = {
  title: string;
  url: string;
  isBold: Boolean;
};
interface siteNavBarProps {
  navTitle: string;
  titleUrl: string;
  navArr: [{ title: string; catArr: [objectData] }];
}

interface dataProps {
  title: string;
  catArr: [objectData];
}

const SiteNavBar = ({
  headerId,
  siteNavBar,
  siteLogo,
}: {
  siteNavBar: siteNavBarProps[];
  siteLogo: ImageType;
  headerId: string;
}): JSX.Element => {
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [isOpened, setIsOpened] = useState(false);
  const [dropdownData, setDropdownData] = useState<dataProps[]>([]);

  return (
    <div className={styles["site-navbar"]} data-headerId={headerId}>
      <div className={styles["back-btn"]}>
        <Link href={'/'}>
          <a>
            <div>
              <BackArrow />
            </div>
            Back to L’azurde
          </a>
        </Link>
      </div>
      <div>
        {siteLogo?.url && (
          <Image src={siteLogo?.url} width={152} height={20} alt={siteLogo?.altText} />
        )}
        <Link href="/">
          <a></a>
        </Link>
      </div>
      <div className={styles["nav-links"]}>
        {siteNavBar && siteNavBar.length > 0 &&
          siteNavBar.map((data, index) => {
            const categoryData = data.navArr[0];
            return (
              <div
                key={index}
                className={styles["links"]}
                onMouseOver={() => {
                  if (categoryData.catArr.length > 0 && categoryData.title) {
                    setIsOpened(true);
                    setDropdownData(data.navArr);
                  }
                }}
                onMouseLeave={() => {
                  setIsOpened(false);
                }}
              >
                <Link href={
                  categoryData.catArr.length > 0 && categoryData.title
                    ? ""
                    : data.titleUrl}>
                  <a>{data.navTitle}</a>
                </Link>
              </div>
            );
          })}
      </div>
      <div>
        <Search></Search>
      </div>
      <div className={styles["category-dropdown"]} data-opened={isOpened}>
        <CategoryDropDown
          setIsOpened={setIsOpened}
          dropdownData={dropdownData}
        ></CategoryDropDown>
      </div>
      <div className={styles["overlay"]} data-opened={isOpened} onClick={(() => setIsOpened(false))}></div>
    </div >
  );
};

export default SiteNavBar;
