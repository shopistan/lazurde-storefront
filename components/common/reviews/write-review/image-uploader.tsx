import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { CrossSmall, PlusIcon } from "components/icons";

interface ImageUploaderProps {
  setFileUpload?: any;
  file?: [];
  setFileName?: Function;
  uploadedFiles?: any;
  imageUploadRef?: any;
}
let fileObj: any = [];
let fileArray: any = [];

const ImageUploader = ({
  setFileUpload,
  file,
  setFileName,
  uploadedFiles,
  imageUploadRef,
}: ImageUploaderProps): JSX.Element => {
  let fileName: any = [];

  useEffect(() => {
    return () => {
      fileArray = [];
      setFileUpload([{ fileArray: {} }]);
    };
  }, []);

  const uploadMultipleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile: any = event.target.files;
    fileObj.push(event.target.files);

    currentFile[0].name && fileName.push(currentFile[0].name);
    Object.keys(currentFile).forEach((file: any) => {
      file = currentFile[file];
      fileArray.push(URL?.createObjectURL(file));
      setFileName((prev: any) => [...prev, file]);
    });
    setFileUpload({ fileArray });
  };

  const deleteImage = (event: any, index: number) => {
    file?.splice(index, 1);
    fileObj?.splice(index, 1);
    setFileUpload({ fileArray: file });
    uploadedFiles?.splice(index, 1);
    setFileName([...uploadedFiles]);
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
          <form>
            <label htmlFor="imgUploader" className={styles["img-label"]}>
              <input
                key="similar"
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                name="imgUploader"
                id="imgUploader"
                ref={imageUploadRef}
                onChange={uploadMultipleFiles}
                multiple
              />
              <PlusIcon />
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
