import React, { useState, useEffect, useContext } from "react";
import styles from "./pagination.module.scss";
import { ArrowLeft, ArrowRight } from "components/icons";
import useTranslation from "next-translate/useTranslation";
import { AppContext } from "lib/context";

interface PaginationProps {
  paginationClass?: string;
  defaultPageNumber?: number;
  pageSize: number;
  totalSize: number;
  onPageUp: Function;
  onPageDown: Function;
  dataArray: [];
  onInitialize?: Function;
  children?: JSX.Element;
}

const Pagination = ({
  paginationClass = "",
  defaultPageNumber,
  pageSize,
  totalSize,
  onPageUp,
  onPageDown,
  dataArray,
  onInitialize,
  children,
}: PaginationProps): JSX.Element => {

  const [currentPage, setCurrentPage] = useState(defaultPageNumber);
  const [showAll, setShowAll] = useState(false);
  const [hidePagination, setHidePagination] = useState(false);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const totalPages = Math.ceil(totalSize / pageSize);
  const { t } = useTranslation("common");
  const { appState } = useContext(AppContext);

  const populateOnFirstLoad = (callBackFn: Function) => {
    const firstPageIndex = (defaultPageNumber - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const paginatedArray = dataArray.slice(firstPageIndex, lastPageIndex);
    callBackFn(paginatedArray);
  };

  const isPaginationRequired = () => {
    const numOfPages = totalSize / pageSize
    return numOfPages < 1
  }

  useEffect(() => {
    setCurrentPage(defaultPageNumber)
    populateOnFirstLoad(onInitialize);
    setHidePagination(isPaginationRequired())
  }, [dataArray]);

  const pageDown = (callBackFn: Function) => {
    const pageNum = currentPage - 1;
    const firstPageIndex = (pageNum - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const paginatedArray = dataArray.slice(firstPageIndex, lastPageIndex);
    setCurrentPage(pageNum);
    callBackFn(paginatedArray);
  };

  const pageUp = (callBackFn: Function) => {
    const pageNum = currentPage + 1;
    const firstPageIndex = (pageNum - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const paginatedArray = dataArray.slice(firstPageIndex, lastPageIndex);
    setCurrentPage(pageNum);
    callBackFn(paginatedArray);
  };

  const viewAllData = (callBackFn: Function) => {
    setShowAll(true);
    callBackFn(dataArray);
  };

  const pageCount = appState.lang === 'en' ? `${firstPageIndex + 1}-${lastPageIndex}` : `${lastPageIndex}-${firstPageIndex + 1}`

  return (
    <div className={`${styles["main-pagination"]} ${paginationClass}`}>
      <div className={styles["div-view-count"]} data-hide={hidePagination}>
        <div className={styles["div-show-count"]}>
          {showAll
            ? `${t("textShow")} ${totalSize} ${t("textOf")} ${totalSize}`
            : `${t("textShow")} ${pageCount} ${t("textOf")} ${totalSize}`}
        </div>
        <div className={styles["div-view-all"]} data-visible={!showAll}>
          <button
            onClick={() => {
              viewAllData(onInitialize);
            }}
          >
            {t('textViewAll')}
          </button>
        </div>
      </div>

      {children}

      <div className={styles["div-controls"]} data-visible={!showAll} data-hide={hidePagination}>
        <div className={styles["div-left-arrow"]}>
          <button
            disabled={currentPage === 1}
            onClick={() => pageDown(onPageDown)}
          >
            <ArrowLeft fillOpacity={currentPage === 1 ? "0.4" : "1"} />
          </button>
        </div>
        <div className={styles["div-page-count"]}>
          <span>{currentPage}</span>
          <span>/</span>
          <span>{totalPages}</span>
        </div>
        <div className={styles["div-right-arrow"]}>
          <button
            disabled={currentPage === totalPages}
            onClick={() => pageUp(onPageUp)}
          >
            <ArrowRight
              fillOpacity={currentPage === totalPages ? "0.4" : "1"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
