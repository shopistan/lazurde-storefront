import React, { useState } from "react";
import styles from "./style.module.scss";
import Modal from "components/common/ui/modal";
import Image from "next/image";

interface SizeChartModalProps {
  isOpened?: boolean;
  onClose?: Function;
  sizeChartUrl?: string;
}

const SizeChartModal = ({
  isOpened = false,
  onClose = () => {},
  sizeChartUrl = "",
}: SizeChartModalProps): JSX.Element => {
  return (
    <div className={styles["sizechart-modal_wrapper"]}>
      <Modal
        isOpened={isOpened}
        onClose={onClose}
        className={styles["sizechart-modal"]}
        modalBodyClassName={styles["sizechart-modal-content"]}
        bgBluryModal={true}
        modalWidth="562px"
        modalHeight="619px"
      >
        <div className={styles["sizechart-modal-body"]}>
          <div className={styles["size-chart"]}>
            <Image
              src={sizeChartUrl || ""}
              width={100}
              height={100}
              layout="responsive"
              alt="size chart"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SizeChartModal;
