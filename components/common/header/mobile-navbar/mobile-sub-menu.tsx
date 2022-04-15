import styles from "./style.module.scss";
import { Cross, BackArrow } from "components/icons";
import Link from "next/link";
import Label from "components/common/ui/label";
interface linksProps {
  title?: string;
  catArr?: objectData[];
}

type objectData = {
  title?: string;
  url?: string;
};

interface dataProps {
  title?: string;
  catArr?: objectData[];
}

interface menuProps {
  active?: Boolean;
  closeMenu?: Function;
  closeSubMenu?: Function;
  subMenuData?: dataProps[];
  menuTitle: string;
}

const MobileSubMenu = ({
  active = false,
  closeMenu,
  closeSubMenu,
  subMenuData,
  menuTitle,
}: menuProps): JSX.Element => {
  return (
    <div
      className={`${styles[`mobile-header__sub-menu-wrapper`]} ${
        active ? `${styles[`mobile-header__sub-menu-active`]}` : ``
      }`}
    >
      <div className={styles["mobile-header__sub-menu-close-icon"]}>
        <div
          onClick={() => closeSubMenu()}
          className={styles["mobile-header__sub-menu-back-btn"]}
        >
          <BackArrow fill="#000000" opacity="0.6" />
          <span className="opacity-60">back</span>
        </div>
        <button
          onClick={() => {
            closeMenu();
            closeSubMenu();
          }}
        >
          <Cross width={"20px"} height={"20px"} />
        </button>
      </div>
      {menuTitle && (
        <div className={styles["mobile-header__menu-title"]}>{menuTitle}</div>
      )}
      <div className={styles["mobile-header__sub-menu-list-wrapper"]}>
        <ul className={styles["mobile-header__sub-menu-list"]}>
          {subMenuData &&
            subMenuData.length > 0 &&
            subMenuData?.map((links: linksProps, index: number) => {
              const { title, catArr } = links;
              return (
                <>
                  <li
                    key={index}
                    className={styles["mobile-header__sub-menu-list-items"]}
                  >
                    <Label
                      className={styles["mobile-header__sub-menu-heading"]}
                    >
                      {title}
                    </Label>
                    <ul>
                      {catArr &&
                        catArr.length > 0 &&
                        catArr?.map((subLinks: objectData, index: number) => {
                          const { title, url } = subLinks;
                          return (
                            <li
                              key={index}
                              className={`opacity-60 ${styles["mobile-header__sub-menu-list-item"]}`}
                            >
                              <Link href={url}>
                                <a>{title}</a>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MobileSubMenu;
