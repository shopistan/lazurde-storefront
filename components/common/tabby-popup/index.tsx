import React, { useContext } from "react";
import Script from "next/script";
import { AppContext } from "lib/context";

const TabbyModal = ({
  productPricing,
}: {
  productPricing: { finalPrice: number; currency?: string };
}) => {
  const { appState } = useContext(AppContext);
  return (
    <>
      <div key={appState?.region} id="TabbyPromo"></div>

      <Script
        id={Math.random()?.toString()}
        src="https://checkout.tabby.ai/tabby-promo.js"
      ></Script>
      <Script strategy="lazyOnload" id={Math.random()?.toString()}>
        {`new TabbyPromo({
            selector: '#TabbyPromo',
            currency: '${appState?.region === 'sa' ? "SAR" : "AED"}',
            price: ${productPricing?.finalPrice},
            installmentsCount: 4,
            lang: '${appState?.lang}',
            source: 'product',
            publicKey: 'pk_test_427f73ce-ebb9-4609-9c83-c12088518f50'
          });`}
      </Script>
    </>
  );
};

export default TabbyModal;
