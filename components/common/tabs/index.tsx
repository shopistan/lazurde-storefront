import React, { useState } from "react";
import styles from "./tabs.module.scss";

type TabsProps = {
  content?: any;
  yearArr?: string[] | undefined;
};

const Tabs = ({ yearArr, content }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState("1");

  return (
    <div className={styles["container"]}>
      <div className={styles["tabs"]}>
        <div className={styles.tabs_heading}>
          {yearArr.map((years, i) => {
            return (
              <button
                key={i}
                id={i.toString()}
                disabled={currentTab === `${i.toString()}`}
                onClick={() => {
                  setCurrentTab(i.toString());
                }}
                className={
                  currentTab === `${i.toString()}` ? styles.active_tab : ""
                }
              >
                {years}
              </button>
            );
          })}
        </div>
        <div className={styles["content"]}>
          {Object.keys(content).map((year, i) => {
            return (
              <div key={i}>
                {currentTab === `${i.toString()}` && (
                  <div className={styles["tab-content"]}>
                    {Object.keys(content[year]).map((data, index) => {
                      return (
                        <div key={index} className={styles.single_value}>
                          <p className={styles["tab-content-heading"]}>
                            {data}:
                          </p>
                          <p className={styles["tab-content-value"]}>
                            {content[year][data]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
