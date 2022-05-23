import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

interface ImageUploaderProps {
  setFileUpload?: Function;
  file?: [];
}

const ImageUploader = ({
  setFileUpload,
  file,
}: ImageUploaderProps): JSX.Element => {
  let fileObj: any = [];
  let fileArray: any = [];

  const uploadMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileObj.push(e.target?.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFileUpload({ fileArray });
  };

  return (
    <>
      <div className={styles["uploaded-imgs"]}>
        {((file && file.length > 0 && file) || []).map(
          (url: string, index: number) => {
            return (
              <div className={styles["img-item"]} key={index}>
                <Image
                  src={url}
                  alt="img"
                  layout="fixed"
                  width={89}
                  height={88}
                />
              </div>
            );
          }
        )}
      </div>

      <div className={styles["img-upload-input"]}>
        <input
          type="file"
          accept="image/*"
          onChange={uploadMultipleFiles}
          multiple
        />
      </div>
    </>
  );
};

export default ImageUploader;
