import React from "react";
import Script from "next/script";
import { ArrowRight } from "components/icons";

interface PopupProps {
  bId?: string;
  btnText?: string;
  scriptId?: string;
  className?: string;
  videoPlayBtn?: boolean;
}

const BambuserPopup = ({
  bId = "34vfkSGTIydQauc1U8Xq",
  btnText = "see live products",
  scriptId = "0",
  className = "",
  videoPlayBtn = false,
}: PopupProps): JSX.Element => {
  return (
    <>
      <div className={className} id={`liveshopping-${scriptId}`}>
        {videoPlayBtn ? (
          <ArrowRight fill="#ffffff" width="20" height="35" />
        ) : (
          <>{btnText}</>
        )}
      </div>

      <Script id={scriptId} strategy='lazyOnload'>
        {`   (function() {
            if (!window.initBambuserLiveShopping){
              window.initBambuserLiveShopping = function(item) { window.initBambuserLiveShopping.queue.push(item) }; window.initBambuserLiveShopping.queue = [];
              var scriptNode = document.createElement('script');
              scriptNode['src'] = 'https://lcx-embed.bambuser.com/lazurde/embed.js';
              document.body.appendChild(scriptNode);
            }

            window.initBambuserLiveShopping({
              showId: '${bId}',
              node: document.getElementById('liveshopping-${scriptId}'),
              type: "overlay",
            });
          })();`}
      </Script>
    </>
  );
};

export default BambuserPopup;
