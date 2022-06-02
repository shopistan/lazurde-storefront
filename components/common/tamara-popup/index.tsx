import React, { useContext, useState, useEffect } from "react";
import Script from "next/script";
import { AppContext } from "lib/context";

const TamaraModal = () => {
  const { appState } = useContext(AppContext);
  const [renderScript, setRendeScript] = useState(false);

  useEffect(() => {
    setRendeScript(true);
  }, [appState?.lang]);

  return (
    <>
      {renderScript && (
        <>
          <div
            className="tamara-product-widget"
            data-lang={appState?.lang}
            data-price="250"
            data-currency="SAR"
            data-country-code="SA"
            data-color-type="default"
            data-show-border="false"
            data-payment-type="installment"
            data-number-of-installments="3"
            data-disable-installment="false"
            data-disable-paylater="true"
          ></div>

          <Script
            id={Math.random()?.toString()}
            src="https://cdn.tamara.co/widget/product-widget.min.js"
          ></Script>
          <Script id={Math.random()?.toString()} strategy="lazyOnload">
            {`if (window.TamaraProductWidget) {
              window.TamaraProductWidget.init({ lang: 'en', })
              window.TamaraProductWidget.render()
            }`}
          </Script>
        </>
      )}
    </>
  );
};

export default TamaraModal;
