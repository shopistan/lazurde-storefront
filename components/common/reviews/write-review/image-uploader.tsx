import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { CrossSmall, PlusIcon } from "components/icons";

interface ImageUploaderProps {
  setFileUpload?: Function;
  file?: [];
}
let fileObj: any = [];

const ImageUploader = ({
  setFileUpload,
  file,
}: ImageUploaderProps): JSX.Element => {
  let fileArray: any = [];

  const uploadMultipleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj.length; i++) {
      fileObj[i][0] && fileArray.push(URL?.createObjectURL(fileObj[i][0]));
    }
    setFileUpload({ fileArray });
  };

  const deleteImage = (event: any, index: number) => {
    file.splice(index, 1);
    fileObj.splice(index, 1);
    setFileUpload({ fileArray: file });
  };

  return (
    <>
      <div className={styles["uploaded-imgs"]}>
        {((file && file.length > 0 && file) || []).map(
          (url: string, index: number, arr) => {
            return (
              <div className={styles["img-item"]} key={index}>
                <Image
                  src={url || ""}
                  alt="img"
                  layout="fixed"
                  width={89}
                  height={88}
                />

                <div className={styles["cross-btn"]}>
                  <CrossSmall
                    onClick={(event: any) => {
                      deleteImage(event, index);
                    }}
                  />
                </div>
              </div>
            );
          }
        )}

        <div className={styles["img-upload-input"]}>
          <label htmlFor="imgUploader" className={styles["img-label"]}>
            <input
              key={Math.random()}
              type="file"
              accept="image/*"
              name="imgUploader"
              id="imgUploader"
              onChange={uploadMultipleFiles}
              // onClick={onInputClick}
              multiple
            />
            <PlusIcon />
          </label>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
