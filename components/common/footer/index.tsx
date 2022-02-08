import { FooterProps } from "lib/types/common";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";

const Footer = ({ footerLinks = [] }: FooterProps) => {
  return (
    <div className={styles["footer-container"]}>
      {footerLinks.map((footerLink, index) => (
        <Link href={footerLink.url} key={index}>
          <a>{footerLink.linkText}</a>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
