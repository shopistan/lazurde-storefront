import React, { FC, useContext, useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import { BackArrow, Search } from "components/icons";
import { ImageType } from "lib/types/common";
import CategoryDropDown from "./category-dropdown";
import Image from "next/image";
import { updateBrand } from "lib/utils/common";

type LinkProps = {
  title: string;
  url: string;
  isBold: Boolean;
};
interface siteNavBarProps {
  siteNavBar:
    | [
        {
          navTitle: string;
          titleUrl: string;
          navArr: [{ title: string; catArr: [LinkProps] }];
        }
      ]
    | [];
  siteLogo: ImageType;
  siteLogoUrl: string;
  headerId: string;
  setOpenSearchDialog: (val: boolean) => void;
}

interface DropdownDataProps {
  dropdownData: [
    {
      title: string;
      catArr: [LinkProps];
    }
  ];
  categoryLinks: [];
}

const SiteNavBar: FC<siteNavBarProps> = ({
  headerId,
  siteNavBar,
  siteLogo,
  siteLogoUrl,
  setOpenSearchDialog,
}): JSX.Element => {
  const { t } = useTranslation("common");
  const sideNavTitlesArray: [{ navTitle: string; navCategoryLinks: [] }] = t(
    "siteNavLinks",
    {},
    { returnObjects: true }
  );

  const [isOpened, setIsOpened] = useState({ opened: false, selected: -1 });
  const [dropdownData, setDropdownData] = useState<DropdownDataProps>();
  const { appState, saveAppState } = useContext(AppContext);

  return (
    <div
      data-testid="id"
      className={styles["site-navbar"]}
      data-header-id={headerId}
    >
      <div
        className={styles["back-btn"]}
        onClick={() => {
          updateBrand(`L'azurde`, saveAppState, appState);
        }}
      >
        <Link href={"/"}>
          <a>
            <div>
              <BackArrow />
            </div>
            {t("navbarBackBtn")}
          </a>
        </Link>
      </div>
      <div>
        <Link href={siteLogoUrl || ""}>
          <a>
            <Image
              src={siteLogo?.url}
              width={152}
              height={20}
              alt={siteLogo?.altText}
            />
          </a>
        </Link>
      </div>
      <div className={styles["nav-links"]}>
        {siteNavBar &&
          siteNavBar.length > 0 &&
          siteNavBar.map((data, index) => {
            const categoryData = data.navArr[0];
            const hasCategories =
              categoryData.catArr.length > 0 && categoryData.title;
            return (
              <div
                key={index}
                role={"links"}
                className={styles["links"]}
                onMouseOver={() => {
                  if (hasCategories) {
                    setIsOpened({ opened: true, selected: index });
                    setDropdownData({
                      dropdownData: data.navArr,
                      categoryLinks: sideNavTitlesArray[index].navCategoryLinks,
                    });
                  } else {
                    setIsOpened({ opened: false, selected: index });
                  }
                }}
                onMouseLeave={() => {
                  if (hasCategories) {
                    setIsOpened({ opened: false, selected: index });
                  } else {
                    setIsOpened({ opened: false, selected: -1 });
                  }
                }}
                data-selected={
                  hasCategories
                    ? isOpened.opened === true && isOpened.selected === index
                    : isOpened.selected === index
                }
              >
                <Link href={hasCategories ? "" : data.titleUrl}>
                  <a>
                    {appState?.lang === "en"
                      ? data.navTitle
                      : sideNavTitlesArray[index].navTitle}
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
      <div
        role={"search"}
        onClick={() => setOpenSearchDialog(true)}
        className={styles["search-icon"]}
      >
        <Search></Search>
      </div>
      <div
        className={styles["category-dropdown"]}
        data-opened={isOpened.opened}
      >
        <CategoryDropDown
          setIsOpened={setIsOpened}
          categoryData={dropdownData}
        ></CategoryDropDown>
      </div>
      <div
        role={"overlay"}
        className={styles["overlay"]}
        data-opened={isOpened.opened}
        onClick={() => setIsOpened({ ...isOpened, opened: false })}
      ></div>
    </div>
  );
};

export default SiteNavBar;
