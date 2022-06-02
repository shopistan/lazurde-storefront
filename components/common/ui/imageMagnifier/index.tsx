import Image from "next/image";
import React, { useRef } from "react";
import styles from "./image-magnifier.module.scss";

interface ImageMagnifierProps {
  width: number;
  height: number;
  zoomNum: number;
  url: string;
}

const ImageMagnifier = ({
  width = 300,
  height = 300,
  zoomNum = 2,
  url = "/",
}: ImageMagnifierProps): JSX.Element => {
  const lazyRoot = useRef(null);

  const zoomOnImage = (e: any) => {
    // var zoomer = e.currentTarget;
    let offSetX = 0;
    let offSetY = 0;
    
    if (e.nativeEvent.type === "pointermove") {
      offSetX = e.nativeEvent.offsetX;
      offSetY = e.nativeEvent.offsetY;
    } else {
      const rect = e.target.getBoundingClientRect();
      offSetX = e.touches[0].clientX - window.pageXOffset - rect.left;
      offSetY = e.touches[0].clientY - window.pageYOffset - rect.top;
    }

    let x = width * zoomNum - offSetX;
    let y = height * zoomNum - offSetY;

    // let x = (offSetX / zoomer.offsetWidth) * 60;
    // let y = (offSetY / zoomer.offsetHeight) * 60;
    // zoomer.style.backgroundPosition = x + '% ' + y + '%';
    // zoomer.style.opacity = zoomer.style.opacity == 0 ? 1 : 0;

    lazyRoot.current.children[0].children[0].style.top = `-${offSetY}px`;
    // lazyRoot.current.children[0].children[0].style.left = `${x}px`;
  }

  return (
    <div
      ref={lazyRoot}
      className={styles["main-image-magnifier"]}
      onPointerMove={(event) => {
        zoomOnImage(event);
      }}
      // style={{width: width * zoomNum, height: height * zoomNum}}
    >
      <Image
        alt={"product image"}
        width={width * zoomNum}
        height={height * zoomNum}
        className={styles["image-large"]}
        src={url}
        layout="fixed"
      />
      <Image
        alt={"product image"}
        className={styles["image-small"]}
        width={width}
        height={height}
        src={url}
        layout="fixed"
      />
    </div>
  );
};

export default ImageMagnifier;
