import { FooterProps } from "lib/types/common";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
import Label from "components/common/ui/label";
import Heading from "components/common/ui/heading";
import FooterIcons from "./footer-icons-list/index";
import FooterLinks from "./footer-links";
import Image from "next/image";

const Footer = ({
  heading = "",
  subHeading = "",
  subscriptionText = "",
  socialIconText = "",
  footerLogo,
  footerLinks = [],
  socialLinks = [],
  paymentLinks = [],
}: FooterProps) => {
  return (
    <div className={styles["footer__container"]}>
      <div className="grid grid-cols-2 gap-8 w-full">
        <div className={`${styles["footer__sub-container"]}`}>
          <Heading element="h3" className={styles["footer__heading"]}>
            {heading}
          </Heading>
          <Label className={`opacity-60 mb-8 ${styles["footer__label"]}`}>
            {subHeading}
          </Label>
          <Link href={"/"}>
            <a className={styles["footer__signup-link"]}>Sign Up</a>
          </Link>
          <Label
            className={`opacity-60 ${styles["footer__label"]}
            ${styles["footer__signup-text"]}`}
          >
            {subscriptionText}
          </Label>
        </div>
        <div
          className={`grid grid-cols-3 gap-4 w-full ${styles["footer__sub-container"]}`}
        >
          {footerLinks?.map((footerLink, index) => (
            <FooterLinks
              heading={footerLink.linkHeading}
              links={footerLink.links}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={styles["footer__inner-container"]}>
        <div className={styles["footer__social-links-wrapper"]}>
          <Label
            className={`opacity-60 ${styles["footer__label"]} ${styles["footer__social-link-text"]}`}
          >
            {socialIconText}
          </Label>
          <FooterIcons iconsList={socialLinks} />
        </div>
        {footerLogo?.url ? (
          <div className={styles["footer__maroof-logo"]}>
            <Image
              src={footerLogo.url}
              alt={footerLogo.altText}
              width={214}
              height={66}
              layout="fixed"
            />
          </div>
        ) : (
          <div className={styles["footer__maroof-logo"]}>
            <Image
              src={"/images/maroof.svg"}
              alt={"maroof logo"}
              width={214}
              height={66}
              layout="fixed"
            />
          </div>
        )}
      </div>
      <div className={styles["footer__sub-footer"]}>
        <div>
          <select name="" id="">
            <option value="">ksa</option>
          </select>
          <select name="" id="">
            <option value="">ksa</option>
          </select>
        </div>
        <FooterIcons iconsList={paymentLinks} />
      </div>
    </div>
  );
};

export default Footer;
