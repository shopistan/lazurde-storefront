import { ArrowLeft, ArrowRight } from "components/icons";
import React, { useState, useEffect } from "react";
import styles from "./pagination.module.scss";

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
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const totalPages = Math.round(totalSize / pageSize);

  const onFirstLoad = (callBackFn: Function) => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const paginatedArray = dataArray.slice(firstPageIndex, lastPageIndex);
    callBackFn(paginatedArray);
  };

  useEffect(() => {
    onFirstLoad(onInitialize);
  }, []);

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

  return (
    <div className={`${styles["main-pagination"]} ${paginationClass}`}>
      <div className={styles["div-view-count"]}>
        <div className={styles["div-show-count"]}>
          {showAll
            ? `Showing ${totalSize} of ${totalSize}`
            : `Showing ${firstPageIndex + 1}-${lastPageIndex} of ${totalSize}`}
        </div>
        <div className={styles["div-view-all"]} data-visible={!showAll}>
          <button
            onClick={() => {
              viewAllData(onInitialize);
            }}
          >
            View All
          </button>
        </div>
      </div>

      {children}
      
      <div className={styles["div-controls"]} data-visible={!showAll}>
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
