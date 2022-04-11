import React, { FC, useState, useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Cross from '../../../icons/Cross';
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";
import useWindowSize from "lib/utils/useWindowSize";
import Button from 'components/common/ui/button/index';
import LanguageSelector from './../../language-selector/index';

interface PromoBarProps {
  title: string;
  linkText: string;
  mobileLinkText: string;
  link: string;
  bgColor: string;
}

const LangSelector: FC = ({

}): JSX.Element => {
  const [isClosed, setIsClosed] = useState(false)
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);
  const [width] = useWindowSize()
  return (
    <div className={styles["navbar-lang"]} data-visible={isClosed} data-testid="product-card">
      <div className={styles["main-section"]}>
        <div className={styles["title"]}>
          <span>Select your preferred language and location</span>
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