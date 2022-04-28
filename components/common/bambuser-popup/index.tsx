
import React from "react";
import Script from 'next/script';

interface PopupProps {
  bId?: string;
  btnText?: string;
  scriptId?: string;
}

const BambuserPopup = ({ bId = '34vfkSGTIydQauc1U8Xq', btnText = 'Join show now', scriptId = '1'}: PopupProps): JSX.Element => {

  return (
    <>
      <button id={`liveshopping-${bId}`}>{btnText}</button>

      <Script id={scriptId} >
        {`   (function() {
            if (!window.initBambuserLiveShopping){
              window.initBambuserLiveShopping = function(item) { window.initBambuserLiveShopping.queue.push(item) }; window.initBambuserLiveShopping.queue = [];
              var scriptNode = document.createElement('script');
              scriptNode['src'] = 'https://lcx-embed.bambuser.com/lazurde/embed.js';
              document.body.appendChild(scriptNode);
            }

            window.initBambuserLiveShopping({
              showId: '${bId}',
              node: document.getElementById('liveshopping-${bId}'),
              type: "overlay",
            });
          })();`
      } </Script>
    </>

  )
}

export default BambuserPopup