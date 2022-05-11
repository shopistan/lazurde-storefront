import React, { FC, useContext } from "react";
import styles from "./style.module.scss";
import { AppContext } from "lib/context";
// import useTranslation from "next-translate/useTranslation";
interface SearchResultsInfoProps {
  searchTerm: string;
  totalItems: Number;
}
const SearchResultsInfo: FC<SearchResultsInfoProps> = ({
  searchTerm,
  totalItems,
}) => {
  const { appState } = useContext(AppContext);
  // const { t } = useTranslation("common");

  return (
    <div className={styles["search-results-info-wrapper"]}>
      {appState?.lang === "en" ? (
        <p>
          {`We have found ${totalItems} results for `}
          <strong>{`"${searchTerm}"`}</strong>
        </p>
      ) : (
        <p>
          {`لقد وجدنا ${totalItems} نتيجة ل`}{" "}
          <strong>{`"${searchTerm}"`}</strong>
        </p>
      )}

      {totalItems > 0 ? null : (
        <div>
          <p className={styles["need-help"]}>
            {appState?.lang === "en" ? "Need Help?" : "تحتاج مساعدة ؟"}
          </p>
          <p className={styles["contact-us"]}>
            <strong>
              {appState?.lang === "en" ? "Contact Us " : "اتصل بنا "}
            </strong>{" "}
            {appState?.lang === "en"
              ? "or call Customer Service at 800 843 3269"
              : "أو اتصل بخدمة العملاء على800 843 3269"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsInfo;
