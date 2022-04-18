import React, { useContext } from "react";
import { FooterProps } from "lib/types/common";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Label from "components/common/ui/label";
import Heading from "components/common/ui/heading";
import FooterIcons from "./footer-icons-list/index";
import FooterLinks from "./footer-links";
import Image from "next/image";
import LanguageSelector from "../language-selector";
import useWindowSize from "lib/utils/useWindowSize";
import Accordion from "../accordion";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";

const Footer = ({
  heading = "",
  subHeading = "",
  subscriptionText = "",
  socialIconText = "",
  footerLogo,
  footerLinks = [],
  socialLinks = [],
  paymentLinks = [],
}: FooterProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const _footerLinks =
    appState.lang === "en"
      ? footerLinks
      : t("arabicfooterLinks", {}, { returnObjects: true });

  return (
    <>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__content-wrapper"]}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div className={`${styles["footer__sub-container"]}`}>
              <Heading element="h3" className={styles["footer__heading"]}>
                {appState.lang === "en" ? heading : t("footerHeading")}
              </Heading>
              <Label
                className={`opacity-80 font-medium mb-8 pl-1 lg:pl-0 pr-1 lg:pr-0 ${styles["footer__label"]}`}
              >
                {appState.lang === "en" ? subHeading : t("footerSubHeading")}
              </Label>
              <Link href={"/"}>
                <a className={styles["footer__signup-link"]}>
                  {appState.lang === "en" ? "Sign Up" : t("signUpBtnText")}
                </a>
              </Link>
              <Label
                className={`opacity-60 font-normal ${styles["footer__label"]}
            ${styles["footer__signup-text"]}`}
              >
                {appState.lang === "en"
                  ? subscriptionText
                  : t("subscriptionText")}
              </Label>
            </div>
            <div
              className={`grid grid-cols-1 lg:grid-cols-3 lg:gap-4 w-full ${styles["footer__sub-container"]}`}
            >
              {Array.isArray(_footerLinks) &&
                _footerLinks.length > 0 &&
                _footerLinks.map((footerLink, index) =>
                  width > 1023 ? (
                    <FooterLinks
                      heading={footerLink.linkHeading}
                      links={footerLink.links}
                      key={index}
                    />
                  ) : (
                    <Accordion
                      index={index}
                      heading={footerLink.linkHeading}
                      links={footerLink.links}
                    />
                  )
                )}
            </div>
          </div>
          <div className={styles["footer__inner-container"]}>
            <div className={styles["footer__social-links-wrapper"]}>
              <Label
                className={`opacity-60 font-normal ${styles["footer__label"]} ${styles["footer__social-link-text"]}`}
              >
                {appState.lang === "en" ? socialIconText : t("socialIconText")}
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
        </div>
        <div className={styles["footer__sub-footer"]}>
          <div className={styles["footer__footer-lang-selector"]}>
            <LanguageSelector
              className={styles["footer__footer-dropdowns"]}
              mainWrapperClass={styles["footer__footer-dropdowns-wrapper"]}
              showButton={false}
            />
          </div>
          <FooterIcons
            className={styles["footer__footer-icons"]}
            iconsList={paymentLinks}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
