import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Label from "../ui/label";
import styles from "./error.module.scss";

type Props = {};

const ErrorComponent = ({ error, resetErrorBoundary }: any) => {
  const router = useRouter();
  const navigateElsewhere = (to: string) => {
    //resetErrorBoundary();
    setTimeout(() => {
      router.push("/contact-us");
    }, 1000);
  };

  return (
    <div>
      {" "}
      <div className={styles["container-404"]}>
        <Label className={styles["title-404"]}>Whoops, our bad :(</Label>
        <Image
          className={styles["image-404"]}
          src="/404.png"
          alt=""
          width="545"
          height="207"
        />
        <Label className={styles["text-404"]}>
          The content you requested was not found.
        </Label>
        <div className={styles["link-section"]}>
          <div className={styles["links-link"]}>
            <Link href="/">
              <a>Go Back</a>
            </Link>
          </div>
          <Label className={styles["link-label"]}>to the previous page.</Label>
        </div>
        <Label className={styles["text-404"]}>
          Follow these links to get you back on track!
        </Label>
        <div className={styles["link-section"]}>
          <div className={styles["links-link"]}>
            <button
              onClick={(e) => {
                //resetErrorBoundary();
                navigateElsewhere("/");
              }}
            >
              Store Home
            </button>
          </div>
          <span className={styles["seperator"]}></span>
          <div className={styles["links-link"]}>
            <button
              onClick={() => {
                //resetErrorBoundary();
                navigateElsewhere("/account");
              }}
            >
              My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
