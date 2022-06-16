import React, { useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { AppContext } from "lib/context";

type LinkProps = {
  title: string;
  url: string;
  isBold: Boolean;
};

interface ArabicCategoryProps {
  linkHeading: string;
  linkTitle: [
    {
      title: string;
    }
  ];
}

interface DropDownProps {
  dropdownData: [
    {
      title: string;
      catArr: [LinkProps];
    }
  ];
  categoryLinks: ArabicCategoryProps[];
}

interface CategoryDropDownProps {
  categoryData: DropDownProps;
  setIsOpened: Function;
}

const CategoryDropDown = ({
  categoryData,
  setIsOpened,
}: CategoryDropDownProps): JSX.Element => {
  const { appState } = useContext(AppContext);

  return (
    <div
      data-testid={"dropdown-div"}
      className={styles["category-dropdown"]}
      onMouseOver={() => {
        setIsOpened((prev: object) => {
          return { ...prev, opened: true };
        });
      }}
      onMouseLeave={() => {
        setIsOpened((prev: object) => {
          return { ...prev, opened: false };
        });
      }}
    >
      {categoryData?.dropdownData?.map((data, index) => {
        const { title, catArr } = data;
        const currentCategoryArabic = categoryData?.categoryLinks?.[index];
        return (
          <div key={index}>
            <div className={styles["title"]}>
              {appState?.lang === "en"
                ? title
                : currentCategoryArabic?.linkHeading}
            </div>
            <div className={styles["links"]}>
              {catArr?.map((data, index) => {
                const categoryLinkArabic =
                  currentCategoryArabic?.linkTitle[index];

                return (
                  <Link key={index} href={data.url || ""}>
                    <a data-is-bold={data.isBold}>
                      {appState?.lang === "en"
                        ? data.title
                        : categoryLinkArabic?.title}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryDropDown;
