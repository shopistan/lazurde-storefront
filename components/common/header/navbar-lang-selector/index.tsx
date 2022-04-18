import React, { useState } from "react";
import styles from "./style.module.scss";
import Cross from '../../../icons/Cross';
import useTranslation from "next-translate/useTranslation";
import LanguageSelector from './../../language-selector/index';

const LangSelector = ({

}): JSX.Element => {
  const [isClosed, setIsClosed] = useState(false)
  const { t } = useTranslation("common");
  return (
    <div className={styles["navbar-lang"]} data-visible={isClosed} data-testid="product-card">
      <div className={styles["main-section"]}>
        <div className={styles["title"]}>
          <span>{t("NavbarLangSelectorTitle")} </span>
        </div>
        <div className={styles["selector"]}>
          <LanguageSelector showButton={true} />
        </div>
        
      </div>
      <button className={styles["closeButton"]} type='button' onClick={() => {
        setIsClosed(true)
      }}>
        <Cross width={'20px'} height={'20px'} />
      </button>
    </div>
  );
};

export default LangSelector;