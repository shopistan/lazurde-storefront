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
import Accordion from "components/common/ui/accordion/Accordion";
import { AppContext } from "lib/context";
import useTranslation from "next-translate/useTranslation";
import { desktopScreenSize } from "lib/utils/common";
import { socialIconSize, paymentIconSize } from "lib/mock-data/data";

const Footer = ({
  heading = "",
  subHeading = "",
  subscriptionText = "",
  socialIconText = "",
  footerLogo,
  footerLogoLink = "/",
  footerLinks = [],
  socialLinks = [],
  paymentLinks = [],
}: FooterProps): JSX.Element => {
  const [width] = useWindowSize();
  const { appState } = useContext(AppContext);
  const { t } = useTranslation("common");

  const arabicFooterLinks = t("arabicfooterLinks", {}, { returnObjects: true });

  return (
    <>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__content-wrapper"]}>
          <div
            data-testid="wrapper"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
          >
            <div className={`${styles["footer__sub-container"]}`}>
              <Heading element="h3" className={styles["footer__heading"]}>
                {appState?.lang === "en" ? heading : t("footerHeading")}
              </Heading>
              <Label
                className={`opacity-80 font-medium mb-8 pl-1 lg:pl-0 pr-1 lg:pr-0 ${styles["footer__label"]}`}
              >
                {appState?.lang === "en" ? subHeading : t("footerSubHeading")}
              </Label>
              <Link href={"/"}>
                <a className={styles["footer__signup-link"]}>
                  {appState?.lang === "en" ? "Sign Up" : t("signUpBtnText")}
                </a>
              </Link>
              <Label
                className={`opacity-60 font-normal ${styles["footer__label"]}
            ${styles["footer__signup-text"]}`}
              >
                {appState?.lang === "en"
                  ? subscriptionText
                  : t("subscriptionText")}
              </Label>
            </div>
            <div
              className={`grid grid-cols-1 lg:grid-cols-3 lg:gap-4 w-full ${styles["footer__sub-container"]}`}
            >
              {footerLinks &&
                footerLinks.length > 0 &&
                footerLinks?.map((footerLink, index) =>
                  width > desktopScreenSize ? (
                    <FooterLinks
                      key={index}
                      heading={
                        appState?.lang === "en"
                          ? footerLink?.linkHeading
                          : Array.isArray(arabicFooterLinks) &&
                            arabicFooterLinks[index]?.linkHeading
                      }
                      links={footerLink?.links}
                      arabicLinks={
                        Array.isArray(arabicFooterLinks) &&
                        arabicFooterLinks[index]?.links
                      }
                      index={index}
                      role={"footerLinks"}
                    />
                  ) : (
                    <Accordion
                      footerAccordion={true}
                      className={"footer-accordion"}
                      index={index}
                      heading={
                        appState?.lang === "en"
                          ? footerLink?.linkHeading
                          : Array.isArray(arabicFooterLinks) &&
                            arabicFooterLinks[index]?.linkHeading
                      }
                      links={footerLink?.links}
                      footerArabicLinks={
                        Array.isArray(arabicFooterLinks) &&
                        arabicFooterLinks[index]?.links
                      }
                      arrowIcon={true}
                      role={"footerLinks-accordion"}
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
                {appState?.lang === "en" ? socialIconText : t("socialIconText")}
              </Label>
              <FooterIcons
                iconsList={socialLinks}
                iconSize={socialIconSize}
                isFooterIcons={false}
                role={"socialicons"}
              />
            </div>
            {appState?.region === "sa" && (
              <div className={styles["footer__maroof-logo"]}>
                <Link href={footerLogoLink || "/"}>
                  <a target="_blank">
                    <Image
                      src={footerLogo?.url || "/maroof.svg"}
                      alt={footerLogo?.altText}
                      width={214}
                      height={66}
                      layout="fixed"
                    />
                  </a>
                </Link>
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
              optionClassName={styles["footer-dropdown-options"]}
            />
          </div>
          <FooterIcons
            className={styles["footer__footer-icons"]}
            iconsList={paymentLinks}
            iconSize={paymentIconSize}
            isFooterIcons={true}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
