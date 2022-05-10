import React, { FC } from "react";
import styles from "./style.module.scss";

interface SearchResultsInfoProps {
  searchTerm: string;
  totalItems: Number;
}
const SearchResultsInfo: FC<SearchResultsInfoProps> = ({
  searchTerm,
  totalItems,
}) => {
  console.log("searchterm", searchTerm);
  return (
    <div className={styles["search-results-info-wrapper"]}>
      <p>
        {`We have found ${totalItems} results for `}
        <strong>{`"${searchTerm}"`}</strong>
      </p>
      <div>
        <p>Need Help?</p>
      </div>
    </div>
  );
};

export default SearchResultsInfo;
